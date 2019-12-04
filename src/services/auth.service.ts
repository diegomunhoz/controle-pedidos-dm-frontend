import { Injectable } from "@angular/core";
import { CredenciaisDTO } from '../models/credenciais.model';
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from '../models/local-user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

  constructor(public http: HttpClient, public storageService: StorageService){}

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      })
  }

  successfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7)
    let user: LocalUser = {
      token: tok
    }
    this.storageService.setLocalUser(user)
  }

  logout() {
    this.storageService.setLocalUser(null)
  }
}