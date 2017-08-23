import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {StudioDetailPage} from '../studio-detail/studio-detail';
//import {SongDetailPage} from '../song-detail/song-detail';
import {ArtistService} from '../../providers/artist-service-mock';
import {SongService} from '../../providers/songs-service-mock';
//import {StudioService} from '../../providers/studio-service-mock';

@Component({
    selector: 'page-artist-detail',
    templateUrl: 'artist-detail.html'
})
export class ArtistDetailPage {

    artist: any;

    constructor(
        public actionSheetCtrl: ActionSheetController, 
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public artistService: ArtistService,
        public songService: SongService, 
        public toastCtrl: ToastController) 
    {
        this.artist = this.navParams.data;
        artistService.findById(this.artist.id).then(
            artist => this.artist = artist
        );
    }

    openStudioDetail(studio) {
        this.navCtrl.push(StudioDetailPage, studio);
    }

    // openSongDetail(song) {
    //     this.navCtrl.push(StudioDetailPage, song);
    // }

    favorite(artist) {
        this.artistService.favorite(artist)
            .then(artist => {
                let toast = this.toastCtrl.create({
                    message: 'Artist added to your favorites',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    share(artist) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

}
