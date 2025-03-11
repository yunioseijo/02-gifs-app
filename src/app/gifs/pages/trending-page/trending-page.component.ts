import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifListComponent } from '@app/gifs/components/side-menu/gif-list/gif-list.component';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent { }
