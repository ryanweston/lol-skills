import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({ templateUrl: 'completed.component.html', styleUrls: ['completed.component.scss'] })
export class CompletedComponent {
    title = 'lol-skills';

    score;
    questions;
    response = '';
    circlePercentage;

    constructor(private router: Router, private sanitizer: DomSanitizer) {
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
        this.score = Math.round((this.score * 100) / this.questions)

        //Assign string to variable containing custom CSS variable class (percentage)
        this.circlePercentage = this.sanitizer.bypassSecurityTrustStyle('--percent: ' + this.score);
    }

}