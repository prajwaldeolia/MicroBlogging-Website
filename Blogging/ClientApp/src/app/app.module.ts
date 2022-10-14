import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverModule } from "ngx-smart-popover";
import { ToastrModule } from 'ngx-toastr';
import { OrderModule } from 'ngx-order-pipe';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { FollowersComponent } from './Followers/followers.component';
import { FollowingComponent } from './Following/following.component';
import { SearchComponent } from './search/search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterpipePipe } from './pipes/filterpipe.pipe';

import { TweetComponent } from './tweet/tweet.component';
import { ListTweetComponent } from './tweet/list-tweet/list-tweet.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { OnloadedDirective } from './Directives/onloaded.directive';





@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FollowersComponent ,
    RegisterComponent,
    TweetComponent,
    UploadComponent,
    SearchComponent,
    FilterpipePipe,
    FollowingComponent,
    ListTweetComponent,
    DashboardComponent,
    OnloadedDirective,


  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule,
    OrderModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
   
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      {path: 'dashboard', component: DashboardComponent  },
      { path: 'list-tweet', component: ListTweetComponent },
      { path: 'followers', component: FollowersComponent },
      { path: 'search', component: SearchComponent },
      { path: 'following', component: FollowingComponent }
      
     
     
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
