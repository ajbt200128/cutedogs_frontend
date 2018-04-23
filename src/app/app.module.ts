import { LoginPopupComponent } from 'app/popups/login-popup/login-popup.component';
import { ApiHandlerService } from './services/api-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonToggleModule, MatSlideToggleModule, MatChipsModule, MatIconModule, MatDialogModule} from '@angular/material';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './profiles/user-profile/user-profile.component';
import { DogDisplayComponent } from './displays/dog-display/dog-display.component';
import { AgePipePipe } from './utils/age-pipe.pipe';
import { RateDogsComponent } from './pages/rate-dogs/rate-dogs.component';
import { DogProfileComponent } from './profiles/dog-profile/dog-profile.component';
import { GenderPipePipe } from './utils/gender-pipe.pipe';
import { ImageDisplayComponent } from './displays/image-display/image-display.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DogGalleryComponent } from './displays/dog-gallery/dog-gallery.component';
import { ImageGalleryComponent } from './displays/image-gallery/image-gallery.component';
import { MyDogsComponent } from './pages/my-dogs/my-dogs.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ImagePointsPipe } from './utils/image-points.pipe';
import { DogPointsPipe } from './utils/dog-points.pipe';
import { OtherDogsComponent } from './pages/other-dogs/other-dogs.component';
import { AddDogComponent } from './pages/add-dog/add-dog.component';
import { SignupComponent } from './pages/signup/signup.component';

const appRoutes: Routes = [
  {path: 'user/:username', component: UserProfileComponent},
  {path: 'ratedogs', component: RateDogsComponent},
  {path: 'dog/:uuid', component: DogProfileComponent},
  {path: 'dog/:uuid/:action', component: DogProfileComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'mydogs',component:MyDogsComponent},
  {path: 'otherdogs',component:OtherDogsComponent},
  {path: 'otherdogs/:tag',component:OtherDogsComponent},
  {path : 'newdog/:owner',component:AddDogComponent},
  {path : 'signup',component:SignupComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    DogDisplayComponent,
    AgePipePipe,
    RateDogsComponent,
    DogProfileComponent,
    GenderPipePipe,
    ImageDisplayComponent,
    LoginPageComponent,
    DogGalleryComponent,
    ImageGalleryComponent,
    MyDogsComponent,
    ImagePointsPipe,
    DogPointsPipe,
    LoginPopupComponent,
    OtherDogsComponent,
    AddDogComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,

  ],
  providers: [ApiHandlerService],
  bootstrap: [AppComponent],
  entryComponents:[LoginPopupComponent]
})
export class AppModule { }
