import { NgModule, Injectable } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuard } from '../common/auth.guard';

import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';
import { LibraryComponent } from './library.component';
import { BrowseOrgsComponent } from './browse-orgs.component';
import { OrgDetailsComponent } from './org-details.component';
import { OrgPostsComponent } from './org-posts.component';
import { SingleOrgComponent } from './single-org.component';
import { SearchBox } from './search-box.component.ts';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';

import { UserService } from './services/user.service';
import { SearchService } from './services/search.service';
import { ClickOutsideModule } from 'ng2-click-outside';

import { enableProdMode } from '@angular/core';
enableProdMode();

const routing = RouterModule.forRoot([
    { path: 'browse', component: BrowseOrgsComponent } // , canActivate: [AuthGuard] }
  , { path: 'login', component: LoginComponent }
  , { path: 'signup', component: SignupComponent }
  , { path: 'about', component: AboutComponent }
  , { path: 'library', component: LibraryComponent }
  , { path: 'organization/:id', component: SingleOrgComponent }
  , { path: '', component: LoginComponent }
  , { path: '**', component: LoginComponent }
]); // the order of this array matters

@NgModule({
    imports: [
      BrowserModule,
    	routing,
      HttpModule,
    	FormsModule,
    	ReactiveFormsModule,
      ClickOutsideModule
    ],
    declarations: [
      AppComponent,
      BrowseOrgsComponent,
      OrgDetailsComponent,
      OrgPostsComponent,
      SingleOrgComponent,
    	AboutComponent,
      LibraryComponent,
      LoginComponent,
      SignupComponent
    ],
    providers: [
      Title,
      UserService,
      SearchBox,
      SearchService,
      AuthGuard
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }