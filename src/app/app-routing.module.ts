import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { MatchFormComponent } from './components/match-form/match-form.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { HomeComponent } from './components/home/home.component';
import { PlayersComponent } from './components/players/players.component';
import { MatchesComponent } from './components/matches/matches.component';
import { TeamsComponent } from './components/teams/teams.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { SearchMatchComponent } from './components/search-match/search-match.component';
import { AddStadiumComponent } from './components/add-stadium/add-stadium.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { WeatherComponent } from './components/weather/weather.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent}, 
  {path:"signup", component:SignupComponent},
  {path:"signupAdmin", component:SignupComponent},
  {path:"addTeam", component:AddTeamComponent},
  {path:"editTeam", component:EditTeamComponent},
  {path:"matchForm/:id", component:MatchFormComponent},
  {path:"matchForm", component:MatchFormComponent},
  {path:"playerForm", component:PlayerFormComponent},
  {path:"playerForm/:id", component:PlayerFormComponent},
  {path:"allPlayers", component:PlayersComponent},
  {path:"allMatches", component:MatchesComponent},
  {path:"allMatches/search", component:MatchesComponent},
  {path:"allTeams", component:TeamsComponent},
  {path:"admin", component:AdminComponent},
  {path:"matchInfo/:id", component:MatchInfoComponent},
  {path:"searchMatch", component:SearchMatchComponent},
  {path:"addStadium", component:AddStadiumComponent},
  {path:"playerInfo/:id", component:PlayerInfoComponent},
  {path:"editPlayer/:id", component:PlayerFormComponent},
  {path:"weather", component:WeatherComponent},
  {path:"teamInfo/:id", component:TeamInfoComponent}
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
