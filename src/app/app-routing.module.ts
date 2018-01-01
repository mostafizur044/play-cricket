import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'start', loadChildren: './cric-info/start/start.module#StartModule' },
  { path: 'play/:id', loadChildren: './cric-info/play/play.module#PlayModule' },
  { path: 'details/:over/:ball', loadChildren: './cric-info/single-ball/singleBall.module#SingleBallModule', },
  // { path: 'match-list', loadChildren: './cric-info/match-list/MatchList.module#MatchListModule', },
  { path: '**', redirectTo: 'start' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
