import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlayComponent } from './play.component';
import { PlayRoutingModule } from './play-routing.module';

@NgModule({
    imports: [
      PlayRoutingModule,
      CommonModule,
      RouterModule,
      FormsModule
    ],
    declarations: [PlayComponent]
})
export class PlayModule {}
