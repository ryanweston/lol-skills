import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({ templateUrl: 'completed.component.html' })
export class CompletedComponent {
    title = 'lol-skills';

    score = '';

    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation();

        if (!navigation.extras.state) {
            console.log('redirected');
            this.router.navigate(['/']);
        }

        this.score = navigation.extras.state.score;
    }

    ngOnInit() {
        console.log(this.score);
    }

}