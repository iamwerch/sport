import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {

  matchForm: FormGroup;
  match: any = {};
  title:string="Add Match"
  matchId:any;
  constructor(private activatedRoute: ActivatedRoute,
    private matchService: MatchService,
    private router: Router ) { }

  ngOnInit() {
    this.matchId=this.activatedRoute.snapshot.paramMap.get('id');
    if (this.matchId) {
      this.title = 'Edit Match';
      this.matchService.getMatcheById(this.matchId).subscribe(
        (data) => {this.match = data.m;
        this.matchForm.patchValue(this.match);}
        //OR ! this.match = data.m
      ) 
          
  }
}
  
addOrEditMatch() {
  if (this.matchId) {
    this.matchService.editMatch(this.match).subscribe(
      (data) => {
        
        this.router.navigate(['/admin'])
      },
    );
  } else {
    this.matchService.addMatch(this.match).subscribe(
      (data) => {
        console.log(data);
      },
    );
  }
}



}
