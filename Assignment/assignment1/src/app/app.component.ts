import { Component } from '@angular/core';
import { StudentsComponent } from './children/students.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentsComponent, NgStyle],
  template: `
    <h3 [ngStyle]="{color: 'green'}">Welcome to {{title}}!</h3>
    <app-students/>

    
  `,
  styles: [],
})
export class AppComponent {
  title = 'assignment1';
}
