import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  data: any = [];
  touched = false;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  searchData(event: any) {
    if (event.detail?.value !== '') {
      this.touched = true;
      fetch(environment.api + "/movies?title=" + event.detail?.value)
      .then(e => e.json()).then(e => this.data = e.Search);
    } else {
      this.touched = false
      this.data = [];
    }
  }

  async dataDetail(data: any) {
    const modal = await this.modalController.create({
    component: DetailComponent,
    componentProps: { data },
    initialBreakpoint: 0.5,
    breakpoints: [0, 0.5, 0.75, 1],
    });
  
    await modal.present();
  
  }

}
