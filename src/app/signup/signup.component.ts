import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errs = [];
  nameErrors = [];
  emailErrors = [];
  passwordErrors = [];
  success;
  notUser;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  register(registerForm) {
    this.errs = [];
    this.emailErrors = [];
    this.passwordErrors = [];
    this.nameErrors = [];
    console.log(registerForm);
    this.httpClient.post('http://localhost:3001/register',
      {
        name: registerForm.form.value.name,
        email: registerForm.form.value.email,
        password: registerForm.form.value.password
      }, {
      responseType: "json",
    }).subscribe((data) => {
      console.log(data);
      let myData = [];
      myData.push(data);
      if (myData[0].errs) {
        this.errs = [...myData[0].errs];
        this.errs.forEach(err => {
          if (err.param == "email") {
            this.emailErrors.push(err);
          }
          else if (err.param == "password") {
            this.passwordErrors.push(err);
          }
          else {
            this.nameErrors.push(err);
          }
        });
      }
      if (myData[0].err) {
        this.notUser = myData[0].err;
      }
      if(myData[0].msg == 'done') {
        console.log('done done');
      }
      
    })
  }

}
