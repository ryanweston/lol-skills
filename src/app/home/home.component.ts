import { Component, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({ templateUrl: 'home.component.html', styleUrls: ['home.component.scss'] })


export class HomeComponent {

    constructor(private router: Router) {
    }

    hoverStatus = [];
    navScroll = false;
    data = [{ id: 'skills', status: true }, { id: 'champions', status: false }, { id: 'objectives', status: false }, { id: 'counters', status: false }, { id: 'items', status: false }];
    selected = '';



    ngOnInit() {
        //Set hover states
        for (let i = 0; i < this.data.length; i++) {
            this.hoverStatus.push(false);
        }
    }

    verify() {
        if (this.selected && this.selected !== 'tbd') {
            const navigationExtras: NavigationExtras = { state: { type: this.selected } };
            this.router.navigate(['setup'], navigationExtras);
        }
    }

    select(index) {
        if (this.data[index].status) {
            this.selected = this.data[index].id;
        } else {
            this.selected = 'tbd';
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
