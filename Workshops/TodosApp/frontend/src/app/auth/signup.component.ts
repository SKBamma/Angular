import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { IUser } from './auth.types';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <form  [formGroup]="form" (ngSubmit)="onSignUp()">
    <br>
    <input type="text" placeholder="Enter fullname" formControlName='fullname'> <br><br>
    <input type="text" placeholder="Enter email" formControlName='email'> <br><br>
    <input type="text" placeholder="Enter password" formControlName='password'> <br> <br>
    <button type="submit" [disabled]="form.invalid">Submit</button>
  </form>
  `,
  styles: ``
})


export class SignupComponent {
  readonly authService = inject(AuthService);
  readonly #router = inject(Router);
  form = inject(FormBuilder).group({
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSignUp() {
    this.authService.userSignup(this.form.value as IUser).subscribe(response => {
      if (response.success) {
        this.#router.navigate(['signin']);
      }
    });
    console.log("hellowewew");
  }

}
