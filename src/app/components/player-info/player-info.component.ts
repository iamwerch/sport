import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
playerId:any;
foundPlayer:any;
  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(
      );
    this.playerId = this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayerById(this.playerId).subscribe(
      (data)=>{
        console.log(data);
        
        this.foundPlayer = data.p;
      }
    );

  }

}
