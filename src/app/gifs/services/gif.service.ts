import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@env/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs';
const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  return JSON.parse(gifsFromLocalStorage);
};

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);
  private currentPage = signal<number>(0);
  trendingGifs = signal<Gif[]> ([]);
  trendingGifsLoading = signal<boolean>(false);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  trendingGifGroups = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  });

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  });

  loadTrendingGifs() {
    if(this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.currentPage() * 20,
      },
    }).subscribe((response) => {
      const gifs = GifMapper.mapGiphyitemsToGifArray(response.data);
      this.trendingGifs.update( currentGifs => [...currentGifs, ...gifs]);
      this.trendingGifsLoading.set(false);
      this.currentPage.update( page => page + 1);
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
