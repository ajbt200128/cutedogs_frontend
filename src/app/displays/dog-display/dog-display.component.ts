import { Component, OnInit, Input } from '@angular/core';
import { Dog } from '../../models/dog';
import { EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dog-display',
  templateUrl: './dog-display.component.html',
  styleUrls: ['./dog-display.component.css']
})
export class DogDisplayComponent implements OnInit {
  @Input() dog: Dog;
  @Input() edit: boolean;

  constructor() {}

  ngOnInit() {}
}
