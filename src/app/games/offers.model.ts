export interface OffersModel {
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

    sellerCity: string;
    sellerState: string;

    //image?: HTMLImageElement;
}