import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    title = 'lol-skills';

    stage = 0;

    selected = { role: '', difficulty: '' }

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
        //route to component with data inside url
        //find amount of champions depending on selected.diff in role dependant on selected.selectRole
        //import relevant files & reroute to next component

        //load each champion individually, run fetch function each time next stage has activated, picking random skill
        const navigationExtras: NavigationExtras = { state: { role: this.selected.role, diffi: this.selected.difficulty } };
        this.router.navigate(['begin'], navigationExtras);
    }
}