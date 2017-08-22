import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {ArtistService} from '../../providers/artist-service-mock';
import {ArtistDetailPage} from '../artist-detail/artist-detail';
import leaflet from 'leaflet';

@Component({
    selector: 'page-artist-list',
    templateUrl: 'artist-list.html'
})
export class ArtistListPage {

    artists: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;

    constructor(
        public navCtrl: NavController, 
        public service: ArtistService, 
        public config: Config) 
    {
        this.findAll();
    }

    openArtistDetail(artist: any) {
        this.navCtrl.push(ArtistDetailPage, artist);
    }

    onInput(event) {
        this.service.findByName(this.searchKey)
            .then(data => {
                this.artists = data;
                if (this.viewMode === "map") {
                    this.showMarkers();
                }
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    onCancel(event) {
        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .then(data => this.artists = data)
            .catch(error => alert(error));
    }

    showMap() {
        setTimeout(() => {
            this.map = leaflet.map("map").setView([42.361132, -71.070876], 14);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers();
        })
    }

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        this.artists.forEach(artist => {
            if (artist.lat, artist.long) {
                let marker: any = leaflet.marker([artist.lat, artist.long]).on('click', event => this.openArtistDetail(event.target.data));
                marker.data = artist;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }

}
