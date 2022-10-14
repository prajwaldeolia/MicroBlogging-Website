import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FollowService } from '../shared/components/follow.service';
import { SigninServiceService } from '../shared/components/signin-service.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {


  constructor(private service: FollowService, private userservice: SigninServiceService, private router: Router, private toastr: ToastrService) { }
  Userdata = [];
  deleteid: any
  fol: number;
  ngOnInit() {
    this.Showfollower();

  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  onremove(data: any) {
     
    this.service.getFollower().subscribe((result: any) => {
      result.find((temp: any) => {
        if (temp.userid == sessionStorage.getItem('Id') && (temp.followerid == data)) {
          this.deleteid = temp.id
          this.service.deletefollower(this.deleteid).subscribe((result) => {
            this.toastr.info('You just removed a User as your follower', 'Removed');
            this.reloadComponent();
          })
        }

      })
    })

    this.service.getFollowing().subscribe((result: any) => {
      result.find((temp: any) => {
        if (temp.userid == data && (temp.followingid == sessionStorage.getItem('Id'))) {
          this.deleteid = temp.id
          this.service.delete(this.deleteid).subscribe((result) => {
        
            this.reloadComponent();
          })
        }

      })
    })

  }
  Showfollower() {
    this.service.getFollower().subscribe((result: any) => {
      result.find((temp: any) => {
        if (temp.userid == sessionStorage.getItem('Id')) {
          
          this.userservice.getuserbyid(temp.followerid).toPromise().then(res => {
            this.Userdata.push(res);
          });
        }
      });
    })

  }

}

