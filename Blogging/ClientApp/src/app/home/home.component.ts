import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SigninServiceService } from '../shared/components/signin-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  alert: boolean = false;
  round: boolean = false;

  loginStudent = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get email() { return this.loginStudent.get('email'); }

  get password() {
    return this.loginStudent.get('password');
  }
  //public forecasts: WeatherForecast[];

  //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //  http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
  //    this.forecasts = result;
  //  }, error => console.error(error));


  constructor(private router: Router, private service: SigninServiceService,) {
    sessionStorage.clear();
  }

  ngOnInit(): void { }

  // @String

  loginUser() {
    sessionStorage.setItem('UserName', this.loginStudent.value.email);
    this.round = true;
    this.service.getsignin().subscribe((result: any) => {
      result.find((te: any) => {
        if (te.email === this.loginStudent.value.email) {
          sessionStorage.setItem('Id',te.id)
        }
      })
      const student = result.find((temp: any) => {
        return ((temp.email === this.loginStudent.value.email) && (temp.password === this.loginStudent.value.password));
      })
      if (student != undefined) {
        this.loginStudent.reset();
        this.router.navigate(['../dashboard']);
        sessionStorage.setItem('valid', 'true');
        
      } else {
        this.round = false;
        this.alert = true;
      }

    })
  }

  closeAlert() {
    this.alert = false;
  }

  clearForm() {
    this.loginStudent.reset();
  }
}
