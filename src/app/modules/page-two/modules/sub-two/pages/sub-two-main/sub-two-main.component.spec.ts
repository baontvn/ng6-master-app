/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubTwoMainComponent } from './sub-two-main.component';

describe('SubTwoMainComponent', () => {
  let component: SubTwoMainComponent;
  let fixture: ComponentFixture<SubTwoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubTwoMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTwoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
