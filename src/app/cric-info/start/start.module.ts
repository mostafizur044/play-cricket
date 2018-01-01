import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StartComponent } from './start.component';
import { StartRoutingModule } from './start-routing.module';

@NgModule({
    imports: [
      StartRoutingModule,
      CommonModule,
      RouterModule,
      FormsModule
    ],
    declarations: [StartComponent]
})
export class StartModule {}
