import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizeService } from 'src/app/service/authorize.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private auth: AuthorizeService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  submitForm() {
    const user = {
      email: this.Username?.value,
      password: this.Password?.value,
    };
    this.auth.login(user).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        console.log('zo day ne')
        if(window.opener){
    
          window.opener.document.location.href  =  window.opener.document.location.href
        } 
        window.close()
      },
      (err: any) => (this.errorMessage = err.error)
    );  
  }

  get Username() {
    return this.loginForm.get('username');
  }
  get Password() {
    return this.loginForm.get('password');
  }
}
