import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';


@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  searchForm: FormGroup;
  teams: any = [];
  path: string;
  isDisplayed: boolean = false;
  obj: any = {};
  findedTeams: any = [];
 
  constructor(
    private router: Router,
    private teamsService:TeamsService) { }

  ngOnInit() {
    this.teamsService.getTeams().subscribe(
      (data)=>{
        this.teams = data.t;
      }
    )
    //récupérer le path
    this.path = this.router.url;
    if (this.path == '/admin') {
      this.isDisplayed = true;
    }
    

  }
  goToDisplayTeam(id){
    this.router.navigate([`teamInfo/${id}`]);
  }

  search() {
    // console.log('here is stadium to search', this.obj);
    this.findedTeams=[];
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].stadium == this.obj.stadium) {
        this.findedTeams.push(this.teams[i]);
      }

    }
    this.teams = this.findedTeams;
    
  }



}
