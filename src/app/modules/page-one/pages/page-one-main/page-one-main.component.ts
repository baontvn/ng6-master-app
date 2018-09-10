import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-page-one-main',
  templateUrl: './page-one-main.component.html',
  styleUrls: ['./page-one-main.component.scss']
})
export class PageOneMainComponent implements OnInit {

  constructor(private modalService: NzModalService) { }

  ngOnInit() {
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle  : '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>Some descriptions</b>',
      nzOnOk   : () => console.log('OK')
    });
  }

}
