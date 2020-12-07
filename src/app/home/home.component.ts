import { Component, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({ templateUrl: 'home.component.html', styleUrls: ['home.component.scss'] })


export class HomeComponent {

    constructor(private router: Router) {
    }

    hoverStatus = [];
    navScroll = false;
    data = [{ id: 'skills', status: true, description:'Quiz yourself based on champion skill descriptions. You\'ll be given 6 champions and you have to pick the champion the skill belongs too.'}, { id: 'champions', status: false, description:'Quiz yourself based on champion skill descriptions. You\'ll be given 6 champions and you have to pick the champion the skill belongs too.' }, { id: 'objectives', status: false, description:'COMING SOON' }, { id: 'counters', status: false, description:'COMING SOON' }, { id: 'items', status: false, description:'Quiz yourself based on champion skill descriptions. You\'ll be given 6 champions and you have to pick the champion the skill belongs too.' }];
    selected = { id: '', status: null};



    ngOnInit() {
        //Set hover states
        for (let i = 0; i < this.data.length; i++) {
            this.hoverStatus.push(false);
        }
    }

    verify() {
        if (this.selected.status !== false ) {
            const navigationExtras: NavigationExtras = { state: { type: this.selected } };
            this.router.navigate(['setup'], navigationExtras);
        }
    }

    select(index) {
        this.selected.id = this.data[index].id;

        if (this.data[index].status) {
            this.selected.status = true;
        } else {
            this.selected.status = false;
        }
    }

    mouseEnter(index) {
        this.hoverStatus[index] = true;
    }
    mouseLeave(index) {
        this.hoverStatus[index] = false;
    }
   
    onWindowScroll() {
        console.log(document.documentElement.scrollTop);
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        let max = document.documentElement.scrollHeight;
        if (pos >= (max + 100)) {
            this.navScroll = true;
        } else {
            this.navScroll = false;
        }
    }

}
