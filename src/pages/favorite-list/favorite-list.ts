import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ArtistService} from '../../providers/artist-service-mock';
import {ArtistDetailPage} from '../artist-detail/artist-detail';

@Component({
    selector: 'page-favorite-list',
    templateUrl: 'favorite-list.html'
})
export class FavoriteListPage {

    favorites: Array<any>;

    constructor(public navCtrl: NavController, public service: ArtistService) {
        this.getFavorites();
    }

    itemTapped(favorite) {
        this.navCtrl.push(ArtistDetailPage, favorite.artist);
    }

    deleteItem(favorite) {
        this.service.unfavorite(favorite)
            .then(() => {
                this.getFavorites();
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    getFavorites() {
        this.service.getFavorites()
            .then(data => this.favorites = data);
    }

}
