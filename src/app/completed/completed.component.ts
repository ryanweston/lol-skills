import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({ templateUrl: 'completed.component.html' })
export class CompletedComponent {
    title = 'lol-skills';

    constructor(private router: Router) {
    }

    ngOnInit() {

    }

}