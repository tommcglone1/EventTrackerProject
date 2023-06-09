import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CreatecardComponent } from './components/createcard/createcard.component';
import { SingleCardViewComponent } from './components/single-card-view/single-card-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CardTypePipe } from './pipes/card-type.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { AppliedFiltersComponent } from './components/applied-filters/applied-filters.component';
import { InCollectionPipe } from './pipes/in-collection.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/loading/loading.component';
import { CollectionStatsComponent } from './components/collection-stats/collection-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    CreatecardComponent,
    SingleCardViewComponent,
    ProfileComponent,
    CollectionComponent,
    CardTypePipe,
    FilterComponent,
    AppliedFiltersComponent,
    InCollectionPipe,
    LoadingComponent,
    CollectionStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [CardTypePipe, InCollectionPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
