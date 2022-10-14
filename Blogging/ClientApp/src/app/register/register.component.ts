import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
/*import { CommonService } from '../../common.service';*/
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SigninServiceService } from '../shared/components/signin-service.service';
import { countries } from '../shared/components/store/country-data-store'
import { bloguser } from '../shared/model/AppUserModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  public countries: any = countries;
  alert: boolean = false;
  response: { dbPath: '' };

  path: any;
  constructor(private router: Router, public service: SigninServiceService, private toastr: ToastrService) { }

  ngOnInit(): void { }
  goToLogin() {
    this.router.navigate(['']);
  }
  setUserName(e) {
    
    sessionStorage.setItem('UserName', e);
  }
  saveUser(form: NgForm) {

    form.control.get('ImgPath').setValue(this.path);
    form.control.get('Fullname').setValue(form.value.FirstName + ' ' + form.value.LastName);
    this.service.getsignin().subscribe((result: any) => {
      const student = result.find((temp: any) => {
        return (temp.email === sessionStorage.getItem('UserName'));
      })
      if (student != undefined) {
        this.resetForm(form);
        this.toastr.error('User Already Exist (Use differnet Email)', 'Error');
      }
      else {
        this.service.postcreate().subscribe((result) => {


          this.toastr.success('You are Registered Successfully', 'Success');
          this.resetForm(form);
          this.router.navigate(['']);
        },
          error => {
            console.log(error)
          }
        )
      }
    })
  
   
    

  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new bloguser();
  }

  uploadFinished = (event) => {
    this.response = event;
    this.path = this.response.dbPath;
  }
}
