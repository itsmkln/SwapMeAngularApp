export interface IGame {
    gameId: number;
    gameName: string;
    gameGenre: string;
    gameScore: number;
    gameAvailability: string;
    gamePrice: number | null | undefined | string;
    imageUrl: string;
    gameStars: number;
}