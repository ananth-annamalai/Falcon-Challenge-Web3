import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, UploadResponse } from '../model/movie.mode';
import {Observable, Subject} from 'rxjs'
import { SavedMovie } from '../model/saved-movie.model';

@Injectable({
    providedIn: 'root',
  })

export class BackendService {
    is_metamask_connectedSubject : Subject<boolean> = new Subject<boolean>();
    is_metamask_connectedSubject$ : Observable<boolean>;
    private movies_url = 'https://api-dot-decentralized-peacock.el.r.appspot.com/movies'
    private upload_url = 'https://api-dot-decentralized-peacock.el.r.appspot.com/movie/upload/'
    private saved_movies_url = 'https://api-dot-decentralized-peacock.el.r.appspot.com/saved_movies'

    constructor(private http: HttpClient) { 
    this.is_metamask_connectedSubject$ = this.is_metamask_connectedSubject.asObservable();    
    }

    getMovies(){
        return this.http.get<[Movie]>(this.movies_url);
    }

    uploadMovie(formData){
        return this.http.post<UploadResponse>(this.upload_url,formData)
    }

    getSavedMovies(){
        return this.http.get<[SavedMovie]>(this.saved_movies_url);
    }

}