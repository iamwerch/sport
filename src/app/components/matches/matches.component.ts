import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
matches: any=[];
title : string="Matches";
teamToFind : any;
path : string;
foundMatches :any=[];
match:any;

  constructor(private  router:Router, private matchService: MatchService) { }

  ngOnInit() {
   
    // this.matches= allMatches;
    this.matchService.getMatches().subscribe(
      (data)=>{
        this.matches=data.t;
        
      }
    )
    
    
    this.teamToFind = JSON.parse(localStorage.getItem("searchedMatch"));
    
    
   for (let i = 0; i < this.matches.length; i++) {
    
    if (this.matches[i].teamOne == this.teamToFind.search || this.matches[i].teamTwo == this.teamToFind.search) {
     
      
      this.foundMatches.push(this.matches[i])
    }
    
   }
  
   
   this.path =this.router.url;
   if (this.path =='/allMatches/search') {
    this.matches= this.foundMatches
   }


  }


}
