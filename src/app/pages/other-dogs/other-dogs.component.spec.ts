import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDogsComponent } from './other-dogs.component';

describe('OtherDogsComponent', () => {
  let component: OtherDogsComponent;
  let fixture: ComponentFixture<OtherDogsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [OtherDogsComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
