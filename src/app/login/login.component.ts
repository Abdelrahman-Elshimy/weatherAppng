import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  errs = [];
  emailErrors = [];
  passwordErrors = [];
  success;
  notUser;

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
        
      }
    })
  }

}
