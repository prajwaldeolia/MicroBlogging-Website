import { Injectable} from '@angular/core';
import { tweet } from '../model/tweet.model';
import { HttpClient, } from '@angular/common/http';
import { bloguser } from '../model/AppUserModel';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TweetService {
  formData: tweet = new tweet();
  list: tweet[];
  li: any;
  userlist = [];
 
  constructor(private http: HttpClient) { }
  baseUrl: string = "https://localhost:44333/api/TweetModels/";
  loginbaseUrl: string = "https://localhost:44333/api/AppUsers";


  posttweet() {
    return this.http.post(this.baseUrl ,this.formData)
  }
  getcuurenttweet(id: any) {
    return this.http.get(`${this.baseUrl}${id}`);
  }
  refreshlist() {
    this.http.get(this.baseUrl)
      .toPromise()
      .then(res => this.list = res as tweet[]
      
      );
    
  }
  gettweet() {
    return this.http.get(this.baseUrl);
  }
  update(id:any,data:any) {
    return this.http.put(`${this.baseUrl}${id}`, data);
  }

  delete(id: any) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
    
 
  
  
}
