import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
@Component({
  selector: 'app-page-one-main',
  templateUrl: './page-one-main.component.html',
  styleUrls: ['./page-one-main.component.scss']
})
export class PageOneMainComponent implements OnInit {
  displayEvent: any;
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private modalService: NzModalService) { }

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      businessHours: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: [
        {
          id: '1',
          title: 'Birthday Party',
          start: new Date(),
          end: new Date(),
          className: 'task-priority-high',
          // color: 'red',
          // textColor: 'white'
        },
        {
          id: 2,
          title: 'Pool Party',
          start: new Date(),
          className: 'task-priority-low',
          color: 'blue',
          textColor: 'white'
        }
      ]
    };
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle  : '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>Some descriptions</b>',
      nzOnOk   : () => console.log('OK')
    });
  }


  clickButton(model: any) {
    this.displayEvent = model;
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay,
        hehe: model.event.tata
        // other params
      },
      duration: {}
    };
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    };
    this.displayEvent = model;
  }

}
