import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({ templateUrl: 'setup.component.html' })
export class SetupComponent {
    title = 'lol-skills';

    hoverStatus = false;
    stage = 0;

    selected = { type: '', role: '', difficulty: 2 }

    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation();

        if (!navigation.extras.state) {
            console.log('redirected');
            this.router.navigate(['/']);
        }
        this.selected.type = navigation.extras.state.type;
    }

    ngOnInit() {
        this.selected.role = '';
        // this.selected.difficulty: Number;
        console.log(this.selected);
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
        const navigationExtras: NavigationExtras = { state: { role: this.selected.role, diffi: this.selected.difficulty } };
        this.router.navigate(['begin'], navigationExtras);
    }

    // mouseEnter() {
    //     console.log("mouse enter : " + id);
    //     this.hoverStatus = true;
    // }
    // mouseLeave() {
    //     this.hoverStatus = false
    //     console.log("mouse leave : ");
    // }
}