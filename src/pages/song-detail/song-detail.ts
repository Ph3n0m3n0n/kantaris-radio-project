import { Component } from '@angular/core';
import { ActionSheetController, ActionSheet, NavController, NavParams, ToastController } from 'ionic-angular';
import { SongService } from '../../providers/songs-service-mock';
import { StudioService } from '../../providers/studio-service-mock';

@Component({
    selector: 'page-song-detail',
    templateUrl: 'song-detail.html'
})
export class SongDetailPage {

    song: any;

    constructor(
        public actionSheetCtrl: ActionSheetController, 
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public songService: SongService, 
        public studioService: StudioService,
        public toastCtrl: ToastController) 
    {
        this.song = this.navParams.data;
        songService.findById(this.song.id).then(
            song => this.song = song
        );
    }

    openStudioDetail(studio) {
        this.navCtrl.push(SongDetailPage, studio);
    }

    openArtistDetail(artist) {
        this.navCtrl.push(SongDetailPage, artist);
    }

    favorite(song) {
        this.songService.favorite(song)
            .then(song => {
                let toast = this.toastCtrl.create({
                    message: 'Song added to your favorites',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    share(song) {
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
