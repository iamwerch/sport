import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
match:any= {id1:1,teamOne:"FCB",teamTwo:"RMD",scoreOne:"0",scoreTwo:"2"}
  constructor() { }

  ngOnInit() {
  }

}
