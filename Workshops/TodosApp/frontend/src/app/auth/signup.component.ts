import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <form  [formGroup]="form" (ngSubmit)="onSignUp()">
    <input type="text" placeholder="Enter fullname" formControlName='fullname'> <br><br>
    <input type="text" placeholder="Enter email" formControlName='email'> <br><br>
    <input type="text" placeholder="Enter password" formControlName='password'> <br> <br>
    <button type="submit">Sign Up</button>
  </form>
  `,
  styles: ``
})


export class SignupComponent {

  form = inject(FormBuilder).group({
    fullname: '',
    email: '',
    password: ''
  });

  onSignUp() {
    console.log(this.form.controls.email.valueChanges);
  }

}
