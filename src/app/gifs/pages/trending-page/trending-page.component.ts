import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { GifListComponent } from '@app/gifs/components/side-menu/gif-list/gif-list.component';
import { GifService } from '@app/gifs/services/gif.service';
import {ScrollStateService} from '@app/shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.getScrollState();

  }
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  // viewChild is a decorator that allows you to access a child component or element in the parent component
  // 'groupDiv' is the name of the child component or element
  // similar to javascript querySelector

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  onScroll($event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    const isBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.setScrollState(scrollTop);
    if (isBottom) {
      // TODO: Load more gifs
      this.gifService.loadTrendingGifs();
    }
  }
}
