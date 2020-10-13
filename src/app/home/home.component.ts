import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    title = 'lol-skills';

    stage = 0;

    selected = { role: '', difficulty: '6' }

    constructor(private router: Router) {

    }

    ngOnInit() {
        this.selected.role = '';
        this.selected.difficulty = '';
    }
    selectRole(role) {
        this.selected.role = role;
        console.log(this.selected);
    }
    selectDifficulty(diff) {
        this.selected.difficulty = diff;
        console.log(this.selected);
    }

    nextStage() {
        this.stage++;
    }

    begin() {
        const navigationExtras: NavigationExtras = { state: { role: this.selected.role, diffi: 6 } };
        this.router.navigate(['begin'], navigationExtras);
    }
}