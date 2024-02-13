import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { DetailComponent } from '../detail/detail.component';
import { forkJoin } from 'rxjs';
import { TmdbService } from '../services/tmdb.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  data: any = [];
  touched = false;
  loading = false;
  featured: any = {
    trailer: 'jtyFdK2Y33s'
  };
  popular: any[] = [];
  topRated: any[] = [];
  upcoming: any[] = [];
  videoLoading = true;

  constructor(public modalController: ModalController, public tmdb: TmdbService, private domSanitizer: DomSanitizer) { }

  findFeatureFilm() {
    const featuredIndex = 1 + Math.floor(Math.random() * this.popular.length);
    this.tmdb.getVideos(this.popular[featuredIndex].id).subscribe({
      next: (x: any) => {
        console.log(this.popular[featuredIndex])
        const trailer = x.results.find((r: any) => r.type === 'Trailer');
      this.featured = {
        ...trailer,
        ...this.popular[featuredIndex],
        trailer: this.domSanitizer.bypassSecurityTrustResourceUrl(`http://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&modestbranding&loop=1`)
        }
      },
    error: () => this.findFeatureFilm()})
  }

  ngOnInit() {
    setTimeout(() => {
      this.videoLoading = false;
    }, 5000)
    this.loading = true;
    forkJoin({
      popular: this.tmdb.getPopular(),
      topRated: this.tmdb.getTopRated(),
      upcoming: this.tmdb.getUpcoming(),
    })
      .subscribe({
        next: (res: any) => {
          this.popular = res.popular.results.map((x: any) => ({...x, cover: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+x.poster_path}));
          this.findFeatureFilm();
          this.topRated = res.topRated.results.map((x: any) => ({...x, cover: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+x.poster_path}));
          this.upcoming = res.upcoming.results.map((x: any) => ({...x, cover: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+x.poster_path}));
          this.loading = false;
        }
      })
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
