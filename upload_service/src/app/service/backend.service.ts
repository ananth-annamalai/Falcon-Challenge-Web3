import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, UploadResponse } from '../model/movie.mode';

@Injectable({
    providedIn: 'root',
  })

export class BackendService {
    private movies_url = 'http://localhost:3001/movies'
    private upload_url = 'http://localhost:3001/movie/upload/'

    constructor(private http: HttpClient) { }

    getMovies(){
        return this.http.get<[Movie]>(this.movies_url);
    }

    uploadMovie(formData){
        return this.http.post<UploadResponse>(this.upload_url,formData)
    }
}