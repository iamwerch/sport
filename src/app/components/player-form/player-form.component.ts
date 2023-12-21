import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PlayerService } from "src/app/services/player.service";
import { TeamsService } from "src/app/services/teams.service";

@Component({
  selector: "app-player-form",
  templateUrl: "./player-form.component.html",
  styleUrls: ["./player-form.component.css"],
})
export class PlayerFormComponent implements OnInit {
  playerForm: FormGroup;
  title: string = "Add Player";
  id: any;
  players:any;
  obj: any = {};
  teams: any = [];
  teamId: any;
  constructor(
    private formBuiler: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private teamsService: TeamsService
  ) {}

  ngOnInit() {
    this.playerForm = this.formBuiler.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      age: [""],
      nbr: [""],
      position: [""],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.title = "edit";
      this.obj = this.players.find((obj: any) => {
        return obj.id == this.id;
      });
    }

    this.teamsService.getTeams().subscribe((data) => {
      this.teams = data.t;
    });
  }
  addOrEditPlayer() {
    this.obj.tId = this.teamId;
    console.log("Here final obj", this.obj);
    
    this.playerService.addPlayer(this.obj).subscribe((data) => {
      console.log("Here data 0", data.msg);
    });
  }

  selectTeam(evt:any) {
    this.teamId = evt.target.value;
  }
}
