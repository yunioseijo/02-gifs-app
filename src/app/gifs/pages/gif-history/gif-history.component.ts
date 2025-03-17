import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history',
  imports: [],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {
  //the word 'query' is a parameter in the route, and could be any other word
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map(params => params['query'])));
}
