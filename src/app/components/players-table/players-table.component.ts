import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  players: any=[];
  path:string;
  isDisplayed:boolean=false;
  constructor(private router:Router, private playerService:PlayerService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(
      (data)=>
      {
        this.players=data.p;
        console.log(this.players);
      }
    )
    this.path=this.router.url;
    if (this.path == '/admin') {
      this.isDisplayed = true;
      
    }
    
  }
  gotodisplay(id:any){
    this.router.navigate([`/playerInfo/${id}`]);
  }
  allPlayers(){
    this.playerService.getPlayers().subscribe (
      (data)=>{
        this.players = data.p;
      }
      )
  }
  deletePlayer(id:number){
    this.playerService.deletePlayer(id).subscribe(
      (data)=>{
        //you can call a method inside a method
this.allPlayers();
    })};

  goToEdit(id){
    this.router.navigate([`/playerForm/${id}`]);
  }

  }
  

 
