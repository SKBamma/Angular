import { CurrencyPipe, DatePipe, NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { Child1Component } from './children/child1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgStyle, NgClass, Child1Component],
  template: `
    <h1>Welcome to {{title}}!</h1>
    <h3>Today's Date: {{date | date}}! </h3>
    <h3>My Salary is: {{mySalary | currency}}!</h3>

    <!-- // for loop  -->
    @for(student of students; track student.id){
      <li [ngClass] = "{back: true}">{{student.name}}</li>
    }
    <app-child1/>
    
  `,
  styles: `
  .back{background: gold}
  `,
})
export class AppComponent {
  // states

  title = 'Building Blocks of Angular';

  date = new Date();
  mySalary = 120254012514;

  constructor() {
    setTimeout(() => {
      this.title = "Learning Angular 18";
    }, 5000);
  }

  students = [
    { id: 1, name: 'Rajan' },
    { id: 2, name: 'Manjan' },
    { id: 3, name: 'Karna' },
    { id: 4, name: 'Jaswail' },
    { id: 5, name: 'Paraj' },
  ];
}
