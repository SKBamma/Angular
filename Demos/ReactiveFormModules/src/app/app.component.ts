import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  template: `
    <h3>Welcome to {{title}}!</h3>
    <form [formGroup]="form" (ngSubmit)="submit()">
     <p>  <input placeholder="Enter email" formControlName = "email"/> </p>
     @if(email.invalid && email.touched && email.dirty ){
      @if(email.errors?.['required']){
           <p>Email is required!</p>
      }
      @if(email.errors?.['email']){
        <p>Email must have email structure!</p>
      }
     }
      <p> <input type="password" placeholder="Enter password" formControlName = "password"> </p>
      @if(password.invalid && password.touched && password.dirty){
        @if(password.errors?.['required']){
          <p>Password is required to enter</p>
        }
        @if(password.errors?.['minlength']){
          <p>Password must have 10 character!</p>
        }
        @if(password.errors?.['notzerotonine']){
          <p>Password must not be 123456789</p>
        }
      }

      <p> <button type="submit" [disabled]="form.invalid">Submit</button></p>
     <p> <button type="reset">clear</button> </p>
    </form>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'Reactive Form Modules';

  form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email],],
    password: ['', [Validators.required, Validators.minLength(10), this.notZeroToNine],]
  }); // what if for custom cross-validation // refer to the slides


  get email() { return this.form.controls.email; }
  get password() { return this.form.controls.password; }

  constructor() {
    // 3 types of observable
    this.form.statusChanges.subscribe(console.log);

    // this.form.valueChanges.subscribe(console.log);
    // this.form.events.subscribe(console.log);
    // // only one state
    // this.form.events.subscribe(console.log);
  }
  submit() {
    console.log(this.form.value);
  }

  // make own custom validator
  notZeroToNine(control: AbstractControl) {
    if (control.value === '0123456789') {
      return { 'notzerotonine': true };
    } else {
      return null;
    }
  }
}
