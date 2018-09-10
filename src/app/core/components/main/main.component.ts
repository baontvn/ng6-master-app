import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isOnline: boolean;

  private isOpeningSideBar: Boolean = true;

  constructor() {
    this.isOnline = navigator.onLine;

   }

  ngOnInit() {

  }

  toggleSideBar() {
    this.isOpeningSideBar = !this.isOpeningSideBar;
  }
}
