import { Injectable } from '@angular/core';
import { GamesModel } from '../games/games.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  offerObj: string = "";

  constructor() { }
}
