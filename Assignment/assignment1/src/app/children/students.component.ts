import { NgClass, SlicePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [TitleCasePipe, SlicePipe, NgClass],
  template: `

   @for(student of students; track student._id; let odd =$odd){
   <li [ngClass]="{grey: odd, col: odd}"> {{((student.name.length > 5) ? 
   (student.name | slice:0:5).trim() + '...':(student.name) ) | titlecase}}</li>
   }

  `,
  styles: `
  .grey{
    background-Color:grey
  }
  .col{
    color: blue
  }`
})
export class StudentsComponent {

  students = [
    { _id: "1", name: "rajesh khanna" },
    { _id: "2", name: "ram baran yadav" },
    { _id: "3", name: "janaki sharma" },
    { _id: "4", name: "kamal kapoor" }
  ];
}
