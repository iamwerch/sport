import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerUrl: string = 'http://localhost:3000/players';

  constructor(private httpClient: HttpClient) { }
  addPlayer(player: any) {
    return this.httpClient.post<{msg}>(this.playerUrl, player);
  }
  getPlayers() {
    return this.httpClient.get<{p}>(this.playerUrl);
  }
  deletePlayer(id: number) {
    return this.httpClient.delete<{p}>(this.playerUrl + '/' + id);
  } 
  editPlayer(obj) {
    return this.httpClient.put<{msg}>(this.playerUrl, obj);
  }
  getPlayerById(id: number) {
    return this.httpClient.get<{p}>(this.playerUrl + '/' + id);
  }
}
