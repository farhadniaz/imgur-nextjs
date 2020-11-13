import { getGalleryImages } from "~/services/imgur";
import { useStore } from "react-redux";

import GalleryActions from "~/store/gallery/actions.ts";
const useDoFilter = (setLoading) => {
  const store = useStore();
  return (filterData) => {
    setLoading(true);
    getGalleryImages(filterData).then(({ page, data }) => {
      store.dispatch({
        type: GalleryActions.SET_ITEMS,
        payload: data,
      });
      store.dispatch({
        type: GalleryActions.SET_FILTER,
        payload: filterData,
      });
      setLoading(false)
    });
  };
};

export default useDoFilter;
