import { Component, Input, OnInit } from '@angular/core';
import { ModalController, RangeCustomEvent, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input('data') data: any;
  review: {[key: string]: string} = {
    'jujuba': '',
    'tito': ''
  };
  details: any;
  currentRate = 0;
  changedRate = false;
  loading = false;
  trackerLoading: any = {
    "Watched": false,
    "To Watch": false,
    "In Progress": false,
  };
  toRate = false;
  remarks = {
    jujuba: {
      fullStars: [],
      halfStar: [],
      remainingStars: []
    },
    tito: {
      fullStars: [],
      halfStar: [],
      remainingStars: []
    }
  };
  selectedRater: string = '';
  colors: any = []

  constructor(private modal: ModalController, private toastController: ToastController) { }

  ngOnInit() {
    this.loadData()
    for (let i = 0; i <= 10; i++) {
      this.colors.push(this.randomColor())
    }
  }

  openRate(name: string) {
    this.selectedRater = name;
    this.toRate = true;
  }

  closeRate() {
    this.toRate = false;
  }

  loadData() {
    this.loading = true;
    fetch("https://www.omdbapi.com/?apikey=5f8e75f6&i=" + this.data.imdbID)
      .then(e => e.json()).then(e => {
        this.details = ({...e, ...this.data});
        this.remarks.jujuba.fullStars = this.fullStars(this.details?.Remarks.jujuba)
        this.remarks.jujuba.halfStar = this.halfStar(this.details?.Remarks.jujuba)
        this.remarks.jujuba.remainingStars = this.remainingStars(this.details?.Remarks.jujuba)
        this.remarks.tito.fullStars = this.fullStars(this.details?.Remarks.tito)
        this.remarks.tito.halfStar = this.halfStar(this.details?.Remarks.tito)
        this.remarks.tito.remainingStars = this.remainingStars(this.details?.Remarks.tito)
        if (this.details?.Reviews) {
          this.review['jujuba'] = this.details?.Reviews.jujuba;
          this.review['tito'] = this.details?.Reviews.tito;
        }
        this.loading = false;
      });
  }

  randomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

  fullStars: any = (val: number = 0) => Array.from(Array(Math.floor(val)).keys());
  halfStar: any = (val: number = 0) => Array.from(Array(Number(!!(val - Math.floor(val)))).keys());
  remainingStars: any = (val: number = 0) => Array.from(Array(5 - Math.ceil(val)).keys());

  dismiss(data?: any) {
    this.modal.dismiss(data)
  }

  rate() {
    const newRemarks = {...this.data.Remarks, [this.selectedRater]: this.currentRate}
    this.data.Remarks = newRemarks;
    const newReviews = {...this.data.Reviews, [this.selectedRater]: this.review[this.selectedRater]}
    this.data.Reviews = newReviews;
    this.updateRating();
    this.closeRate();
    this.changedRate = false;
  }

  changeRate(event: any) {
    this.currentRate = Number((event as RangeCustomEvent).detail.value);
    this.changedRate = true;
  }

  touchRate() {
    this.changedRate = true;
  }

  remove() {
    this.trackerLoading['Remove'] = true;
    console.log(this.data)
    fetch(environment.api + "/tracker?imdbID=" + this.data.imdbID, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(e => e).then(e => {
        this.trackerLoading[status] = false;
        console.log(this.trackerLoading)
        this.success('remove');
        this.dismiss('reload');
      });
  }

  async success(type: string = '') {
    const toast = await this.toastController.create({
      icon: 'checkmark',
      message: {
        remove: `Removed ${this.data.Type} from tracker successfully!`,
        changed: `Changed ${this.data.Type} in tracker successfully!`
      }[type],
      duration: 500,
      color: 'success'
    });
    toast.present();
  }

  updateRating() {
    console.log(this.data)
    fetch(environment.api + "/tracker", {
      body: JSON.stringify(this.data),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(e => e.json()).then(e => {
        this.details = ({...this.details, ...e});
        this.remarks.jujuba.fullStars = this.fullStars(this.details?.Remarks.jujuba)
        this.remarks.jujuba.halfStar = this.halfStar(this.details?.Remarks.jujuba)
        this.remarks.jujuba.remainingStars = this.remainingStars(this.details?.Remarks.jujuba)
        this.remarks.tito.fullStars = this.fullStars(this.details?.Remarks.tito)
        this.remarks.tito.halfStar = this.halfStar(this.details?.Remarks.tito)
        this.remarks.tito.remainingStars = this.remainingStars(this.details?.Remarks.tito)
      });
  }

  updateTracker(status: string) {
    this.trackerLoading[status] = true;
    fetch(environment.api + "/tracker", {
      body: JSON.stringify({
        Title: this.data.Title,
        Year: this.data.Year,
        Type: this.data.Type,
        Poster: this.data.Poster,
        imdbID: this.data.imdbID,
        Status: status
      }),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(e => e).then(e => {
        this.trackerLoading[status] = false;
        console.log(this.trackerLoading)
        this.success();
        this.dismiss('reload');
      });
  }

}
