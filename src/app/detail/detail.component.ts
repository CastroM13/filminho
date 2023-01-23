import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input('data') data: any;
  details: any;
  loading = false;
  trackerLoading: any = {
    "Watched": false,
    "To Watch": false,
    "In Progress": false,
  };
  colors: any = []

  constructor(private modal: ModalController, private toastController: ToastController) { }

  ngOnInit() {
    this.loading = true;
    fetch("https://www.omdbapi.com/?apikey=5f8e75f6&i=" + this.data.imdbID)
      .then(e => e.json()).then(e => {
        this.details = e;
        console.log(this.details);
        this.loading = false;
      });
    for (let i = 0; i <= 10; i++) {
      this.colors.push(this.randomColor())
    }
  }

  randomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

  dismiss() {
    this.modal.dismiss()
  }

  async success() {
    const toast = await this.toastController.create({
      icon: 'checkmark',
      message: `Added ${this.data.Type} to tracker successfully!`,
      duration: 500,
      color: 'success'
    });
    toast.present();
  }

  addToTracker(status: string) {
    this.trackerLoading[status] = true;
    fetch(environment.api + "/tracker", {
      body: JSON.stringify({
        Title: this.data.Title,
        Year: this.data.Year,
        Type: this.data.Type,
        Poster: this.data.Poster,
        imdbID: this.data.imdbID,
        Status: status,
        Remarks: {
          jujuba: 0,
          tito: 0
        }
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(e => e).then(e => {
        this.trackerLoading[status] = false;
        console.log(this.trackerLoading)
        this.modal.dismiss();
        this.success();
      });
  }

}
