import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BallByRun} from './../models/ballByRun';
import {MatchResult} from './../models/matchResult';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  private id:number;
  private sub: any;
  private match: any; private gameOver:boolean = false;
  private ball:number = 0; private run:number = 0; private over:number = 0; 
  private wicket: number = 0; private totalRun: number= 0; private ext: number = 0; 
  public ballByRun: BallByRun; public matchResult: MatchResult;
  private ballByRunArray: Array<BallByRun> = [];
  private init:number = 0; private len:number = 10;

  constructor(private route: ActivatedRoute) {
      this.ballByRun = new BallByRun;
      this.matchResult = new MatchResult;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      let a= JSON.parse(sessionStorage.getItem('gameId'));
      if( a!==null && a.matchId == this.id){
        this.ballByRunArray = JSON.parse(sessionStorage.getItem('sig-ball'));
        let data = this.ballByRunArray[this.ballByRunArray.length - 1];
        // let data = this.ballByRunArray[0];
        this.ball = data.ball==6? 0:data.ball;
        this.over = data.ball==6? data.over+1:data.over;
        this.totalRun = data.totalRun; 
        this.ext = data.ext;
        this.wicket = data.wicket;
        this.match = {
          batting: a.bowling===a.teamA ? a.teamB:a.teamA,
          bowling: a.bowling,
          over: parseInt(a.over)
        }
        if(this.ballByRunArray.length>9)
          this.ballByRunArray = this.ballByRunArray.slice(this.init,this.len);
        if(this.over===this.match.over)
          this.gameOver = true;
      } else {
        this.getMatchInfo();
      }
    });
  }

  getMatchInfo(){
    let a = JSON.parse(localStorage.getItem('matchArray'));
    let data:any;
    for(let i=0;i<a.length;i++){
      if(this.id === a[i].matchId){
        data = a[i];
        sessionStorage.setItem('gameId', JSON.stringify(a[i]))
        this.match = {
          batting: data.bowling===data.teamA ? data.teamB:data.teamA,
          bowling: data.bowling,
          over: parseInt(data.over)
        }
        break;
      }
    }
    this.matchResult.matchData = data;
    console.log(this.match, this.matchResult.matchData );
  }

  private ngOnDestroy() {
    this.sub.unsubscribe();
  }

  bowling(){
    this.ball++;
    this.runCount();
    this.ballCount();
    this.singleScore();
    this.saveResult();
  }

  runCount(){
    let run = ['0','1','2','W','3','4','No','6','Wd']
    let count = Math.floor(Math.random()*10);
    switch(run[count]) { 
      case '1': { 
        this.run = 1;
        this.ballByRun.run = this.run; 
        this.ballByRun.commentry = 'Taking single by pusing on side'
        break; 
      } 
      case '2': { 
        this.run = 2;
        this.ballByRun.run = this.run; 
        this.ballByRun.commentry = 'A good couple!!!!!!!!!'
        break; 
      } 
      case 'W': { 
        this.wicket += 1;
        this.run = 0;
        this.ballByRun.wicket = this.wicket; 
        this.ballByRun.commentry = 'OUT!!!!!!!!!!!!!!!!!'
        break; 
      } 
      case '3': { 
        this.run = 3;
        this.ballByRun.run = this.run; 
        this.ballByRun.commentry = 'Good running between the wicket. 3 Runs'
        break;  
      } 
      case '4': { 
        this.run = 4;
        this.ballByRun.run = this.run; 
        this.ballByRun.commentry = ' Four!!!!!!!!!!! nice play'
        break;  
      } 
      case 'No': { 
        this.run = 1;
        this.ball -= 1; this.ext += 1;
        this.ballByRun.run = this.run; 
        this.ballByRun.commentry = 'Ohhh Its No bowl'
        break; 
      } 
      case '6': { 
        this.run = 6;
        this.ballByRun.run = this.run; 
        this.ballByRun.commentry = "What a batting!!! maximum....It's Big SIX!!!!"
        break;  
      } 
      case 'Wd': { 
        this.run = 1;
        this.ball -= 1; this.ext += 1;
        this.ballByRun.run = this.run; 
        this.ballByRun.commentry = 'Wide very poor bowling. Bonus one run.'
        break; 
      } 
      default: { 
        this.run = 0;
        this.ballByRun.run = this.run; 
        this.ballByRun.commentry = 'Excellent bowl by bowler. No run'
        break; 
      } 
   } 
  }

  ballCount(){
    this.ballByRun.ball = this.ball;
    this.ballByRun.over = this.over;
    if(this.ball==6){
      this.over++;
      this.ball = 0;
    }
  }

  singleScore(){
    this.totalRun += this.run;
    this.ballByRun.totalRun = this.totalRun;
    this.ballByRun.wicket = this.wicket;
    this.ballByRun.ext= this.ext;
    this.ballByRunArray.push(this.ballByRun);
    if(this.ballByRunArray.length>9)
      this.ballByRunArray = this.ballByRunArray.slice(this.init,this.len);
    let result = JSON.parse(sessionStorage.getItem('sig-ball'))!==null? JSON.parse(sessionStorage.getItem('sig-ball')) :[];
    result.push(this.ballByRun);
    sessionStorage.setItem("sig-ball",JSON.stringify(result));
    this.ballByRun = new BallByRun;
  }

  saveResult(){
    console.log(this.over,this.match.over);
    if(this.over === this.match.over) {
      this.matchResult.id += 1;
      this.matchResult.matchScore =  JSON.parse(sessionStorage.getItem('sig-ball'));
      this.matchResult.extra = this.ext;
      this.matchResult.totalRun = this.totalRun;
      this.matchResult.wicket = this.wicket;
      let result = JSON.parse(localStorage.getItem('matchResult'))!==null? JSON.parse(localStorage.getItem('matchResult')) :[];
      result.push(this.matchResult);
      localStorage.setItem("matchResult",JSON.stringify(result));
      this.gameOver = true;
      console.log(result);
    }
  }

  loadMore(){
    this.init +=10;
    this.len +=10;
    let a = JSON.parse(sessionStorage.getItem('sig-ball'));
    this.ballByRunArray = a.slice(this.init,this.len);
  }

  hideMore(){
    this.init -=10;
    this.len -=10;
    let a = JSON.parse(sessionStorage.getItem('sig-ball'));
    this.ballByRunArray = a.slice(this.init,this.len);
  }

}

