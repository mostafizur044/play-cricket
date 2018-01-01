import { Component, OnInit } from '@angular/core';
import { MatchStartData } from '../models/matchStart';
import { Router }  from '@angular/router';  


export const team = ['Bangladesh', 'India', 'Srilanka', 'Pakistan', 'Australia', 'New Zealand', 'England', 'South Afriaca', 'West Indies']

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  teamA: string = ''; 
  teamB: string = '';
  teamNames: string[] = [];
  toss:string = '';
  dicision:string = ''; 
  loader:boolean = false; hide:boolean = false;
  a: boolean =false; b:boolean  =false;
  c:boolean  =false;
  private matchData:MatchStartData ;
  over: number = 2;

  constructor(private _router: Router) {
      this.matchData = new MatchStartData;
   }

  ngOnInit() {
    this.teamNames = team;
    sessionStorage.removeItem('sig-ball');
    sessionStorage.removeItem('gameId');
  }
  headCall(){
    this.loader = true;
    this.hide = true;
    let coin =  Math.random();
    if(coin > 0.5){
      this.toss = 'Head';
      setTimeout(()=>{this.loader = false; this.a=true},2000);
    } else{
      this.opponent('Tail');
    }
  }
  tailCall(){
    this.loader = true;
    this.hide = true;
    let coin =  Math.random();
    if(coin < 0.5){
      this.toss = 'Tail';
      setTimeout(()=>{this.loader = false; this.a=true},2000);
    } else{
      this.opponent('Head');
    }
  }

  opponent(toss){
    this.toss = toss;
    if(Math.random()>.5) {this.dicision = 'Bat';this.matchData.bowling = this.teamA;}
    else {this.dicision = 'Bowl';this.matchData.bowling = this.teamB;}
    setTimeout(()=>{this.loader = false; this.b=true;},2000);
  }

  batting(){
    this.matchData.bowling = this.teamB;
    this.c = true; 
  }
  bowling(){
    this.matchData.bowling = this.teamA;
    this.c = true;
  }
  startMatch(){
    this.matchData.matchId = Math.floor((Math.random()*1000) + 1);
    this.matchData.teamA = this.teamA;
    this.matchData.teamB = this.teamB;
    this.matchData.over = this.over; 
    let matchArray = JSON.parse(localStorage.getItem('matchArray'))!==null? JSON.parse(localStorage.getItem('matchArray')) :[];
    matchArray.push(this.matchData);
    localStorage.setItem('matchArray',JSON.stringify(matchArray));
    console.log(matchArray);
    this._router.navigate(['/play' , this.matchData.matchId]); 
  }
}

