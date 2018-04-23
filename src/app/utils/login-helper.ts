import { Profile } from './../models/profile';
import { Observable } from 'rxjs/Observable';
import { NgXCookies } from './ngx-cookies';
import { Subject } from 'rxjs/Subject';
import { JwtHelperService } from '@auth0/angular-jwt';
class StorageHelper {
  static saveTemp(key: string, data: string) {
    window.sessionStorage.setItem(key, data);
  }
  static savePerm(key: string, data: string) {
    NgXCookies.setCookie(key, data);
  }
  static getPerm(key: string): string {
    return NgXCookies.getCookie(key);
  }
  static getTemp(key: string): string {
    return window.sessionStorage.getItem(key);
  }
  static delTemp(key: string) {
    window.sessionStorage.removeItem(key);
  }
  static delPerm(key: string) {
    NgXCookies.deleteCookie(key);
  }

  static existsTemp(key: string): boolean {
    if (sessionStorage.getItem(key)) {
      return true;
    } else {
      return false;
    }
  }
  static existsPerm(key: string): boolean {
    return NgXCookies.exists(key);
  }
}

const key = 'acct';
export class LoginHelper {
  private static loggedInSubj: Subject<boolean>;
  public static loggedIn: Observable<boolean>;
  private static initialized = false;
  private static helper: JwtHelperService = new JwtHelperService();
  public static initialize() {
    if (!this.initialized) {
      this.initialized = true;
      this.loggedInSubj = new Subject<boolean>();
      this.loggedIn = LoginHelper.loggedInSubj.asObservable();
    }
  }

  public static isLoggedIn(): boolean {
    return StorageHelper.existsPerm(key) || StorageHelper.existsTemp(key);
  }

  public static getToken(): string {
    return this.isLoggedIn()
      ? StorageHelper.existsPerm(key)
        ? StorageHelper.getPerm(key)
        : StorageHelper.getTemp(key)
      : '';
  }

  public static login(token: string, perm?: boolean) {
    if (perm) {
      StorageHelper.savePerm(key, token);
    } else {
      StorageHelper.saveTemp(key, token);
    }
    this.loggedInSubj.next(this.isLoggedIn());
  }

  public static logOut() {
    if (StorageHelper.existsTemp(key)) {
      StorageHelper.delTemp(key);
    }
    if (StorageHelper.existsPerm(key)) {
      StorageHelper.delPerm(key);
    }
    this.loggedInSubj.next(this.isLoggedIn());
  }
  public static getProfile(): Profile {
    if (StorageHelper.existsTemp(key)) {
      return JSON.parse(
        JSON.stringify(this.helper.decodeToken(StorageHelper.getTemp(key)))
      );
    }
    if (StorageHelper.existsPerm(key)) {
      return JSON.parse(
        JSON.stringify(this.helper.decodeToken(StorageHelper.getPerm(key)))
      );
    }
    return null;
  }
}
