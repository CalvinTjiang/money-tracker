import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }
  
  // User HTTP function
  getUsers() {
    return this.http.get("/db/users");
  }

  getUser(id:string) {
    return this.http.get("/db/users/" + id);
  }

  createUser(data:any) {
    return this.http.post("/db/users", data, httpOptions);
  }

  updateUser(id:string, data:any) {
    return this.http.put("/db/users/" + id, data, httpOptions);
  }

  deleteUser(id:string) {
    return this.http.delete("/db/users/" + id);
  }


  // Store HTTP function
  getStores() {
    return this.http.get("/db/stores");
  }

  getStore(id:string) {
    return this.http.get("/db/stores/" + id);
  }

  createStore(data:any) {
    return this.http.post("/db/stores", data, httpOptions);
  }

  updateStore(id:string, data:any) {
    return this.http.put("/db/stores/" + id, data, httpOptions);
  }

  deleteStore(id:string) {
    return this.http.delete("/db/stores/" + id);
  }


  // Purchase HTTP function
  getPurchases() {
    return this.http.get("/db/purchases");
  }

  getPurchase(id:string) {
    return this.http.get("/db/purchases/" + id);
  }

  createPurchase(data:any) {
    return this.http.post("/db/purchases", data, httpOptions);
  }

  updatePurchase(id:string, data:any) {
    return this.http.put("/db/purchases/" + id, data, httpOptions);
  }

  deletePurchase(id:string) {
    return this.http.delete("/db/purchases/" + id);
  }


  // Category HTTP function
  getCategories(populate=false) {
    if (populate){
      return this.http.get("/db/categories/super");
    }
    else{
      return this.http.get("/db/categories");
    }
  }

  getCategory(id:string) {
    return this.http.get("/db/categories/super" + id);
  }

  createCategory(data:any) {
    return this.http.post("/db/categories", data, httpOptions);
  }

  updateCategory(id:string, data:any) {
    return this.http.put("/db/categories/" + id, data, httpOptions);
  }

  deleteCategory(id:string) {
    return this.http.delete("/db/categories/" + id);
  }
}
