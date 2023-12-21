import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  userUrl: string = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) { }
  addUser(obj: any, img: File) {
    let fData = new FormData();
    fData.append("firstName", obj.firstName)
    fData.append("lastName", obj.lastName)
    fData.append("email", obj.email)
    // fData.append("phoneNumber", obj.phoneNumber)
    fData.append("password", obj.password)
    fData.append("role", obj.role)
    fData.append("img", img)
    return this.httpClient.post<{ msg: string }>(this.userUrl + "/xyz", fData);
  }
  login(obj) {
    return this.httpClient.post<{ msg: string, token: any }>(`${this.userUrl}/login`, obj);
  }

}

