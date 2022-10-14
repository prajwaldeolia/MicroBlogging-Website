import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FollowService } from '../shared/components/follow.service';
import { SigninServiceService } from '../shared/components/signin-service.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  constructor(private service: FollowService, private userservice: SigninServiceService, private router: Router, private toastr: ToastrService) { }
  Userdata = [];
  deleteid:any
  fol: number;
  ngOnInit() {
    this.Showfollowing();
   
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  OnUnfollow(data: any) {
    
    this.service.getFollowing().subscribe((result: any) => {
      result.find((temp: any) => {
        if (temp.userid == sessionStorage.getItem('Id') && (temp.followingid == data)) {
          this.deleteid = temp.id
          this.service.delete(this.deleteid).subscribe((result) => {
            this.toastr.info('You just unfollowed a User', 'Unfollowed');
            this.reloadComponent();
          })
        }

      })
    })
    this.service.getFollower().subscribe((result: any) => {
      result.find((temp: any) => {
        if (temp.userid == data && (temp.followerid == sessionStorage.getItem('Id'))) {
          this.deleteid = temp.id
          this.service.deletefollower(this.deleteid).subscribe((result) => {
            this.reloadComponent();
          })
        }

      })
    })
    
  }
  Showfollowing() {
    this.service.getFollowing().subscribe((result: any) => {
      result.find((temp: any) => {
        if (temp.userid == sessionStorage.getItem('Id')) {
          this.userservice.getuserbyid(temp.followingid).toPromise().then(res=> {
            this.Userdata.push(res);
          });
        }
      });
    })

  }

  }


