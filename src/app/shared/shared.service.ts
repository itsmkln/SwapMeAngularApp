import { Injectable } from '@angular/core';
import { OffersModel } from '../games/offers.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  offerObj: string = "";

  constructor() { }
}
