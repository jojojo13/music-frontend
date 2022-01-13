import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AuthorizeService } from 'src/app/service/authorize.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('popUpSwal') popUpSwal!: SwalComponent;
  signUpForm!: FormGroup;
  errorMsg = '';
  constructor(private auth: AuthorizeService, private router: Router) {
    this.signUpForm = new FormGroup({
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  submitForm() {
    //get loader animation
    const loader=document.querySelector('.loader')as HTMLElement
    //get btnSubmit 
    const btnSubmit=document.querySelector('.btnSubmit') as HTMLElement
    // spin animation active when submit form
    loader.classList.add('active')
    // change text to Loading when submit form
    btnSubmit.textContent='Loading'
    //create user object by form value
    const user = {
      email: this.Email?.value,
      username: this.UserName?.value,
      password: this.Password?.value,
    };
    // send request create account to server
    this.auth.createAccount(user).subscribe((result) => {
      // stop loader animation and change button text when submit done
      loader?.classList.remove('active')
      btnSubmit.textContent='Create'

      if (result) {
        this.popUpSwal.icon = 'success';
        this.popUpSwal.titleText = 'Đăng ký thành công';
        this.popUpSwal.update({
          icon: 'success',
          titleText: 'Đăng ký thành công',        
        });

        this.popUpSwal.fire();
      }
    },
      (err: any) => {
        loader?.classList.remove('active')
        btnSubmit.textContent='Create'
        this.errorMsg=err.error
      
      });
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
