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
        if (this.selected) {
            const navigationExtras: NavigationExtras = { state: { type: this.selected } };
            this.router.navigate(['setup'], navigationExtras);
        }
    }

    select(type) {
        this.selected = type;
        console.log(this.selected);
    }

    mouseEnter(id) {
        console.log("mouse enter : " + id);
        this.hoverStatus[id] = true;
    }
    mouseLeave(id) {
        this.hoverStatus[id] = false;
        console.log("mouse leave : " + id);
    }

}