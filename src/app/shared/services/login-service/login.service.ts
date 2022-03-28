import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LoginModel } from 'src/app/core/models/login..model';
import { loginConstant } from '../../constants/login.constant';

@Injectable()
export class LoginService {

  constructor() { }

  login(userLogin: LoginModel): Observable<LoginModel>{
    const loginData = {...loginConstant};
    return userLogin.user === loginData.user && userLogin.pass === loginData.pass 
    ? of({...userLogin, profile: 'normal'}) : throwError({message: ''})
  }
}
