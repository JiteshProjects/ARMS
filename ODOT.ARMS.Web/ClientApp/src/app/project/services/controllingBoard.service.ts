import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { Observable, of } from 'rxjs';
import { EnvService } from '../../core/services/env.service';
import { IControllingBoard } from '../models/controllingBoard';

@Injectable({
  providedIn: 'root'
})
export class ControllingBoardService extends BaseService {

  constructor(private http: HttpClient,
    env: EnvService) {
    super(env);
  }

  //******************************************Controlling Board***************************************//

  getCBsByProjectId(prjId: string): Observable<IControllingBoard[]> {
    return this.http.get<IControllingBoard[]>(`${this.apiUrl}/ArmsControllingBoard/GetArmsCBListByProjectId?projectId=${prjId}`,
      { headers: { 'Accept': 'application/vnd.dot.arms.CBListfordd+json' } });
  }
  createCBs(CBs: FormData): Observable<IControllingBoard> {
    return this.http.post<IControllingBoard>(`${this.apiUrl}/ArmsControllingBoard/AddArmsCBEvents`, CBs, {
    });
  }

  EditArmsCBs(CBs: FormData): Observable<IControllingBoard> {
    return this.http.put<IControllingBoard>(`${this.apiUrl}/ArmsControllingBoard/EditArmsCBEvents`, CBs, {
    });
  }
  //******************************************Controlling Board***************************************//


}
