import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { bloguser } from '../model/AppUserModel'
@Injectable({
  providedIn: 'root'
})
export class SigninServiceService {
  formData: bloguser = new bloguser();
  list: bloguser[]
  constructor(private http: HttpClient) { }
  baseUrl: string = "https://localhost:44333/api/AppUsers/";
  getsignin() {
    return this.http.get(this.baseUrl)
  }
  getuserbyid(id: any) {
    return this.http.get(`${this.baseUrl}${id}`)
  }
  postcreate() {
    return this.http.post(this.baseUrl, this.formData);
  }
  userList() {
      this.http.get(this.baseUrl)
        .toPromise()
        .then(res => this.list = res as bloguser[]);

    }
  }
  

