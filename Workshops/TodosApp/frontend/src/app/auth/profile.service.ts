import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  readonly #http = inject(HttpClient);
  readonly authService = inject(AuthService);

  // get all pictuures
  getPictures = this.#http.get<{ success: boolean, data: { _id: string, url: string; }[]; }>
    (environment.BACKEND_SERVER_URL + '/users/' + this.authService.state()._id + '/pictures');


  // get one picture by id
  getPictureById(picture_id: string) {
    this.#http.get<unknown>(environment.BACKEND_SERVER_URL +
      '/users/' + this.authService.state()._id + '/pictures/' + picture_id);
  }

  postPicture(formData: FormData) {
    return this.#http.post<{ success: boolean, data: boolean; }>(environment.BACKEND_SERVER_URL +
      '/users/' + this.authService.state()._id + '/pictures', formData);
  }


  deletePictureById(picture_id: string) {
    this.#http.delete<{ success: boolean, data: boolean; }>(environment.BACKEND_SERVER_URL +
      '/users/' + this.authService.state()._id + '/pictures' + picture_id);

  }
}
