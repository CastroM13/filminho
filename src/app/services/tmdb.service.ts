import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http: HttpClient) { }

  getVideos(id: number) {
    return this.http.get(`${environment.tmdb}/${id}/videos`, { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWMxMDMzYzQ2ZDdjNmU3NjUyYTdmMzQ2MTZjZjVkNyIsInN1YiI6IjYwYzJhZTAxNWY0YjczMDA1YTE3ZmM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jLKh1RZKTBp7uPU_Y5J3XQhXlKDgz3KsltlndudUXwc"}})
  }

  getNowPlaying() {
    return this.http.get(environment.tmdb+'/now_playing', { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWMxMDMzYzQ2ZDdjNmU3NjUyYTdmMzQ2MTZjZjVkNyIsInN1YiI6IjYwYzJhZTAxNWY0YjczMDA1YTE3ZmM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jLKh1RZKTBp7uPU_Y5J3XQhXlKDgz3KsltlndudUXwc"}})
  }

  getPopular() {
    return this.http.get(environment.tmdb+'/popular', { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWMxMDMzYzQ2ZDdjNmU3NjUyYTdmMzQ2MTZjZjVkNyIsInN1YiI6IjYwYzJhZTAxNWY0YjczMDA1YTE3ZmM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jLKh1RZKTBp7uPU_Y5J3XQhXlKDgz3KsltlndudUXwc"}})
  }

  getTopRated() {
    return this.http.get(environment.tmdb+'/top_rated', { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWMxMDMzYzQ2ZDdjNmU3NjUyYTdmMzQ2MTZjZjVkNyIsInN1YiI6IjYwYzJhZTAxNWY0YjczMDA1YTE3ZmM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jLKh1RZKTBp7uPU_Y5J3XQhXlKDgz3KsltlndudUXwc"}})
  }

  getUpcoming() {
    return this.http.get(environment.tmdb+'/upcoming', { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWMxMDMzYzQ2ZDdjNmU3NjUyYTdmMzQ2MTZjZjVkNyIsInN1YiI6IjYwYzJhZTAxNWY0YjczMDA1YTE3ZmM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jLKh1RZKTBp7uPU_Y5J3XQhXlKDgz3KsltlndudUXwc"}})
  }
}
