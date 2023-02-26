import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesModel } from "./games.model";

@Component({
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  pageTitle: string = "Game Details";
  game: GamesModel | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    const genreId = Number(this.route.snapshot.paramMap.get("genreId"));
    this.pageTitle += `: id ${id}`;
    this.game = {
      "gameId": id,
      "name": "name",
      "genreId": genreId,
    };
    }
    
    onBack(): void {
      this.router.navigate(["/games"]);
    }

  }