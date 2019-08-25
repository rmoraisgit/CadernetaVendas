import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authenticate/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/user/user';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'cv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('inputUserName') inputUserName: ElementRef<HTMLInputElement>;

  user: User;
  errors: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid && this.loginForm.dirty) {

      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      console.log('TIO RAFAEL');

      this.authService.authenticate(email, password)
        .subscribe(
          success => {
            console.log('DEU SUCESSO');
            this.onSaveComplete(success);
          },
          fail => {
            console.log('DEU ERRO');
            this.onError(fail);
          }
        );
    }
  }

  onSaveComplete(data: any) {
    console.log(data)
    this.authService.persistirTokenUserApp(data);
    this.alertService.success('Login efetuado com sucesso.');
    this.router.navigate([''])
  }

  onError(fail: any) {
    console.log(fail)
    this.errors = fail.error.errors;
    this.loginForm.reset();
    this.inputUserName.nativeElement.focus();
  }

  fecharErros() {
    this.errors = [];
  }
}