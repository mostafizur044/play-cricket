import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {SingleBallComponent} from "./singleBall.component";

const routes: Routes = [
  {path: '', component: SingleBallComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleBallRoutingModule {
}

