import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  async ngOnInit(){
    let i = 0;
    let speed = 50;
    let txt = '<I am a computer science student./>';
    let tagline = document.getElementById("tagline")!;
    tagline.innerHTML = "";
    while (i < txt.length){
      tagline.innerHTML += txt.charAt(i);
      i++;
      await this.sleep(speed)
    }
  }

  sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
