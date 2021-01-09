import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [`
.information {
  margin: 0 0 20px;
  padding: 20px;
  background-color: rgba(0,0,0,.03);
  border: 1px solid rgba(0,0,0,.08);
}
`]
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
