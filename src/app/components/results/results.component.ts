import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
@Input() v: any=[];
  
constructor() { }

  ngOnInit() {
  }
scoreResult( a:number ,b:number ){
  if (a>b) {
    return 1
    
  }
  else if (a<b) {
    return 2
  }
  else { return 0}
}
scoreResultTeam( a:number ,b:number ){
  if (a>b) {
    return 'blue'
    
  }
  else if (a<b) {
    return 'red'
  }
  else { return 'yellow'}
}
}
