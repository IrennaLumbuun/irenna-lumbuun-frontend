import { Component } from '@angular/core';
import { ProjectsService } from './projects.service';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent{
  title = "Projects";
  projects: any;
  tags: any;
  isDataAvailable: boolean = false;
  isTagsAvailable: boolean = false;
  getTagColorClone: any;

  getTitle(){
    return this.title
  }

  convertToId = (str:string) => str.replace(/\s+/g, '-').toLowerCase();
  
  // tag filters are clicked
  onValChange(value: any){
      this.isDataAvailable=false;
      value = this.convertToId(value);
      // if user wants to see all projects
      if (value === "all"){
        this.service.getProjects().then((data :any)=> {
          this.projects = data;
          this.isDataAvailable = true;
        })
      } else {
        if (value === "html/css") value = "html-css"
        // if user selected a specific technology
        this.service.getProjectsByTag(value).then((data :any)=> {
        this.projects = data;
        this.isDataAvailable = true;
      })
      }

      // show that the button is pressed
      let tagButtons = Array.from(document.getElementsByClassName('filter-option') as HTMLCollectionOf<HTMLElement>)
      for (let t of tagButtons){
        t.style.opacity="1"
      }
      (<HTMLElement>document.getElementById(value)).style.opacity="0.5"
    }

  constructor(private service: ProjectsService){
    this.getTagColorClone = service.getTagColor;
    service.getProjects().then(data => {
      this.projects = data;
      this.isDataAvailable= true;
      console.log("projects are available")
    })
    this.tags = service.getTags().then(data => {
      this.tags = data;
      this.isTagsAvailable = true;
    });
  }
}
