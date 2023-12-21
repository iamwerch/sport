import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import jwtDecode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: any = {};
  error: string = "";

  constructor(
    private userService: UsersService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.user).subscribe(
      (data) => {
        if (data.token) {
          sessionStorage.setItem("jwt", data.token)
          console.log("here is user data", data.token);
          let user: any = this.decodeToken(data.token);
          if (user.role == "admin") {
            this.router.navigate(["admin"])
          } else {
            this.router.navigate(['/profile']);
          }
        } else {
          this.error = "User Not Found Check your Info"
        }
      }

    )

  }
  decodeToken(token: string) {
    return jwtDecode(token);
  }
}
