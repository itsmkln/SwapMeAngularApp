var now = new Date();

export class OfferDto {
    IsPhysical: boolean = false;
    CreatedOn: string = ""+now.toLocaleString;
    Price: number = 0;
    Status: string = "new";  // new/active/ended/sold


    OfferTypeId: number = 0;
    PlatformId: number = 0;
    GameId: number = 0;
    SellerId: number = 0;


    

}