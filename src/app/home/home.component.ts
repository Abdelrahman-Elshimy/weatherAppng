import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weather = [];
  err;
  getCity = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
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
