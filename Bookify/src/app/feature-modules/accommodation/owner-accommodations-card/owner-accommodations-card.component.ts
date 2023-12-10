import {Component, Input, OnInit} from '@angular/core';
import {AccommodationBasicModel} from "../model/accommodation-basic.model";
import {AccommodationService} from "../accommodation.service";

@Component({
  selector: 'app-owner-accommodations-card',
  templateUrl: './owner-accommodations-card.component.html',
  styleUrl: './owner-accommodations-card.component.css'
})
export class OwnerAccommodationsCardComponent implements OnInit{
  @Input()
  accommodation: AccommodationBasicModel;
  image: string | ArrayBuffer | null = null;

  constructor(private accommodationService: AccommodationService) {

  }

  ngOnInit(): void {
    this.accommodationService.getImage(this.accommodation.imageId).subscribe({
      next: (imageData: Blob) => {
        const reader: FileReader = new FileReader();
        reader.onloadend = () => {
          this.image = reader.result;
        }
        reader.readAsDataURL(imageData);
      },
      error: err => {}
    })
  }

}