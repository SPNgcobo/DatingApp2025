import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import type { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class VipService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getUserWithRoles() {
    return this.http.get<User[]>(this.baseUrl + 'vip/users-with-roles');
  }

  updateUserRoles(username: string, roles: string[])  {
    return this.http.post<string[]>(this.baseUrl + 'vip/edit-roles/' 
      + username + '?roles=' + roles, {});
  }
}
