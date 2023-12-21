import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-match',
  templateUrl: './search-match.component.html',
  styleUrls: ['./search-match.component.css']
})
export class SearchMatchComponent implements OnInit {
  searchMatchForm: FormGroup;
  obj: any = {};
  searchedmatch:any={}
  constructor(private router:Router
    ) { }

  ngOnInit() {
  }
  SearchMatch (){ 
    localStorage.setItem('searchedMatch', JSON.stringify(this.obj));
this.router.navigate(['/allMatches/search']);
    }
}



