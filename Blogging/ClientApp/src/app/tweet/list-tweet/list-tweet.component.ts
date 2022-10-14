import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SigninServiceService } from '../../shared/components/signin-service.service';
import { TweetService } from '../../shared/components/tweet.service';
import { tweet } from '../../shared/model/tweet.model';
import { HttpClient, } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FollowService } from '../../shared/components/follow.service';

@Component({
  selector: 'app-list-tweet',
  templateUrl: './list-tweet.component.html',
  styleUrls: ['./list-tweet.component.css']
})
export class ListTweetComponent implements OnInit {
  TweetUserName: string;
  ImagePath: any;
  Tweetid: any;
  Action: any = sessionStorage.getItem('Id');
  value: string = "false";
  editTweet = new FormGroup({
    id: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    tweet: new FormControl('', Validators.required),
    imgPath: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    edited: new FormControl('', Validators.required)

    
  });

  Tweetdata = [];

  constructor(http: HttpClient, public service: TweetService, private router: Router, private followservice : FollowService, public userservice: SigninServiceService, private toastr: ToastrService) {
    if (sessionStorage.getItem('valid') != 'true') {
      this.router.navigate(['']);
    }
  }
  order: string = 'id';
  ngOnInit(): void {
   
    this.service.gettweet().subscribe((res: any) => {
      res.find((te: any) => {

        if (te.userid == sessionStorage.getItem('Id')) {
          this.Tweetdata.push(te);
        }

        this.followservice.getFollowing().subscribe((result: any) => {
          result.find((temp: any) => {
            if (temp.userid == sessionStorage.getItem('Id')) {
              if (te.userid == temp.followingid) {
                this.Tweetdata.push(te);
              }
            }
          });
        })
        

      })
    
    })

    this.userservice.getsignin().subscribe((result: any) => {
  
      result.forEach(contact => {
        if (contact.email == sessionStorage.getItem('UserName')) {
          this.ImagePath = contact.imgPath;
          this.TweetUserName = contact.firstName + " " + contact.lastName;
        }
      })
    });
  }
  deleteTweet(id: any) {
    this.service.delete(id).subscribe((result) => {
      this.toastr.error('Your Tweet Deleted Successfully', 'Deleted');
      this.reloadComponent();
    })
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  onClickUpdate(data:any) {

    this.Tweetid = data;
    this.service.getcuurenttweet(this.Tweetid).subscribe((result: any) => {
      this.editTweet = new FormGroup({
        id: new FormControl(result['id']),
        tweet: new FormControl(result['tweet']),
        username: new FormControl(result['username']),
        imgPath: new FormControl(result['imgPath']),
        userid:new FormControl(result['userid']),
        date: new FormControl(result['date']),
        edited: new FormControl('True')
      });
    });
  }
  updateTweet() {
    this.service.update(this.Tweetid, this.editTweet.value).subscribe((result: any) => {
      this.toastr.info('Your Tweet Updated Successfully', 'Updated');
      this.reloadComponent();
    })

  }
  
    
      
  
  onSubmit(form: NgForm) {

   
    form.control.get('username').setValue(this.TweetUserName);
    form.control.get('ImgPath').setValue(this.ImagePath);
    form.control.get('Userid').setValue(sessionStorage.getItem('Id'));
    form.control.get('Edited').setValue("false");
    form.control.get('Date').setValue(new Date());
    this.service.posttweet().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Your Thought Tweeted Successfully', 'Success');
        this.reloadComponent();
        

      },
      error => {
        console.log(error)
      }
    );
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new tweet();
  }

}
