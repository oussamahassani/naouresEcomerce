import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlBakend} from "../shared/services/utils";

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private baseUrl = UrlBakend;

  constructor(private http: HttpClient) { }
  getAllGameRoulette() {
    return this.http.get(`${this.baseUrl}/roullete/getALL`);
  }
}
