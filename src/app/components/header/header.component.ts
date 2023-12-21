import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
user:any
  constructor() { }

  ngOnInit() {
  }
  isLoggedIn(){
    let token = sessionStorage.getItem("jwt");
    if (token) {
      this.user=this.decodeToken(token)
    }
    return !!token;
  }
  decodeToken(token: string) {
    return jwtDecode(token);
  }
}
