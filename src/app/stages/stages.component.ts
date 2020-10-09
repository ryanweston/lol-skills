import { Component } from '@angular/core';
import { Router } from '@angular/router';
import lanes from '../../assets/data/lanes.json';
import { HttpClient } from '@angular/common/http';


@Component({ templateUrl: 'stages.component.html' })
export class StagesComponent {

    role: string;
    difficulty: number;

    constructor(private router: Router, private http: HttpClient) {
        const navigation = this.router.getCurrentNavigation();

        if (!navigation.extras.state) {
            console.log('redirected');
            this.router.navigate(['/']);
        }

        this.role = navigation.extras.state.role;
        this.difficulty = navigation.extras.state.diffi;
    }

    skillTemplate = [false, false, false, false]

    stage = 0;
    lane = {}
    loading = true;

    mainChampions = { selected: [], files: [] };
    currentChampion = { name: "", skill: "" }

    ngOnInit() {
        this.stage = 0;

        this.lane = lanes.lanes[this.role];
        this.findChampions();

        if (this.mainChampions.files[0]) {

            console.log(this.mainChampions);
        }
    }

    async findChampions() {
        console.log(this.loading);

        for (let i = 0; i < this.difficulty; i++) {
            //Length of required champions depending on difficulty
            let entry = lanes.lanes[this.role];

            //Get random champions to length of difficulty
            let key = Object.keys(entry)[Math.floor(Math.random() * entry.length)]
            this.mainChampions.selected.push(entry[key]);

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
                console.log("YAY");
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
        console.log(entry.length)

        //Set current champion based off index
        this.currentChampion.name = this.mainChampions.selected[championKey].name;

        console.log("Champion name:" + this.currentChampion.name)
        console.log("Champion key:" + championKey);

        // Get skill index
        this.getSkillIndex(championKey);
    }


    getSkillIndex(champKey) {
        console.log("Champion key in func:" + champKey)
        let checker = arr => arr.every(index => index === true);

        // Random key between 0-3, check if key path has already been used
        let num = Math.floor(Math.random() * 4);
        console.log("Skill key:" + num);
        console.log(this.mainChampions.selected)
        if (checker(this.mainChampions.selected[champKey].skillsUsed)) {

            console.log("all true");
            return false;

        } else if (this.mainChampions.selected[champKey].skillsUsed[num] === false) {
            //Set index path for skill to true
            this.mainChampions.selected[champKey].skillsUsed[num] = true;
            //Assign skill to current champion values
            this.currentChampion.skill = this.mainChampions.files[champKey].data[this.currentChampion.name].spells[num];


            console.log(this.mainChampions.selected[champKey].skillsUsed);

            return num;
        } else {
            this.getSkillIndex(champKey);
        }
    }

    nextStage() {
        this.stage++;
        this.stageSkill();
    }
}
