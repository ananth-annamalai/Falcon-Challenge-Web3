import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SavedMovie } from '../model/saved-movie.model';

@Injectable({
    providedIn: 'root',
  })


export class BackendService {
    private saved_movies_url = 'http://localhost:3001/saved_movies'

    constructor(private http: HttpClient) { }

    getSavedMovies(){
        return this.http.get<[SavedMovie]>(this.saved_movies_url);
    }
}