import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/models/login..model';
import { LoginService } from 'src/app/shared/services/login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor( private readonly fb: FormBuilder,
               private readonly loginService: LoginService,
               private readonly router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      user: ['', [Validators.required, Validators.maxLength(8)]],
      pass: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  onClickLogin(): void{
    if(this.form.valid){
      this.calledLoginService();
    } else {
      alert('La información del formulario es incorrecta')
    }
  }

  calledLoginService(): void{
    const formValues = {...this.form.value};
    this.loginService.login(formValues).subscribe(
      (userLogin: LoginModel) =>{
        window.localStorage.setItem('userApp', 'success');
        this.router.navigate(['/character'])
      },
      (error: any) =>{
        alert(`Execution is bad... - ${error.message}`);
      }
    );
  }
}
