import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizeService } from 'src/app/service/authorize.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  constructor(private auth: AuthorizeService) {
    this.signUpForm = new FormGroup({
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  submitForm() {
    const user = {
      email: this.Email?.value,
      username: this.UserName?.value,
      password: this.Password?.value,
    };
 
    this.auth.createAccount(user).subscribe((result) => {
      if (result) {
        
      }
    }),
      (err: Error) => {

      };
  }

  get Email() {
    return this.signUpForm.get('email');
  }

  get Password() {
    return this.signUpForm.get('password');
  }
  get UserName() {
    return this.signUpForm.get('username');
  }
}
