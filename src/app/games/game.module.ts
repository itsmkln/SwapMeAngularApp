import { NgModule } from '@angular/core';
import { GamesListComponent } from './games-list.component';
import { GameDetailsComponent } from './game-details.component';
import { RouterModule } from '@angular/router';
import { GameDetailsGuard } from './game-details.guard';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    GamesListComponent,
    GameDetailsComponent,
  ],
  providers: [
    GameDetailsComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: "offers", component: GamesListComponent},

      { 
        path: "offers/:id",
        canActivate: [GameDetailsGuard],
        component: GameDetailsComponent
      },
    ]),
    SharedModule,
  ]
})
export class GameModule { }
