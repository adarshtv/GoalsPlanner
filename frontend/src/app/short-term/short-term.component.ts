import { Component, OnInit } from '@angular/core';
import { ShortTermService } from '../short-term.service';

@Component({
  selector: 'app-short-term',
  templateUrl: './short-term.component.html',
  styleUrls: ['./short-term.component.css']
})
export class ShortTermComponent implements OnInit {

  goals:any;

  constructor(public _service:ShortTermService) {
    
   }

  ngOnInit(): void {
    this._service.getGoals().subscribe(data => {
      console.log("data:",data);
      this.goals = data;
  },
  error => {
  })
  }

   


  

}
