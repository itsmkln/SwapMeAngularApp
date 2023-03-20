export interface GamesModel {
    gameId: number// = 0;
    gameName: string;
    genreId: number// = 0;
    offerId: number;
    genreName: string;
    platformName: string;
    sellerName: string;
    offerTypeName: string;
    price: number;
    description: string;
    status: string;
    createdOn: string;
    isPhysical: boolean;

    //image?: HTMLImageElement;
}