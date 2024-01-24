import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from '../../components/users/users.component';
import { ApiService } from '../../services/api.service'; 

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers:[
    ApiService
  ],
  exports:[UsersComponent]
})
export class UsersModule { }
