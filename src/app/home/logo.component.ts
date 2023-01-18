import { Component } from "@angular/core";

@Component({
    selector: 'gts-logo',
    templateUrl: "./logo.component.html"
})

export class LogoComponent {
    imagePath: string = "/assets/logo/swapmelogo.svg";
}