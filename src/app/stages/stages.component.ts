import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import lanes from '../../assets/data/lanes.json';
import { HttpClient } from '@angular/common/http';


@Component({ templateUrl: 'stages.component.html', styleUrls: ['stages.component.scss'] })
export class StagesComponent {

    role: string;
    difficulty: number;
    config;

    skillTemplate = [false, false, false, false];

    stage = 0;
    lane = {}
    loading = false;
    answer = "";
    score = 0;

    user = { selected: '' }
    mainChampions = { selected: [], files: [] };
    currentChampion = { name: "", skill: "", keyRef: "" }

    constructor(private router: Router, private http: HttpClient) {
        const navigation = this.router.getCurrentNavigation();

        if (!navigation.extras.state) {
            console.log('redirected');
            this.router.navigate(['/']);
        }

        this.role = navigation.extras.state.role;
        this.difficulty = navigation.extras.state.diffi;
        this.config = navigation.extras.state.config;
    }

    ngOnInit() {
        this.stage = 0;
        this.loading = true;

        this.lane = lanes.lanes[this.role];
        this.findChampions();

        // if (this.mainChampions.files[0]) {
        //     console.log(this.mainChampions);
        // }
    }

    shuffle(entry) {
        var length = entry.length, randomValue = 0, tempLastVal;

        while (length--) {
            randomValue = Math.floor(Math.random() * (length + 1));

            tempLastVal = entry[length];
            entry[length] = entry[randomValue];
            entry[randomValue] = tempLastVal;
        }

        return entry;
    }

    async findChampions() {
        let entry = lanes.lanes[this.role];
        console.log(entry);
        // Randomise entry array
        this.shuffle(entry);

        for (let i = 0; i < this.difficulty; i++) {
            //Get random champions to length of difficulty
            this.mainChampions.selected.push(entry[i]);

            //Assign skill used template into array
            this.mainChampions.selected[i].skillsUsed = [...this.skillTemplate]

            //Load champion data into files
            await this.loadChampion(i);
        }

        this.loading = false;

        //Once champions are found, get random skill & champion
        this.stageSkill();
    }


    async loadChampion(pos) {
        return new Promise((resolve, reject) => {
            this.http.get('assets/data/champion/' + this.mainChampions.selected[pos].name + '.json').toPromise().then(async (data) => {
                await this.saveFile(pos, data);
                resolve();
            }).catch((err) => {
                console.log(err);
            });

        });
    }

    saveFile(pos, data) {
        return new Promise((resolve, reject) => {
            this.mainChampions.files.push(data);
            if (this.mainChampions.files[pos]) {
                resolve();
            } else {
                setTimeout(() => {
                    this.saveFile(pos, data), 300
                })
            }
        })
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

        // console.log("SKILL KEY: " + num)


        if (this.mainChampions.selected[champKey].skillsUsed[num] === false) {

            //Set skill history to used
            this.mainChampions.selected[champKey].skillsUsed[num] = true;
            //Set current champion skill
            this.currentChampion.skill = this.mainChampions.files[champKey].data[this.currentChampion.name].spells[num].description;
            console.log(this.currentChampion.skill);
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
            }, 1500);
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

        if (this.stage != (this.difficulty * 4)) {
            this.stageSkill();

        } else {
            const navigationExtras: NavigationExtras = { state: { score: 15, diffi: 6, type: this.config.type } };
            this.router.navigate(['completed'], navigationExtras);
        }


    }
}
