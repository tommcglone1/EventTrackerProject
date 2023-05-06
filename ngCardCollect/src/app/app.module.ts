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
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatecardComponent } from './components/createcard/createcard.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    RookieCardPipe,
    AutoCardPipe,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    CreatecardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [RookieCardPipe, AutoCardPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
