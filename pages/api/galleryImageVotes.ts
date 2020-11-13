
import $axios from '~/plugins/axios/axios.server.ts';
import IGalleryImageVote from "~/types/IGalleryImageVote.ts";
export default async (req, res) => {
  const { query: { id } } = req;

  await $axios.get<{data:IGalleryImageVote}>(`gallery/${id}/votes`).then((result) => {
    res.status(200).json(result.data.data);

  }).catch((err) => {
    res.status(err.response.status).json(err.response.statusText);

  });
}
