import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {

    data = [{ id: 'skills', status: true }, { id: 'champions', status: false }, { id: 'items', status: false }];
    selected = String;

    constructor(private router: Router) {

    }

    ngOnInit() {

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

}