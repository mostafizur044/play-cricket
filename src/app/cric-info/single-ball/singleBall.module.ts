import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SingleBallComponent } from './singleBall.component';
import { SingleBallRoutingModule } from './singleBall-routing.module';

@NgModule({
    imports: [
      SingleBallRoutingModule,
      CommonModule,
      RouterModule,
      FormsModule
    ],
    declarations: [SingleBallComponent]
})
export class SingleBallModule {}
