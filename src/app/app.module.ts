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
import { HomeComponent } from './home.component';
import { BrowseOrgsComponent } from './browse.orgs.component';
import { SearchBox } from './search-box.component.ts';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';

import { UserService } from './services/user.service';
import { SearchService } from './services/search.service';
import { HighlightDirective } from './directives/highlight.directive';

import { enableProdMode } from '@angular/core';
enableProdMode();

const routing = RouterModule.forRoot([
    { path: 'browse', component: BrowseOrgsComponent } // , canActivate: [AuthGuard] }
  , { path: '', component: LoginComponent }
  , { path: '**', component: LoginComponent }
  , { path: 'login', component: LoginComponent }
  , { path: 'signup', component: SignupComponent }
  , { path: 'about', component: AboutComponent }
  , { path: 'library', component: LibraryComponent }
]);

@NgModule({
    imports: [
      BrowserModule,
    	routing,
      HttpModule,
    	FormsModule,
    	ReactiveFormsModule
    ],
    declarations: [
      AppComponent,
      BrowseOrgsComponent,
    	AboutComponent,
      LibraryComponent,
    	HomeComponent,
      LoginComponent,
      SignupComponent,
      HighlightDirective
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