/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubOneMainComponent } from './sub-one-main.component';

describe('SubOneMainComponent', () => {
  let component: SubOneMainComponent;
  let fixture: ComponentFixture<SubOneMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubOneMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubOneMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
