import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { FollowService } from '../shared/components/follow.service';
import { SigninServiceService } from '../shared/components/signin-service.service';
import { TweetService } from '../shared/components/tweet.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  Userdata = [];
  following = [];
  constructor(private service: SigninServiceService, private followservice: FollowService, private servicetweet: TweetService, private router: Router, private toastr: ToastrService) {
    
  }
  deleteid: any;

  alert: boolean = false;
  show: boolean = false;
  show2: boolean = false;
  searchUser: any;
  searchTweet: any;
  order: string = 'id';
  TweetUserName: string;
  ImagePath: any;
  value: string = "false";
  Tweetid: any;
  Action: any = sessionStorage.getItem('Id');
  findUser = new FormGroup({
    search: new FormControl('', Validators.required)
  });
  editTweet = new FormGroup({
    id: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    tweet: new FormControl('', Validators.required),
    imgPath: new FormControl('', Validators.required)


  });
  addFollowing = new FormGroup({
    id: new FormControl('', Validators.required),
   
    userid: new FormControl('', Validators.required),
    followingid: new FormControl('', Validators.required),
  });
  addFollower = new FormGroup({
    id: new FormControl('', Validators.required),

    userid: new FormControl('', Validators.required),
    followerid: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.getfollowing();
  }
  getfollowing() {
    this.following.splice(0, this.following.length);
    this.followservice.getFollowing().subscribe((result: any) => {
      result.find((temp: any) => {
        if (temp.userid == sessionStorage.getItem('Id')) {
          this.following.push(temp.followingid);
        }

      })
    })
    

  }
  change() {
    this.show = true;
    this.show2 = false;
  }
  change2() {
    this.show2 = true;
    this.show = false;
  }
  searchResult(data: any) {

    if (data != "") {
      this.servicetweet.refreshlist();
      this.change();
      this.searchUser = data;
      if (data[0] == '#') {
        this.searchTweet = data;
      }
      else {
        this.searchTweet = "#" + data;
      }
      this.service.getsignin().subscribe((result: any) => {
        this.Userdata = result;
        

        //don't remove this 
        result.forEach(contact => {
          if (contact.email == sessionStorage.getItem('UserName')) {
            this.ImagePath = contact.imgPath;
            this.TweetUserName = contact.firstName + " " + contact.lastName;
          }
        })
        //this 

      })

    }
    else {
      this.toastr.error('Enter data to Search', 'Required');
    }
  }
  showFollow(data: any) {
    for (var i = 0; i < this.following.length; i++) { 
      if (data == this.following[i]) {
        return false;
      }
    }
    return true;
  }
  deleteTweet(id: any) {
    this.servicetweet.delete(id).subscribe((result) => {
      this.toastr.error('Your Tweet Deleted Successfully', 'Deleted');
      this.servicetweet.refreshlist();
    })
  }



  onClickUpdate(data: any) {

    this.Tweetid = data;
    this.servicetweet.getcuurenttweet(this.Tweetid).subscribe((result: any) => {
      this.editTweet = new FormGroup({
        id: new FormControl(result['id']),
        tweet: new FormControl(result['tweet']),
        username: new FormControl(result['username']),
        imgPath: new FormControl(result['imgPath']),
        userid: new FormControl(result['userid']),
        date: new FormControl(result['date']),
        edited: new FormControl('True')
      });
    });
  }
  updateTweet() {
    this.servicetweet.update(this.Tweetid, this.editTweet.value).subscribe((result: any) => {
      this.toastr.info('Your Tweet Upadted Successfully', 'Updated');
      this.servicetweet.refreshlist();
    })
  }
  setFollowing(data: any) {
    if (!this.following.includes(data)) {
      this.following.push(data);
    }
 
    this.addFollowing = new FormGroup({
      userid: new FormControl(sessionStorage.getItem('Id')),
      followingid: new FormControl(data),

    });
    this.followservice.saveFollowing(this.addFollowing.value).subscribe((result) => {
     
    })
    this.toastr.info('Your Just followed a user Successfully', 'Followed');

  }
  setFollower(data: any) {
   this.addFollower = new FormGroup({
      userid: new FormControl(data),
     followerid: new FormControl(sessionStorage.getItem('Id'))
   });
    this.followservice.saveFollower(this.addFollower.value).subscribe((result) => {
 
    })

  }


  OnUnfollow(data: any) {
    for (var i = 0; i < this.following.length; i++) {
      if (this.following[i] == data) {
        var spliced = this.following.splice(i, 1);
      }
    }
    this.followservice.getFollowing().subscribe((result: any) => {
      result.find((temp: any) => {
        if (temp.userid == sessionStorage.getItem('Id') && (temp.followingid == data)) {
          this.deleteid = temp.id
          this.followservice.delete(this.deleteid).subscribe((result) => {
          })
        }

      })
    })
    this.followservice.getFollower().subscribe((result: any) => {
      result.find((temp: any) => {
        if (temp.userid == data && (temp.followerid == sessionStorage.getItem('Id'))) {
          this.deleteid = temp.id
          this.followservice.deletefollower(this.deleteid).subscribe((result) => {
          })
        }

      })
    })
    this.toastr.info('Your Just unfollowed a user Successfully', 'UnFollowed');
  }

    closeAlert() {
      this.alert = false;
    }

    clearForm() {
      this.findUser.reset();
    }
  }

