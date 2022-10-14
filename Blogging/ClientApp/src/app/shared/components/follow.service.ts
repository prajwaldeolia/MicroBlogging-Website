import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
 s
  constructor(private http: HttpClient) { }


  baseUrl: string = "https://localhost:44333/api/Followings/";
  followerbaseurl: string = " https://localhost:44333/api/followers/";

  saveFollowing(data: any) {
    return this.http.post(this.baseUrl, data);
  }
  getFollowing() {
    return this.http.get(this.baseUrl);
  }
  getFollower() {
    return this.http.get(this.followerbaseurl);
  }

  delete(id: any) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
  deletefollower(id: any) {
    return this.http.delete(`${this.followerbaseurl}${id}`);
  }
  saveFollower(data: any) {
    return this.http.post(this.followerbaseurl, data);
  }






 }

