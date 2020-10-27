import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({ templateUrl: 'completed.component.html' })
export class CompletedComponent {
    title = 'lol-skills';

    score;
    questions;
    response = '';

    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation();

        if (!navigation.extras.state) {
            console.log('redirected');
            this.router.navigate(['/']);
        }

        this.score = navigation.extras.state.score;
        this.questions = navigation.extras.state.diffi * 4;

    }

    ngOnInit() {
        // Get percentage value of score to check
        console.log((this.score * 100) / this.questions)
       // Check for multiple cases in switch statement depending on percentage?
    }

}