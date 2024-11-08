import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit{
  movies = new Array<Movie>();
  selMovie?: Movie;
  editMode = false;

  constructor(private movieService: MovieService) {

    const alien = new Movie(1, 'Alien', 4);
    this.movies.push(alien);

    const parasita = new Movie(2, 'Parasita', 5);
    this.movies.push(parasita);
  }

  ngOnInit() {
    this.refreshMovies();

    if (typeof window !== 'undefined') {
        console.log('Currently on Client side');
    } else {
      console.log('Currently on Server Side');
    }
  }

  selectMovie(movie:Movie){
    this.selMovie = movie;
    this.editMode = true;
  }

  new(){
    this.selMovie = new Movie();
    this.editMode = false;
  }

  save(){
    if(this.editMode){
      this.movieService.update(this.selMovie);
    } else {
      this.movieService.insert(this.selMovie);
    }
    this.selMovie = undefined;
    this.refreshMovies();
  }

  cancel(){
    this.selMovie = null;
  }

  remove(id:number){
    this.movieService.remove(id);
    this.refreshMovies();
  }

  refreshMovies(){
    this.movies = this.movieService.list();
  }
}
