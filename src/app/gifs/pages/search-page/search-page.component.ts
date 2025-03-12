import { Component, inject } from '@angular/core';
import { GifListComponent } from "../../components/side-menu/gif-list/gif-list.component";
import { GifService } from '@app/gifs/services/gif.service';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifService = inject(GifService);

  onSearch(query: string) {
    console.log('searching for', query);
    this.gifService.searchGifs(query);
  }
}
