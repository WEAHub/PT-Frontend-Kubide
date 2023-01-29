import { Component, Input } from '@angular/core';
import { IComic } from '../../models/heroes-api.model';

@Component({
  selector: 'app-heroes-detail-comic',
  templateUrl: './heroes-detail-comic.component.html',
  styleUrls: ['./heroes-detail-comic.component.scss']
})

export class HeroesDetailComicComponent {
  @Input() comic!: IComic
  constructor() { }
  openUrl(comic: IComic) {
    const purchaseUrl = comic.urls.find(urlEntry => urlEntry.type == 'detail')
    if(purchaseUrl !== undefined) {
      window.open(purchaseUrl.url, '_blank');
    }
  }
}
