import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlBakend } from './utils'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: "root",
})
export class AdsService {
  private baseUrl = UrlBakend;

  constructor(private http: HttpClient) { }

  public getallProduitList() {
    return this.http.get(`${this.baseUrl}/products`);
  }

  public getAllProductPayed() {
    return this.http.get(`${this.baseUrl}/products/productsPayed`);
  }
  getOneProduit(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }
  getPayementOneProduit(id: any) {
    return this.http.get(`${this.baseUrl}/products/getPayementByProduct/${id}`);

  }
  createNewProduit(prod: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/products`, prod);
  }

  updateProduit(value: any): Observable<Object> {
    return this.http.patch(`${this.baseUrl}/products`, value);
  }
  updateProductPayament(idUser: any, idProduct: any): Observable<Object> {
    return this.http.patch(`${this.baseUrl}/products/updatePayementProduct`, { userId: idUser, idProduct: idProduct });
  }

  deleteProduit(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`, { responseType: "text" });
  }

  //new
  public getAllCategory() {
    return this.http.get(`${this.baseUrl}/categories`);
  }
  public getCategoryById(image: any) {
    return this.http.get(`${this.baseUrl}/categories/${image}`);
  }
  postNewCategory(namecategory: string, imageFile: File) {
    const formData = new FormData();

    console.log(typeof imageFile)

    formData.append('name', namecategory);
    if (imageFile) {
      formData.append('imageCategorie', imageFile);
    }

    console.log("the data os", formData)
    formData.forEach((value, key) => {
      console.log(key + ': ' + value);
    });
    console.log("the data os", formData)
    return this.http.post<any>(`${this.baseUrl}/categories/create-category`, formData);
  }
  public updateCategory(cat: any) {
    return this.http.patch(this.baseUrl + "/categories", cat);
  }
  deleteCategory(id: any) {
    return this.http.delete(`${this.baseUrl}/categories/${id}`, { responseType: "text" });
  }
  public getAllPayements() {
    return this.http.get(`${this.baseUrl}/payment/allPayement`);
  }

  public getAllOrder() {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  updateOrder(value: any) {
    return this.http.patch(`${this.baseUrl}/orders`, value, httpOptions);
  }
  getOneOrder(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/${id}`);
  }

  getAllGameRoulette() {
    return this.http.get(`${this.baseUrl}/roullete/getALL`);
  }
  getGameResult(id: any) {
    return this.http.get(`${this.baseUrl}/roullete/getData/${id}`);
  }

  createroulette(pack: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/roullete`, pack);
  } cd
  updateRoulette() {
    return this.http.get(`${this.baseUrl}/roullete`);
  }
  deleteroulette(id: any) {
    return this.http.delete(`${this.baseUrl}/roullete/${id}`, { responseType: "text" });
  }

  createNewPack(pack: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/pack`, pack);
  }
  getallPackList() {
    return this.http.get(`${this.baseUrl}/pack`);
  }
  deletePack(id: any) {
    return this.http.delete(`${this.baseUrl}/pack/${id}`, { responseType: "text" });
  }
  public getAllUsersByRole(role: string) {
    return this.http.get(`${this.baseUrl}/users?role=` + role);
  }
  public UpdateStatusUser(userObject: any, newStatus: boolean) {
    return this.http.patch(`${this.baseUrl}/users/updateStatus`, { id: userObject, status: newStatus });
  }
  createNewAdmin(admin: any) {
    const token = localStorage.getItem("accessToken")
    const confi = {
      headers: {
        //'Authorization': `Bearer ${token}`,
        // 'Access-Control-Allow-Headers': 'Content-Type',
        //'Content-Type': 'multipart/form-data'
      }
    };
    return this.http.post(`${this.baseUrl}/users/save`, admin);
  }

  createNewArticle(admin: any) {
    return this.http.post(`${this.baseUrl}/posts`, admin);
  }
  getAllPost() {
    return this.http.get(`${this.baseUrl}/posts`);
  }
  deletePost(id: any) {
    return this.http.delete(`${this.baseUrl}/posts/${id}`);
  }
}
