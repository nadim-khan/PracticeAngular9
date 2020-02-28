import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  choose;
  constructor() { }

  ngOnInit() {
  }
  setValue(event){
    this.choose=event.target.value;
    console.log(event.target.value)
  }

}
