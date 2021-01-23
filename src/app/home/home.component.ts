import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weather = [];
  err;
  getCity = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  toYourFavorite(get_city_id) {
    console.log(localStorage.getItem('user_id'));
    this.httpClient.post('http://localhost:3001/favorite', {
      user_id: localStorage.getItem('user_id'),
      city_id: get_city_id
    }).subscribe((data) => {
      let mydata = [];
      mydata.push(data);
      if(mydata[0].msg == 'done') {
        this.router.navigate(['favorite']);
      }
      
    })
  }
  search(searchForm) {
    this.weather = [];
    this.err = "";
    this.httpClient.post('http://localhost:3001/city', {
      cityName: searchForm.form.value.cityName
    }).subscribe((data) => {
      
      let mydata = [];
      mydata.push(data);
      if(mydata[0].status === "400") {
        this.err = "Entre your city";
        this.getCity = false;
      }
      else if(mydata[0].status === "404") {
        this.err = "Entre your valid city";
        this.getCity = false;
      }
      else {
        this.getCity = true;
        this.weather = mydata;
      }
     
      
    })
  }

}
