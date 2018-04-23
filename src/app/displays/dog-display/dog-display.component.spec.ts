/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DogDisplayComponent } from './dog-display.component';

describe('DogDisplayComponent', () => {
  let component: DogDisplayComponent;
  let fixture: ComponentFixture<DogDisplayComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [DogDisplayComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
