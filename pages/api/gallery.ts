import $axios from '~/plugins/axios/axios.server.ts';

export default async (req, res) => {
  // https://apidocs.imgur.com/ 
  // NOTE: /gallery endpoints do not support the perPage query string, and /album/{id}/images is not paged.
  const { query: {
    page = 0,
    section = "hot",
    sort = "viral",
    window = "day",
    showViral = true,
    showMature = false,
    albumPreviews = false
  } } = req;


  const data = await $axios.get(`gallery/${section}/${sort}/${window}/${page}?showViral=${showViral}&mature=${showMature}&album_previews=${albumPreviews}`).then((result) => {

    return result.data.data;
  }).catch((err) => {
    throw err;
  });;

  res.status(200).json(data);
}