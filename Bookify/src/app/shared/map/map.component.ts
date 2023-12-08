import {AfterViewInit, Component} from '@angular/core';
import {MapService} from "./map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;

  constructor(private mapService: MapService) {}

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: [45.2396, 19.8227],
  //     zoom: 13,
  //   });
  //
  //   const tiles = L.tileLayer(
  //     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     {
  //       maxZoom: 18,
  //       minZoom: 3,
  //       attribution:
  //         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //     }
  //   );
  //   tiles.addTo(this.map);
  //   this.registerOnClick()
  //   this.search()
  // }

  // registerOnClick(): void {
  //   this.map.on('click', (e: any) => {
  //     const coord = e.latlng;
  //     const lat = coord.lat;
  //     const lng = coord.lng;
  //     this.mapService.reverseSearch(lat, lng).subscribe((res) => {
  //       console.log(res.display_name);
  //     });
  //     console.log(
  //       'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
  //     );
  //     new L.Marker([lat, lng]).addTo(this.map);
  //   });
  // }

  // search(): void {
  //   this.mapService.search('Strazilovska 19, Novi Sad').subscribe({
  //     next: (result) => {
  //       console.log(result);
  //       L.marker([result[0].lat, result[0].lon])
  //         .addTo(this.map)
  //         .bindPopup('Pozdrav iz Strazilovske 19.')
  //         .openPopup();
  //     },
  //     error: () => {},
  //   });
  // }

  ngAfterViewInit(): void {

    if (typeof window !== 'undefined') {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        import(/* webpackChunkName: "leaflet" */ 'leaflet').then((L) => {
          L.Marker.prototype.options.icon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
          });

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
        }).catch((error) => {
          console.error('Error loading Leaflet:', error);
        });
      } else {
        // Handle non-browser environment (e.g., server-side rendering)
        console.warn('Leaflet is not initialized because the code is running in a non-browser environment.');
      }
    }
  }
}
