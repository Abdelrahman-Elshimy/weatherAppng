import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isUser = false;
  constructor(private router: Router) { 
    
  }
  logout() {
    console.log(this.isUser);
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.isUser = false;
  }
  

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.isUser = true;
    }
    else {
      this.isUser = false;
    }
    
  }
  
  receiveMessage($event) {
    console.log($event);
    this.isUser = $event
    console.log(this.isUser);
  }

}
