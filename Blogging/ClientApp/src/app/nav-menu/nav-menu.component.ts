import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FollowService } from '../shared/components/follow.service';
import { SigninServiceService } from '../shared/components/signin-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  isExpanded = false;
  TweetUserName: string;
  userlist: any;
  Followerscount = 0;
  followingcount = 0;
  constructor(private router: Router, public userservice: SigninServiceService, private service: FollowService) {
    if (sessionStorage.getItem('valid') != 'true') {
      this.router.navigate(['']);
    }



      this.service.getFollower().subscribe((result: any) => {
        result.find((temp: any) => {

          if (temp.userid == sessionStorage.getItem('Id')) {
        
            this.Followerscount += 1;

          }
        });
      })

    
      this.service.getFollowing().subscribe((result: any) => {
        result.find((temp: any) => {
          if (temp.userid == sessionStorage.getItem('Id')) {
            this.followingcount++;
          }
           
        });
      })

    
    
  

   
    this.userservice.getsignin().subscribe((result: any) => {
      
      result.forEach(contact => {
 
        if (contact.email == sessionStorage.getItem('UserName'))
          this.TweetUserName = contact.firstName + " " + contact.lastName;

      })

    });


    
  }
  

  

     


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}


