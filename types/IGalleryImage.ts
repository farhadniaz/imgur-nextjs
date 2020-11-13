export interface IGalleryImageImageItem {
  link: string;
  description: string;
  type:string;
  mp4:string;
}
interface IGalleryImage {
  id: string;
  title: string;
  description?: string;
  points: number;
  score: number;
  ups: number;
  downs: number;
  images_count: number;
  images: IGalleryImageImageItem[];
}

export default IGalleryImage;
