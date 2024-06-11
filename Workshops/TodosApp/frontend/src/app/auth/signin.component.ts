import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { jwtDecode } from "jwt-decode";

import { AuthService } from './auth.service';
import { SigninType, State } from './auth.types';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSignin()">
      <br> <br>
      <input type="text" placeholder="Email" formControlName='email'> <br> <br>
      <input type="password" placeholder="Password" formControlName='password'> <br><br>
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `,
  styles: ``
})
export class SigninComponent {
  readonly authService = inject(AuthService);
  readonly #notificationToastr = inject(ToastrService);
  readonly #router = inject(Router);

  form = inject(FormBuilder).group({
    email: ['sb@gmail.com', [Validators.required, Validators.email]],
    password: ['123123', [Validators.required]]
  });

  onSignin() {
    // check in the data base
    this.authService.userSignin(this.form.value as SigninType).subscribe({
      next: response => {
        if (response.success) {
          // console.log("encoded", response.data);

          //save the state
          const decoded_token = jwtDecode(response.data) as State;
          // console.log(decoded_token);

          this.authService.state.set({
            _id: decoded_token._id,
            fullname: decoded_token.fullname,
            email: decoded_token.email,
            jwt: response.data
          });
          //redirect to todos(main page)
          this.#router.navigate(['', 'todos', 'list']);

        }
      },
      error: error => {
        this.#notificationToastr.error(`Invalid Username or Password!`);
      }
    });
  }

}
