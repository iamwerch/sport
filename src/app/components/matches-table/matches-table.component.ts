import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
matches:any[];
  constructor(
    private router: Router, 
    private matchService: MatchService) { }

  ngOnInit() {
    this.allmatches();
  }
  goToDisplay(id:any){
    this.router.navigate([`matchInfo/${id}`])
  }

  goToEdit(id: number) {
    this.router.navigate([`matchForm/${id}`]); 
  }
  allmatches(){
    this.matchService.getMatches().subscribe (
      (data)=>{
        this.matches = data.t;
      }
      )
  }
  deleteMatch(id:number){
    this.matchService.deleteMatch(id).subscribe(
      (data)=>{
        //you can call a method inside a method
this.allmatches();
     }
    )   
    }
}


