import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]> ([]);
  trendingGifsLoading = signal<boolean>(true);

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      },
    }).subscribe((response) => {
      const gifs = GifMapper.mapGiphyitemsToGifArray(response.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs(query: string) {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20,
      },
    }).subscribe((response) => {
      const searchedGifs = GifMapper.mapGiphyitemsToGifArray(response.data);
      console.log({searchedGifs});
    });
  }
}
