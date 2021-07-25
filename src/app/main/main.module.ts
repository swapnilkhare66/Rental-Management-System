import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './pages/landing/landing.component';
import { CategoryComponent } from './pages/category/category.component';



const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  }
];




@NgModule({
  declarations: [LandingComponent, CategoryComponent],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  entryComponents: [],
  exports: [RouterModule]
})
export class MainModule { }
