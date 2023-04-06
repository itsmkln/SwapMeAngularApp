let date: Date = new Date();

export class OffersEndedModel {

    TransactionId: number = 0;
    SellerId: number = 0;
    SellerUsername: string = "";
    SellerFirstName: string = "";
    SellerLastName: string = "";
    SellerEmail: string = "";
    SellerCity: string = "";
    SellerPhoneNumber: string = "";

    BuyerId: number = 0;
    BuyerUsername: string = "";
    BuyerFirstName: string = "";
    BuyerLastName: string = "";
    BuyerEmail: string = "";
    BuyerCity: string = "";
    BuyerState: string = "";
    BuyerPhoneNumber: string = "";

    OfferId: number = 0;
    GameName: string = "";
    PlatformName: string = "";
    OfferTypeName: string = "";
    OfferDescription: string = "";
    Status: string = "";
    CreatedOn: Date = date;
    EndedOn: Date = date;
    Price: number = 0;

}