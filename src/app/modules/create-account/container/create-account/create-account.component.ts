import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  imageSrc : string | undefined ;
  pageType: string;

  constructor(private router: Router ) {
        this.pageType= this.router.url.includes("volunteer") ? "volunteer" : "ngo";
  }
  ngOnInit() : void {
    this.imageSrc = '/assets/images/volunteering.jpg';
  }

  setImage(imageSrc: string){
    this.imageSrc = imageSrc;
  }
}
