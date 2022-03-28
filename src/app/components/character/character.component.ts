import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { concat, forkJoin, merge, Observable, throwError } from 'rxjs';
import { catchError, concatMap, mergeMap, tap } from 'rxjs/operators';
import { CharacterModel, ResultModel } from 'src/app/core/models/character.model';
import { RickAndMortyService } from 'src/app/shared/services/rick-and-morty-api/rick-and-morty.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  characters: CharacterModel;
  character: ResultModel;

  constructor( private characterService: RickAndMortyService) { }

  ngOnInit(): void {
    this.callServices();
  }

  callServices(): void {
    this.getObservableGetCharacters().pipe(
      mergeMap( (characters: CharacterModel) => this.getObservableCharacter(characters.results[0].id))
    ).subscribe();
  }

  getObservableGetCharacters(): Observable<CharacterModel> {
    return this.characterService.getAllCharacters().pipe(
      tap((characters: CharacterModel) => {
        this.characters = {...characters};
        console.log('Executing character service ...', this.characters);
      }),
      catchError( (error: HttpErrorResponse) => {
        console.log('Executin error...', error)
        alert('Error al consumir el servicio');
        return throwError(error);
      })
    );
  }

  getObservableCharacter(id: number): Observable<ResultModel> {
    return this.characterService.getCharacter(id).pipe(
      tap( (character: ResultModel) => {
        console.log('Executing alone Character...', character);

      }),
      catchError( (error: HttpErrorResponse) => {
        console.log('Execunting error alone character...', error);
        return throwError(error);
      })
    )
  }

}
