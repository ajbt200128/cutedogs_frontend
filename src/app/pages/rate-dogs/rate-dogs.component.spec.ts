/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RateDogsComponent } from './rate-dogs.component';

describe('RateDogsComponent', () => {
  let component: RateDogsComponent;
  let fixture: ComponentFixture<RateDogsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RateDogsComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
