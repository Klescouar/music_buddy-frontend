import { Item } from "@/types/Spotify";

export const extractTopArtistImageUrls = (data: Item[]): string[] => {
  const imageUrls: string[] = [];
  data.forEach((item) => {
    item.images.forEach((image) => {
      imageUrls.push(image.url);
    });
  });
  return imageUrls;
};
