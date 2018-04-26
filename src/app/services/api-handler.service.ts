import { User } from 'app/models/user';
import { LoginHelper } from 'app/utils/login-helper';
import { UUID } from 'angular2-uuid';
import { DataResponse } from './../utils/data';
import { Dog } from './../models/dog';
import { Paths } from './../utils/paths';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '_debugger';
import 'rxjs/Rx';
import { Image } from 'app/models/image';

@Injectable()
export class ApiHandlerService {
  constructor(private http: HttpClient) {}

  getUser(uuid: UUID): Observable<DataResponse<User>> {
    let path: string =
      Paths.URL + Paths.GET_USER.replace(':uuid', uuid.toString());
    return this.http.get<DataResponse<User>>(path);
  }
  getUserByUsername(username: string): Observable<DataResponse<User>> {
    let path: string =
      Paths.URL + Paths.GET_BY_USERNAME.replace(':username', username);

    return this.http.get<DataResponse<User>>(path);
  }

  getDog(uuid: UUID): Observable<DataResponse<Dog>> {
    return this.http.get<DataResponse<Dog>>(
      Paths.URL + Paths.GET_DOG.replace(':uuid', uuid.toString())
    );
  }
  getDogByOwner(uuid: UUID): Observable<DataResponse<Dog[]>> {
    let path: string =
      Paths.URL + Paths.GET_DOGS_BY_OWNER.replace(':uuid', uuid.toString());
    return this.http.get<DataResponse<Dog[]>>(path);
  }
  login(username: string, password: string): Observable<Response> {
    let credentials = btoa(username + ':' + password);
    let eaders = new HttpHeaders({
      Authorization: 'Basic ' + credentials
    });

    return this.http.get<Response>(Paths.URL + Paths.LOGIN, {
      headers: eaders,
      withCredentials: true
    });
  }
  signup(user: User, password: string): Observable<DataResponse<any>> {
    let credentials = btoa(user.username + ':' + password);
    let eaders = new HttpHeaders({
      Authorization: 'Basic ' + credentials
    });

    return this.http.post<DataResponse<any>>(
      Paths.URL + Paths.CREATE_USER,
      JSON.stringify(user),
      { headers: eaders, withCredentials: true }
    );
  }

  putDog(dog: Dog, ownerUsername: string): Observable<Response> {
    let path = Paths.URL + Paths.UPDATE_DOG;
    path = path.replace(':username', ownerUsername);
    path = path.replace(':uuid', dog.uuid.toString());

    let eaders = new HttpHeaders({
      Authorization: 'Bearer ' + LoginHelper.getToken()
    });

    return this.http.put<Response>(path, JSON.stringify(dog), {
      headers: eaders,
      withCredentials: true
    });
  }
  deleteDog(dog: UUID, ownerUsername: string): Observable<Response> {
    let path = Paths.URL + Paths.DELETE_DOG;
    path = path.replace(':username', ownerUsername);
    path = path.replace(':uuid', dog.toString());

    let eaders = new HttpHeaders({
      Authorization: 'Bearer ' + LoginHelper.getToken()
    });

    return this.http.delete<Response>(path, {
      headers: eaders,
      withCredentials: true
    });
  }
  addDog(dog: Dog, ownerUsername: string): Observable<Response> {
    let path = Paths.URL + Paths.CREATE_DOG;
    path = path.replace(':username', ownerUsername);
    path = path.replace(':uuid', dog.uuid.toString());

    let eaders = new HttpHeaders({
      Authorization: 'Bearer ' + LoginHelper.getToken()
    });

    return this.http.post<Response>(path, JSON.stringify(dog), {
      headers: eaders,
      withCredentials: true
    });
  }
  likeImage(image: UUID, like: boolean): Observable<Response> {
    let path = Paths.URL + Paths.LIKE_IMAGE.replace(':uuid', image.toString());
    let eaders = new HttpHeaders({
      Authorization: 'Bearer ' + LoginHelper.getToken()
    });
    return this.http.post<Response>(path, like ? 1 : 0, {
      headers: eaders,
      withCredentials: true
    });
  }
  getAllDogs(count: number): Observable<DataResponse<Dog>> {
    return this.http.get<DataResponse<Dog>>(
      Paths.URL + Paths.GET_DOGS + '?count=' + count
    );
  }
  getAllDogsByTag(count: number, tag: string): Observable<DataResponse<Dog>> {
    return this.http.get<DataResponse<Dog>>(
      Paths.URL + Paths.GET_DOGS + '?count=' + count + '&tag=' + tag
    );
  }
  getDogsRandom(count: number) {
    return this.http.get<DataResponse<Dog>>(
      Paths.URL + Paths.GET_DOGS_RANDOM + '?count=' + count
    );
  }
}
