import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateNavService } from '../update-nav.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isUser = false;
  constructor(private router: Router, private dataService: UpdateNavService) {
    
    this.dataService.userChange.subscribe((va) => {
      this.isUser = va;
    });
  }
  get isUserValue(): boolean {
    return this.dataService.isUser;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.router.navigate(['']);
    this.dataService.toggleUser();
  }


  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isUser = true;
    }
    else {
      this.isUser = false;
    }

  }



}
