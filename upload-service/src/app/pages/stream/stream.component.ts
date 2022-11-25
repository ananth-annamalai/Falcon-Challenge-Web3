import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../service/backend.service';
import { SavedMovie } from './../../model/saved-movie.model';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  is_metaMask_connected: boolean = false;
  streamMovies: SavedMovie[] = [];
  selectedMovie: SavedMovie = {} as SavedMovie;
  showPreviewWindow: boolean;
  showLoader:boolean = true;

  constructor(private backendService: BackendService) { 
    this.backendService.is_metamask_connectedSubject$.subscribe((response: boolean)=>{
      this.is_metaMask_connected = response;
    });
  }

  ngOnInit(): void {
    window.name = "app_stream_page";
    this.loadSavedMovies();
  }

  loadSavedMovies(){
    this.showLoader = true;
    this.backendService.getSavedMovies().subscribe(
      (res: [SavedMovie]) => {
        console.log(res)
        this.streamMovies = res;
        this.showLoader = false;
      }
    )
  }

  previewMovie(mov: SavedMovie) {
    this.selectedMovie = null;
    this.selectedMovie = mov;
    this.showPreviewWindow = true;
}
}
