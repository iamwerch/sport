import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teamUrl: string = "http://localhost:3000/teams"
  constructor(private httpClient: HttpClient) { }

  addTeam(obj) {
    return this.httpClient.post<{msg:string}>(this.teamUrl, obj);
  }

  getTeams() {
    return this.httpClient.get<{t:any}>(this.teamUrl);
  }

  getTeamById(id) {
    return this.httpClient.get(`${this.teamUrl}/${id}`);
  }

  updateTeam(obj) {
    return this.httpClient.put(`${this.teamUrl}/${obj.id}`, obj);
  }

  deleteTeam(id) {
    return this.httpClient.delete(`${this.teamUrl}/${id}`);
  }
}
