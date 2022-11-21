import { Component, OnInit } from '@angular/core';
import { BackendService } from '../app/service/backend.service'
import { SavedMovie } from './model/saved-movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'streaming-service';
  saved_movies = []

  constructor(private backendService: BackendService){

  }
  ngOnInit(): void {
    this.backendService.getSavedMovies().subscribe(
      (res: [SavedMovie]) => {
        console.log(res)
      }
    )
  }
}
