import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StudioService} from '../../providers/studio-service-mock';
import {StudioDetailPage} from '../studio-detail/studio-detail';
import leaflet from 'leaflet';

@Component({
    selector: 'page-studio-list',
    templateUrl: 'studio-list.html'
})
export class StudioListPage {

    studios: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;

    constructor(
        public navCtrl: NavController, 
        public service: StudioService) 
    {
        service.findAll().then(data => this.studios = data);
    }

    openStudioDetail(studio) {
        this.navCtrl.push(StudioDetailPage, studio);
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
        this.studios.forEach(studio => {
            if (studio.lat, studio.long) {
                let marker: any = leaflet.marker([studio.lat, studio.long]).on('click', event => this.openStudioDetail(event.target.data));
                marker.data = studio;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }

}
