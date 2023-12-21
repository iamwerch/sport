import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  matchUrl: string = 'http://localhost:3000/allMatches';
  constructor(private httpClient: HttpClient) { }
  addMatch(obj) {
    return this.httpClient.post<{m:any}>(this.matchUrl, obj);
  }
  editMatch(obj:any) {
    return this.httpClient.put<{msg}>(this.matchUrl , obj);
  }
  deleteMatch(id: number) {
    return this.httpClient.delete<{m:any}>(`${this.matchUrl}/${id}`);
  }
  getMatches() {
    return this.httpClient.get<{t:any}>(this.matchUrl);
  }
  getMatcheById(id) {
    return this.httpClient.get<{m:any}>(this.matchUrl + '/' + id);
  }
  searchMatchByName(name){
    return this.httpClient.post(`${this.matchUrl}/search`,name);
  }
}
