import { ApiHandlerService } from './../../services/api-handler.service';
import { Dog } from './../../models/dog';
import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core/';
import { HostListener } from '@angular/core/';
import { ViewChild } from '@angular/core/';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other-dogs',
  templateUrl: './other-dogs.component.html',
  styleUrls: ['./other-dogs.component.css']
})
export class OtherDogsComponent implements OnInit {
  dogs: Dog[];
  loadNum: number;
  tag: string;
  @ViewChild('dogGallery', { read: ElementRef }) elView: ElementRef;
  constructor(public api:ApiHandlerService,public el: ElementRef,public route: ActivatedRoute) {
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.elView.nativeElement.offsetHeight;
    const scrollPosition = window.pageYOffset + window.innerHeight;
    if(scrollPosition > componentPosition){
      this.loadNum += Math.floor(window.innerWidth / 300);
      if (this.tag) {
        console.log(this.tag)
        this.api.getAllDogsByTag(this.loadNum + Math.ceil(this.loadNum / 2),this.tag).subscribe((res) => this.dogs = res.data);
      }else{
        this.api.getAllDogs(this.loadNum + Math.ceil(this.loadNum / 2)).subscribe((res) => this.dogs = res.data);
      }
    }
   }

  ngOnInit() {
    this.loadNum = Math.floor(window.innerWidth / 300) * Math.floor(window.innerHeight / 350);
    console.log(this.route.snapshot.params['tag']);
    if (this.route.snapshot.params['tag']) {
      this.tag = this.route.snapshot.params['tag'];
      this.api.getAllDogsByTag(this.loadNum + Math.ceil(this.loadNum / 2),this.tag).subscribe((res) => this.dogs = res.data);
    }else{
      this.api.getAllDogs(this.loadNum + Math.ceil(this.loadNum / 2)).subscribe((res) => this.dogs = res.data);
    }
  }

}
