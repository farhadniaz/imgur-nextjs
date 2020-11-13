import IGalleryImage from "~/types/IGalleryImage";
import IGalleryFilter from '~/types/IGalleryFilter';

export interface InitialStateInterface {
  items: IGalleryImage[];
  filter: IGalleryFilter;
}


export const imgurFilterQuery = {
  section: {
    hot: "hot",
    top: "top",
    user: "user",
  },
  sort: {
    viral: "viral",
    top: "top",
    time: "time",
    rising: "rising",
  },
  window: {
    day: "day",
    week: "week",
    month: "month",
    year: "year",
    all: "all",
  },
};



export const filterDefautValue: IGalleryFilter = {
  section: "hot",
  sort: "viral",
  window: "day",
  showViral: false,
  page: 0
};
const initialState = {
  items: [],
  filter: filterDefautValue,
};
export default initialState;


