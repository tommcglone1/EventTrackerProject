import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RookieCardPipe } from './pipes/rookie-card.pipe';
import { AutoCardPipe } from './pipes/auto-card.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    RookieCardPipe,
    AutoCardPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [RookieCardPipe, AutoCardPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
