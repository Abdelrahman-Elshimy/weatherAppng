import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UpdateNavService } from '../update-nav.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router, private dataService: UpdateNavService) {
    this.aIsUser = dataService.isUser;
   }
  errs = [];
  emailErrors = [];
  passwordErrors = [];
  success;
  notUser;
  aIsUser;

  ngOnInit(): void {
  }
  login(loginForm) {
    this.errs = [];
    this.notUser = '';
    this.emailErrors = [];
    this.passwordErrors = [];
    this.httpClient.post('http://localhost:3001/login',
      {
        email: loginForm.form.value.email,
        password: loginForm.form.value.password
      }, {
      responseType: "json",
    }).subscribe((data) => {
      console.log(data);
      let myData = [];
      myData.push(data);
      if(myData[0].errs) {
        this.errs = [...myData[0].errs];
        this.errs.forEach(err => {
          if(err.param == "email") {
            this.emailErrors.push(err);
          }
          else {
            this.passwordErrors.push(err);
          }
        });
      }
      if(myData[0].err) {
        this.notUser = myData[0].err;
      }
      if(myData[0].token) {
        localStorage.setItem('token', myData[0].token);
        localStorage.setItem('user_id', myData[0].user);
       this.dataService.toggleUser();
        this.router.navigate(['home']);
      }
    })
  }

}
