import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import lanes from '../../assets/data/lanes.json';
import { HttpClient } from '@angular/common/http';


@Component({ templateUrl: 'stages.component.html', styleUrls: ['stages.component.scss'] })
export class StagesComponent {

    //Config variables
    role: string;
    difficulty: number;
    config;

    stage = 0;
    lane = {}
    loading = false;
    answer = "";
    score = 0;

    // Answer/champion selected by user
    user = { selected: '' }
    // Champion pool data
    mainChampions = { selected: [], files: [] };
    // Template added to main selected champions to track questions asked.
    skillTemplate = [false, false, false, false];
    // Current question's champion
    currentChampion = { name: "", skill: "", keyRef: "" }

    constructor(private router: Router, private http: HttpClient) {
        const navigation = this.router.getCurrentNavigation();

        if (!navigation.extras.state) {
            console.log('redirected');
            this.router.navigate(['/']);
        }

        // Assigns prop data
        this.role = navigation.extras.state.role;
        this.difficulty = navigation.extras.state.diffi;
        this.config = navigation.extras.state.config;
    }

    ngOnInit() {
        this.stage = 0;
        this.loading = true;

        this.lane = lanes.lanes[this.role];
        this.findChampions();
    }

    async findChampions() {
        //Fill temp array with all champions in role. TODO: rename lanes json object
        let entry = lanes.lanes[this.role];

        // Randomise entry array. Returns as randomised
        this.shuffle(entry);

        for (let i = 0; i < this.difficulty; i++) {
            //Takes first five champions from array and formats ready for use.
            //NOTE: Stringified the object value to prevent storing as reference to entry array
            this.mainChampions.selected.push(JSON.parse(JSON.stringify(entry[i])));

            //Push skill used template into array
            this.mainChampions.selected[i].skillsUsed = [...this.skillTemplate];

            //Load champion data into files
            await this.loadChampionFile(i);
            console.log('loaded file');
        }

        this.loading = false;

        //Once champions are found, get random skill & champion
        this.stageSkill();
    }

    shuffle(entry) {
        //Declare variables in single var pattern for readability
        let length = entry.length, randomValue = 0, tempLastVal;

        //  Implementation of the Durstenfeld shuffle algorithm
        while (length--) {
            randomValue = Math.floor(Math.random() * (length + 1));

            tempLastVal = entry[length];
            entry[length] = entry[randomValue];
            entry[randomValue] = tempLastVal;
        }

        return entry;
    }

    async loadChampionFile(pos) {
        let data = await this.http.get('assets/data/champion/' + this.mainChampions.selected[pos].name + '.json').toPromise();
        this.mainChampions.files.push(data);
    }

    async stageSkill() {
        // Get random champion index
        let entry = this.mainChampions.selected;
        let championKey = Object.keys(entry)[Math.floor(Math.random() * entry.length)];

        //Set current champion based off index
        this.currentChampion.name = this.mainChampions.selected[championKey].name;
        //Set index as a reference to check against
        this.currentChampion.keyRef = championKey;

        // console.log("%c CHAMPION: ", 'background: blue', this.currentChampion.name + " KEY: " + championKey);

        // Get skill index
        this.getSkillIndex(championKey);
    }


    getSkillIndex(champKey) {
        // Random key between 0-3, check if key path has already been used
        let num = Math.floor(Math.random() * 4);

        if (this.mainChampions.selected[champKey].skillsUsed[num] === false) {
            //Set skill history to used
            this.mainChampions.selected[champKey].skillsUsed[num] = true;
            //Set current champion skill
            this.currentChampion.skill = this.mainChampions.files[champKey].data[this.currentChampion.name].spells[num].description;
            console.log(this.currentChampion.skill);
            //Removs instances of champion names and replaces with censored text
            this.currentChampion.skill = this.currentChampion.skill.split(this.currentChampion.name).join("<span>Champion</span>");

            return num;
        } else {
            //Recursive function, rerun until index is false
            this.getSkillIndex(champKey);
        }
    }

    checkSkillsUsed(arr, ref) {
        //Checks if every item in array is set to true
        if (arr.every(index => index === true)) {
            this.mainChampions.selected.splice(ref, 1);
            this.mainChampions.files.splice(ref, 1);
            console.log('%c REMOVED CHAMPION ', 'background: red')
        }
    }

    verify() {
        if (this.user.selected == this.currentChampion.name) {
            this.score++;
            this.answer = "correct";
            setTimeout(() => {
                this.nextStage();
            }, 1000);

        } else {
            this.answer = "false";
            setTimeout(() => {
                this.nextStage();
            }, 2000);
        }
    }

    nextStage() {
        //Check to see if all skills have been used, if true, remove from selection.
        this.checkSkillsUsed(this.mainChampions.selected[this.currentChampion.keyRef].skillsUsed, this.currentChampion.keyRef);

        //Reset variables
        this.currentChampion = { name: "", skill: "", keyRef: "" };
        this.user.selected = '';
        this.answer = "";

        this.stage++;

        // Check's if all questions have been answered. Difficulty * number of questions per champion
        if (this.stage != (this.difficulty * 4)) {
            this.stageSkill();
        } else {
            const navigationExtras: NavigationExtras = { state: { score: this.score, diffi: this.difficulty, type: this.config.type } };
            this.router.navigate(['completed'], navigationExtras);
        }
    }
}
