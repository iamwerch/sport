import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  imagePreview: any;

  constructor(private formBuilder: FormBuilder,
    private userService: UsersService, private router: Router,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), this.passwordValidator()]],
      // phoneNumber: [''],
      img:[''],

    });


  }


  signup() {

    console.log("signup form clicked", this.signupForm.value);
    // if (this.router.url == '/signupAdmin') {
    //   this.signupForm.value.role = 'Admin'
    // } else {
    //   this.signupForm.value.role = 'User'
    // }
    this.signupForm.value.role = (this.router.url == '/signupAdmin') ? 'Admin' : 'User';

    this.userService.addUser(this.signupForm.value,this.signupForm.value.img)
      .subscribe(
        (data) => {
          console.log("data", data.msg);
        },

      );

  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("Here file", file);
    
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

  private passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;

      if (!value) {
        return null;
      }
      if (value.length < 5) {
        return { minLength: true };
      }
      if (value.length > 10) {
        return { maxLength: true };
      }
      if (!/[A-Z]/.test(value)) {
        return { uppercase: true };
      }
      if (!/\d/.test(value)) {
        return { number: true };
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return { specialCharacter: true };
      }

      return null;
    };
  }
}
