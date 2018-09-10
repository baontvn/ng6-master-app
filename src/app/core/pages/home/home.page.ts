import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MainComponent } from '../../components/main/main.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
})

export class HomePage implements OnInit {

  @ViewChild('appHeader') appHeader: HeaderComponent;
  @ViewChild('appMain') appMain: MainComponent;

  constructor() {

  }

  ngOnInit() {

  }

  handleHeaderAction(event) {
    this.appMain.toggleSideBar();
  }
}
