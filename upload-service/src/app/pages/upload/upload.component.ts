import { Component, OnInit, OnDestroy } from "@angular/core";
import { BackendService } from "../../service/backend.service";
import { Movie } from "../../model/movie.mode";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: "app-upload",
  styleUrls: ['./upload.component.css'],
  templateUrl: "upload.component.html"
})
export class UploadComponent implements OnInit {

  all_movies: [Movie]
  myControl = new FormControl('');
  filteredOptions: Observable<Movie[]>;
  selectedTitle: Movie;
  showLoader: boolean = true;
  is_metaMask_connected: boolean = false;
  
  constructor(private backendService: BackendService, private router: Router, private route: ActivatedRoute) {

    this.backendService.is_metamask_connectedSubject$.subscribe((response: boolean)=>{
      this.is_metaMask_connected = response;
    });
  }

  ngOnInit() {
    window.name = "app_upload_page";
    this.loadMovies();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value!.name;
        return name ? this._filter(name as string) : [];
      }),
    );
  }

  _filter(value: string): Movie[] {
    const filterValue = value.toLowerCase();
    return this.all_movies.filter(option => option.title.toLowerCase().startsWith(filterValue));
  }

  displayFn(option: Movie): string {
    return option && option.title ? option.title : '';
  }
  onTitleSelection(title: any) {
    this.selectedTitle = title.option.value;
  }
  loadMovies() {
    this.showLoader = true;
    this.backendService.getMovies().subscribe(
      (result: [Movie]) => {
        this.showLoader = false;
        this.all_movies = result
        console.log(this.all_movies)
      }
    )
  }

  navigateToStream() {
    var streamUrl = window.location.origin + "/" + "stream";
    window.open(streamUrl, "app_stream_page");
  }



}
