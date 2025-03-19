import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {
  constructor() { }
  private trendingScrollState = signal<number>(0);
  //create method to set and get the scroll state
  setScrollState(scrollTop: number) {
    this.trendingScrollState.set(scrollTop);
  }
  getScrollState() {
    return this.trendingScrollState();
  }

}
