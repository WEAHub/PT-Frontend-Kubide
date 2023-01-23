import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/modules/shared/services/config/config.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {

  constructor(
    private readonly configService: ConfigService
  ) {
    
  }

  ngOnInit(): void {
    
  }


}
