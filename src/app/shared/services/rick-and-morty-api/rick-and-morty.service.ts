import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterModel, ResultModel } from 'src/app/core/models/character.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class RickAndMortyService {

  private readonly uri = `${environment.uriBase}character`;
  constructor(private readonly http: HttpClient) { }

  getAllCharacters(): Observable<CharacterModel> {
    return this.http.get<CharacterModel>(this.uri);
  }

  getCharacter(id: number): Observable<ResultModel> {
    return this.http.get<ResultModel>(`${this.uri}/${id}`);
  }
}
