import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(DOCUMENT) document, private router: Router, private route: ActivatedRoute, private primengConfig: PrimeNGConfig
  ) {

    var element = document.getElementById("navbar-top");
    if (element) {
      element.classList.remove("navbar-transparent");
      element.classList.add("bg-danger");
    }
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");
    this.primengConfig.ripple = true;
  }

  ngAfterViewInit(): void {
  }
  
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }

}
