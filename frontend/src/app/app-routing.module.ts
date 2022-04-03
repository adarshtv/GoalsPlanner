import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShortTermComponent } from './short-term/short-term.component';
import { LongTermComponent } from './long-term/long-term.component';
import { AppComponent } from './app.component';
import { GoalsComponent } from './goals/goals.component';

const routes: Routes = [
  {path:'', redirectTo:'goals', pathMatch:'full'},
  {path:'goals', component:GoalsComponent},
  {path:'goals/short', component:ShortTermComponent},
  {path:'goals/long', component:LongTermComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
