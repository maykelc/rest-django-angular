import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    UsersModule,
    TasksModule,
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
