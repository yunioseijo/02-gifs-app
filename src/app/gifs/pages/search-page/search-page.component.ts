import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/side-menu/gif-list/gif-list.component";
import { GifService } from '@app/gifs/services/gif.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '@app/gifs/mapper/gif.mapper';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    // console.log('searching for', query);
    this.gifService.searchGifs(query).subscribe((response) => {
      this.gifs.set(response);
    });
  }
}
