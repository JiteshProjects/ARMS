import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Observable, of } from 'rxjs';
import { EnvService } from '../../core/services/env.service';
import { PersonnelRaw} from '../models/projects';


@Injectable({
  providedIn: 'root'
})
export class PersonnelDataService extends BaseService {

constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }


  loadSelectedPersonnel(prjId: string): Observable<PersonnelRaw[]> {
    return this.http.get<PersonnelRaw[]>(`${this.apiUrl}/Personnel/${prjId}`, {
      headers : {'Accept': 'application/vnd.dot.arms.personnelById+json' }
    });
  }

  createPersonnel(personnel: PersonnelRaw): Observable<PersonnelRaw> {
      return this.http.post<PersonnelRaw>(`${this.apiUrl}/Personnel`, personnel, {
        headers: {'Content-Type': 'application/vnd.dot.arms.personnelforcreate+json'}
      });
  }

  updatePersonnel(personnel: PersonnelRaw): Observable<PersonnelRaw> {
      return this.http.patch<PersonnelRaw>(`${this.apiUrl}/Personnel`, personnel, {
        headers: {'Content-type': 'application/vnd.dot.arms.personnelforupdate+json' }
      });
  }
}





