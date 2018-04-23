import { Router } from '@angular/router';
import { LoginPopupComponent } from './../../popups/login-popup/login-popup.component';
import { ApiHandlerService } from 'app/services/api-handler.service';
import { LoginHelper } from 'app/utils/login-helper';
import { UUID } from 'angular2-uuid';
import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Image } from 'app/models/image';
import { Key } from 'readline';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnInit {
  @Input() img: Image;
  @Input() edit: boolean;
  @Output() input: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() delete: EventEmitter<UUID> = new EventEmitter<UUID>();
  @Output() liked: EventEmitter<any> = new EventEmitter<any>();
  ask: boolean = false;
  constructor(
    public api: ApiHandlerService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  keyPress(valid: boolean) {
    this.input.emit(valid);
  }
  prompt() {
    this.ask = true;
  }
  deleteImg(del: boolean) {
    if (!del) {
      this.ask = false;
    } else {
      this.delete.emit(this.img.uuid);
    }
  }
  like() {
    if (LoginHelper.isLoggedIn()) {
      this.api
        .likeImage(
          this.img.uuid,
          this.img.likedBy.indexOf(LoginHelper.getProfile().uuid) <= -1
        )
        .subscribe(res => this.liked.emit());
    } else {
      let dialog = this.dialog.open(LoginPopupComponent);
      dialog.afterOpen().subscribe(() => console.log('open'));
    }
  }
  tagClick(tag: string) {
    this.router.navigate(['otherdogs/' + tag]);
  }
  ngOnInit() {}
}
