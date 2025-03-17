import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]> ([]);
  trendingGifsLoading = signal<boolean>(true);
  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

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

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20,
      },
    }).pipe(
      map(({data}) => GifMapper.mapGiphyitemsToGifArray(data)),
      tap( items => {
        this.searchHistory.update( history => ({
          ...history,
          [query]: items,
        }));
      })
  );
  }

  getHistory(query: string):Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
