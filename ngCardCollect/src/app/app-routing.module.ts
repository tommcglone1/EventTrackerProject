import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { CreatecardComponent } from './components/createcard/createcard.component';
import { SingleCardViewComponent } from './components/single-card-view/single-card-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CollectionComponent } from './components/collection/collection.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createcard', component: CreatecardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'singleCardView/:cardId', component: SingleCardViewComponent },
  //add not found component
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
