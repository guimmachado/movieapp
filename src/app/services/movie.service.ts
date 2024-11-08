import { Injectable } from '@angular/core';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies = new Array<Movie>();
  private autoGenerateId = 0;
  constructor() { }

  save(): void {
    window.localStorage.setItem('movies', JSON.stringify(this.movies));
    window.localStorage.setItem('movieAutoGenerateId', this.autoGenerateId.toString());
  }

  load(): void {
    const storageValues = window.localStorage.getItem('movies');
    if (storageValues) {
      this.movies = JSON.parse(storageValues);
    } else {
      this.movies = new Array<Movie>();
    }
    const autoGenId = window.localStorage.getItem('movieAutoGenerateId');
    if (autoGenId) {
      this.autoGenerateId = Number(autoGenId);
    }
  }

  insert(movie:Movie){
    movie.id = this.autoGenerateId++;
    this.movies.push(movie);
    this.save();
  }

  list(): Array<Movie>{
    this.load();
    return this.movies;
  }


  remove(id:number){
    for (let i = 0; i < this.movies.length; i++) {
      let m = this.movies[i];
      if(m != null && m.id == id){
        this.movies.splice(i, 1);
        break;
      }
    }
    this.save();
  }

  update(movie:Movie){
    for(let i = 0; i < this.movies.length; i++){
      let m = this.movies[i];
      if(m != null && m.id == movie.id){
        this.movies[i] = movie;
        break;
      }
    }
    this.save();
  }
}
