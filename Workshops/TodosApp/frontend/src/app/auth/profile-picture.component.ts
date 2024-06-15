import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from './profile.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
   <form [formGroup]="form" (ngSubmit)="onUpload()">
      <br>
     <input type="file" formControlName="picture" (change)="setFile($event)" > 
      <button type="submit">upload</button>
   </form>

   @for (pic of $pictures(); track pic._id) {
    <img width ="100" 
    src="http://localhost:3000/users/{{authService.state()._id}}/pictures/{{pic._id}}"/>
   }
  `,
  styles: ``
})
export class ProfilePictureComponent {

  readonly #profileService = inject(ProfileService);
  readonly #notifcation = inject(ToastrService);
  readonly authService = inject(AuthService);

  // real file ==> File
  file!: File;
  form = inject(FormBuilder).nonNullable.group({
    picture: ''
  });

  // load profile picture
  $pictures = signal<{ _id: string, url: string; }[]>([]);
  constructor() {
    this.#profileService.getPictures.subscribe(response => {
      this.$pictures.set(response.data);
    });

  }

  setFile(event: Event) {
    // console.log(event);
    this.file = (event.target as HTMLInputElement).files![0];
  }

  // upload profile picture
  onUpload() {
    // standard way of uploading file
    const formData = new FormData();
    formData.append('picture', this.file);

    // send post request
    this.#profileService.postPicture(formData).subscribe(response => {
      if (response.success) {
        this.#notifcation.success("Profile picture was uploaded successfully!");
        this.form.reset();
      } else {
        this.#notifcation.error("Unable to update profile picture!");
      }
    });
  }
}
