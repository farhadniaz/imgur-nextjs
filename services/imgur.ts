import $axios from "~/plugins/axios/axios.client.ts";
export interface IGetGalleryImagesProps {
  page: number;
  section?: string;
  sort?: string;
  window?: string;
  showViral?: boolean;
  showMature?: boolean;
  albumPreviews?: boolean;
}
export const getGalleryImages = async (query = {}) => {
  const {
    page = 0,
    section = "hot",
    sort = "viral",
    window = "day",
    showViral = false,
    showMature = false,
    albumPreviews = false,
  } = (query || {}) as IGetGalleryImagesProps;

  return $axios
    .get(
      `gallery?page=${page}&section=${section}&sort=${sort}&window=${window}&showViral=${showViral}&showMature=${showMature}&albumPreviews=${albumPreviews}`
    )
    .then(({ data }) => {
      return { page, data };
    })
    .catch((err) => {
      throw err;
    });
};

export const getGalleryImageVotes = async (imageId) => {
  return $axios
    .get(`galleryImageVotes?id=${imageId}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
