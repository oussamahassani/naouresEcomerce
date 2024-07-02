import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from "@angular/common/http";
import { DataFileImage } from "../../../models/DataFileImage";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl = "http://localhost:8081"
  constructor(private http: HttpClient) { }
  uploadFile(file: FormData, idUser: any): Observable<number> {


    return this.http.post(
      this.baseUrl + `/users/photos/add/${idUser}`, file, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(
        event => this.getUploadProgress(event)),
    );
  }
  private getUploadProgress(event: any): number {
    if (event.type === HttpEventType.UploadProgress) {

      const percentDone = Math.round((event.loaded / event.total) * 100);
      return percentDone;
    }
    return 0;
  }
  getFiles(): Observable<any> {
    return this.http.get<File[]>(
      this.baseUrl + '/img/{id}');
  }
  readFile(file: File): Observable<string> {
    return new Observable((observer) => {
      const reader = new FileReader();

      reader.onload = () => {
        observer.next(reader.result as string);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsDataURL(file);
    });
  }

  downloadFile(fileId: number): Observable<HttpResponse<Blob>> {
    return this.http.get(this.baseUrl + `/download/${fileId}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

}
