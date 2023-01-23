import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { DetailComponent } from '../detail/detail.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit {
  data: any = [];
  touched = false;

  constructor(public modalController: ModalController) { }

  ngOnInit(event: any = null) {
    fetch(environment.api + "/tracker")
      .then(e => e.json()).then(e => {
        this.data = e.map((i: any) => i.Remarks? i : ({...i, Remarks: {jujuba: 0, tito: 0}})).reverse()
      });
    if (event) {
      setTimeout(() => {
        // Any calls to load data go here
        event.target.complete();
      }, 500);
    }
  }

  searchData(event: any) {
    this.touched = true;
    console.log(event)
  }

  async dataDetail(data: any) {
    const modal = await this.modalController.create({
      component: EditComponent,
      componentProps: { data },
    });

    await modal.present();
    
    const output = await modal.onDidDismiss();
    if (output.data === 'reload') {
      console.log(output)
      this.ngOnInit();
    }
  }

}
