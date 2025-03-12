import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interface";

export class GifMapper {
  static mapGiphyItemToGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    };
  }

  static mapGiphyitemsToGifArray(items: GiphyItem[]): Gif[] {
    return items.map(this.mapGiphyItemToGif);
  }
}
