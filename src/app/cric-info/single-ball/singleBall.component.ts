import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';  


@Component({
  selector: 'single-ball',
  templateUrl: './singleBall.component.html',
  styleUrls: ['./singleBall.component.css']
})
export class SingleBallComponent implements OnInit {
  private param:any; private over: any; private ball: any;
  private singleball: Array<any> = []; private id: number;
 
  constructor(private route: ActivatedRoute) {
      
   }

   ngOnInit() {
    this.param = this.route.params.subscribe(params => {
      this.over = +params['over']; 
      this.ball = + params['ball'];
      this.getDataPerBAll();
      let a = JSON.parse(sessionStorage.getItem('gameId'));
      this.id = a.matchId;
    });
  }

  getDataPerBAll(){
    let a = JSON.parse(sessionStorage.getItem('sig-ball')); 
    let data:any;
    for(let i=0;i<a.length;i++){
      if(this.over === a[i].over && this.ball === a[i].ball){
        data = a[i];
        this.singleball.push(data);
      }
    }
    console.log(this.singleball);
  }

  private ngOnDestroy() {
    this.param.unsubscribe();
  }
  
}

