import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {

    hoverStatus = [];
    data = [{ id: 'skills', status: true }, { id: 'champions', status: false }, { id: 'items', status: false }];
    selected = '';

    constructor(private router: Router) {

    }

    ngOnInit() {
        //Set hover states
        for (let i = 0; i < this.data.length; i++) {
            this.hoverStatus.push(false);
        }
        console.log(this.hoverStatus);
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

}