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
  constructor(private router: Router, private auth: AuthorizeService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  submitForm() {
    //get loader animation
    const loader = document.querySelector('.loader') as HTMLElement;
    //get btnSubmit
    const btnSubmit = document.querySelector('.btnSubmit') as HTMLElement;
    // spin animation active when submit form
    loader.classList.add('active');
    // change text to Loading when submit form
    btnSubmit.textContent = 'Loading';

    const user = {
      email: this.Username?.value,
      password: this.Password?.value,
    };

    this.auth.login(user).subscribe(
      (data: any) => {
        // stop loader animation and change button text when submit done
        loader?.classList.remove('active');
        btnSubmit.textContent = 'Create';

        // if loggin success set token to localStorage
        localStorage.setItem('token', data.token);
        if (window.opener) {
          window.opener.document.location.href =
            window.opener.document.location.href;
        }
        window.close();
      },

      (err: any) => {
        // stop loader animation and change button text when submit done
        loader?.classList.remove('active');
        btnSubmit.textContent = 'Create';
        //show  error message to form
        this.errorMessage = err.error;
      }
    );
  }

  get Username() {
    return this.loginForm.get('email');
  }
  get Password() {
    return this.loginForm.get('password');
  }
}
