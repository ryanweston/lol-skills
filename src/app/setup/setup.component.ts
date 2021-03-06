import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({ templateUrl: 'setup.component.html', styleUrls: ['setup.component.scss'] })
export class SetupComponent {
    title = 'lol-skills';

    hoverStatus = false;
    stage = 0;
    selected = { config: { type: '', champName: false }, role: '', difficulty: 6 }

    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation();

        if (!navigation.extras.state) {
            console.log('redirected');
            this.router.navigate(['/']);
        }
        this.selected.config.type = navigation.extras.state.type;
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
        const navigationExtras: NavigationExtras = { state: { role: this.selected.role, diffi: this.selected.difficulty, config: this.selected.config } };
        this.router.navigate(['begin'], navigationExtras);
    }
}