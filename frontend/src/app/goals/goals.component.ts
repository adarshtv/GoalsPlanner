import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  public shortName = '';
  public longName = '';
  public checkpoint = '';
  public submitted =false;

  //constructor(public router:Router){}

  shortGoal(){
    this.submitted = false;
    console.log("shortName",this.shortName);
    this.submitted = true;
  }

  longGoal(){
    this.submitted = false;
    console.log("longName",this.longName)
    this.submitted = true;
  }

}
