import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  title: string = "Match Info";
  matchId: any;
  matches: any = allMatches;
  foundMatch: any;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private matchService: MatchService ) { }

  ngOnInit() {
    this.matchService.getMatches().subscribe(
      );
    this.matchId = this.activatedRoute.snapshot.paramMap.get('id');
    this.matchService.getMatcheById(this.matchId).subscribe(
      (data)=>{
        console.log(data);
        
        this.foundMatch = data.m;
      }
    );


    
  }
}


