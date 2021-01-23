import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  favorites = [];
  cities = [];

  ngOnInit(): void {
    this.favorites = [];
    this.httpClient.get('http://localhost:3001/favorite', {
      params: { id: localStorage.getItem('user_id') }
    }).subscribe((data) => {
      let myData = [];
      myData.push(data);
      this.favorites.push(myData[0].favs);
      this.favorites[0].forEach(element => {
        this.httpClient.get('http://localhost:3001/cityFav', {
          params: { id: element.cityID }
        }).subscribe((data) => {
          this.cities.push(data);
        });
      });
      
    })
  }

}
