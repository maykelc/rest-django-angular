import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service'; 
import { FormsModule } from '@angular/forms';
import { TasksComponent } from '../../components/tasks/tasks.component'

@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers:[
    ApiService
  ],
  exports:[
    TasksComponent
  ],
})
export class TasksModule { }
