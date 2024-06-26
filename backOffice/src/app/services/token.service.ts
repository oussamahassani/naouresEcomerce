import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtHelper: JwtHelperService;


  constructor() {
    this.jwtHelper=new  JwtHelperService();}
  set token(token:string){
    localStorage.setItem('token',token);
  }
  get token():string{
    return localStorage.getItem('token')|| '';
  }
  isTokenValid(){
    const token=this.token;
    if(!token){
      return false;
    }
    // decode the token
    const jwtHelper = new JwtHelperService();

    //check expiry date
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }
  isTokenNotValid() {
    return !this.isTokenValid();
  }
}
