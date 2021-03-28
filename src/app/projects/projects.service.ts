import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

const url= "http://irennalumbuunbackend-env.eba-hf39yz2d.us-east-2.elasticbeanstalk.com"

@Injectable()
export class ProjectsService{

    constructor(private httpClient: HttpClient){}

    fetchData(url: string) {
        return this.httpClient.get(url);
    }


    getProjects(){
        return new Promise((resolve, reject) => {
            this.fetchData(`${url}/projects`).subscribe((data) => {
                    resolve(data);
                }
            );
        })
    }

    getProjectDetail(project_id: string){
        return new Promise((resolve, reject) =>{
            this.fetchData(`${url}/projects/${project_id}`).subscribe((data) => {
                    resolve(data);
                })
        })
    }

    getProjectsByTag(tag_id: string){
        return new Promise((resolve, reject) => {
            this.fetchData(`${url}/technology/${tag_id}`).subscribe((data) => {
                    for (let d of Object.values(data)){
                        if (typeof(d) === "object"){
                            let promises = [] // use promise all to handle async call
                            for (let project_id of d){
                                promises.push(this.getProjectDetail(project_id))
                            }

                            let projects: any[] =[]
                            Promise.all(promises.map(response => {
                                response.then((data) => projects.push(data))
                            }))
                            console.log(projects)
                            resolve(projects)
                        }
                    }
                }
            );
        })
    }

    getTagColor(tag_id: string){
        const frontend = ["react", "angular", "html-css", "html/css"]; // yellow
        const cloud = ["aws", "google-cloud"]; // blue
        const backend = ["javascript", "node.js", "python", "flask"]; // red
        const database = ["firebase-database", "mongodb", "dynamodb"]; // green
        const ml = ["machine-learning", "keras", "scikit", "computer-vision"]; // white
        const mobile = ["swift", "react-native"]; // orange
        const system = ["c", "docker"]; // gray

        let color = "";
        if (frontend.includes(tag_id)) {
            color = "#FDFD96"
        } 
        else if (cloud.includes(tag_id)) {
            color = "#ABDEE6"
        } 
        else if (backend.includes(tag_id)) {
            color = "#FF968A"
        } 
        else if (database.includes(tag_id)) {
            color = "#D7ECD9"
        } 
        else if (ml.includes(tag_id)) {
            color = "#CDB7F6"
        } 
        else if (mobile.includes(tag_id)) {
            color = "#F5D5CB"
        } 
        else if (system.includes(tag_id)) {
            color = "#d3d3d3"
        } 
        return color;
    }

    getTags(){
        // get each projects' tag, group them in an array
        // or do we wanna just hardcode this?
        return new Promise((resolve, reject) => {
            this.fetchData(`${url}/technologies/`).subscribe((data) => {
                let tags = [];
                for (let d of Object.values(data)){
                    // manually remove some tags
                    // python and javascript is redundant
                    // so is keras and scikit
                    // for now, google-cloud only includes cloud vision project, 
                    // which are the same as the projects in "Computer Vision"
                    if (d.id === "python" || d.id === "javascript" || d.id === "keras" || d.id==="scikit" || d.id ==="google-cloud") 
                        continue;

                    let color = this.getTagColor(d.id);
                    tags.push({
                        "id": d.id,
                        "name": d.name,
                        "color": color
                    });

                    // "sort" by color so it doesn't look messy in the front end side
                    tags.sort(function(tag1, tag2){
                        return (tag1.color.charCodeAt(1) * tag1.color.charCodeAt(2)) - 
                        (tag2.color.charCodeAt(1) * tag2.color.charCodeAt(2))
                    })
                }
                resolve(tags);
            });
        })
    }
}