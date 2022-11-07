import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Movie } from '../model/movie.mode';

@Injectable({
    providedIn: 'root',
  })

export class BackendService {
    movies_url = 'http://localhost:3001/movies'
    constructor(private http: HttpClient) { }

    getMovies(){
        return this.http.get<[Movie]>(this.movies_url);
    }
}