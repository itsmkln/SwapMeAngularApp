import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGame } from './games';

@Component({
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  pageTitle: string = "Game Details";
  game: IGame | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.pageTitle += `: id ${id}`;
    this.game = {
      "gameId": id,
      "gameName": "huj",
      "gamePrice": 6,
      "gameScore": 6,
      "gameAvailability": "huj",
      "gameGenre": "huiii",
      "gameStars": 5,
      "imageUrl": "/src/assets/gameHeaders/hades.jpg"
    };
    }
    
    onBack(): void {
      this.router.navigate(["/games"]);
    }

  }