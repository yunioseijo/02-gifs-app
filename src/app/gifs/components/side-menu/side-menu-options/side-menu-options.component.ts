import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '@app/gifs/services/gif.service';
interface MenuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;

}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  gifService = inject(GifService);
  searchHistoryKeys = this.gifService.searchHistoryKeys;
  menuOptions:MenuOption[] = [
    {

      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      route: 'trending',
      subLabel: 'Gifs Populares',
    },
    {
      icon: 'fas fa-heart',
      label: 'Favorites',
      route: 'favorites',
      subLabel: 'View your favorite gifs',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      route: 'search',
      subLabel: 'Buscar Gifs',
    },

  ];



 }
