import {AfterViewInit, Component} from '@angular/core';
import {MapService} from "./map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  L: any;

  constructor(private mapService: MapService) {}

  private initMap(L: any): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.search(L);
  }

  setCenter(coordinates: any){
    if (this.map) {
      this.map.setView(coordinates, this.map.getZoom());
    }
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        // console.log(res.display_name);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      new this.L.Marker([lat, lng]).addTo(this.map);
    });
  }

  search(location: string): void {
    this.mapService.search(location).subscribe({
      next: (result) => {
        this.L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .openPopup();
        this.setCenter([result[0].lat, result[0].lon]);
      },
      error: () => {},
    });
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      import('leaflet').then((L) => {
        this.L = L;
        L.Marker.prototype.options.icon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png'
        });
        this.initMap(L);
      })
    }
  }
}
