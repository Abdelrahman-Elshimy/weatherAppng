import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateNavService {

  isUser: boolean;

    userChange: Subject<boolean> = new Subject<boolean>();

    constructor()  {
        this.userChange.subscribe((value) => {
            this.isUser = value
        });
    }

    toggleUser() {
        this.userChange.next(!this.isUser);
    }
}
