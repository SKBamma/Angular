import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form >
      <input type="text" placeholder="Email"> <br>
      <input type="text" placeholder="Password"> <br>
      <button   type="submit">Submit</button>
    </form>
  `,
  styles: ``
})
export class SigninComponent {

}
