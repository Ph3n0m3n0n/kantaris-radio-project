import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {StudioService} from '../../providers/studio-service-mock';

@Component({
    selector: 'page-studio-detail',
    templateUrl: 'studio-detail.html'
})
export class StudioDetailPage {

    studio: any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public service: StudioService) 
    {
        this.studio = this.navParams.data;
        service.findById(this.studio.id).then(
            studio => this.studio = studio
        );
    }

}
