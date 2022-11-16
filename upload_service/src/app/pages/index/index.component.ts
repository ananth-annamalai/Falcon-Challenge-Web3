import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";
import { BackendService } from "src/app/service/backend.service";
import { Movie } from "../../model/movie.mode";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: "app-index",
  styleUrls: ['./index.component.css'],
  templateUrl: "index.component.html"
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;

  title = 'create-metamask';
  ethereum: any
  is_connected = false
  connectedAddress = ''
  eth_balance: number
  all_movies: [Movie]
  isShowLogin: boolean = true;

  myControl = new FormControl('');
  filteredOptions: Observable<Movie[]>;
  selectedTitle: Movie;
  showLoader: boolean = true;
  
  constructor(private authService: AuthService,
    private backendService: BackendService) {

  }

  ngOnInit() {
    this.loadMovies();
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
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

  handleAccountsChanged(accounts) {
    console.log(accounts)
    if (accounts.length == 0) {
      console.log('here')
      this.is_connected = false
      this.connectedAddress = ''
      this.eth_balance = 0
      this.ethereum = NaN
      this.isShowLogin = true;
    }
  }

  openMetaMask() {
    this.authService.signInWithMetaMask().subscribe(
      async (ethereum) => {
        this.ethereum = ethereum
        this.connectedAddress = await ethereum.request({ method: 'eth_requestAccounts' })
        const eth_balance_raw = await ethereum.request({ method: 'eth_getBalance', params: [this.connectedAddress[0], "latest"] })
        this.eth_balance = parseInt(eth_balance_raw.result, 16) / Math.pow(10, 18) | 0.0
        this.is_connected = ethereum.connected
        this.isShowLogin = false;
        this.ethereum.on('accountsChanged', this.handleAccountsChanged);
      },
      (err) => {
        console.error(err)
        this.isShowLogin = true;
      }
    )
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }

}
