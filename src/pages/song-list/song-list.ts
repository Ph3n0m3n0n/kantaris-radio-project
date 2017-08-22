import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {SongService} from '../../providers/songs-service-mock';
import {SongDetailPage} from '../song-detail/song-detail';
import leaflet from 'leaflet';

@Component({
    selector: 'page-song-list',
    templateUrl: 'song-list.html'
})
export class SongListPage {

    songs: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;

    constructor(
        public navCtrl: NavController, 
        public service: SongService, 
        public config: Config) 
    {
        this.findAll();
    }

    openSongDetail(song: any) {
        this.navCtrl.push(SongDetailPage, song);
    }

    onInput(event) {
        this.service.findByName(this.searchKey)
            .then(data => {
                this.songs = data;
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
            .then(data => this.songs = data)
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
        this.songs.forEach(song => {
            if (song.lat, song.long) {
                let marker: any = leaflet.marker([song.lat, song.long]).on('click', event => this.openSongDetail(event.target.data));
                marker.data = song;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }

}
