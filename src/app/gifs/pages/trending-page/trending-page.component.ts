import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { GifListComponent } from '@app/gifs/components/side-menu/gif-list/gif-list.component';
import { GifService } from '@app/gifs/services/gif.service';

const imageUrls: string[] = [
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
];

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  // viewChild is a decorator that allows you to access a child component or element in the parent component
  // 'groupDiv' is the name of the child component or element
  // similar to javascript querySelector

  gifService = inject(GifService);

  onScroll($event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    const isBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    if (isBottom) {
      // TODO: Load more gifs
      this.gifService.loadTrendingGifs();
    }
  }
}
