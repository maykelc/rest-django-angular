import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',

  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  
  tasks:any[] =[];
  task:any;
  taskId:any;


  newTask={
    title:'',
    description:'',
    done: false
  }

  updateFields= {
    title:'',
    description:'',
    done: false
  }

  isEditing=false;
  taskToEdit:any;

  showCreateForm = false;
  successMessages ='';

  showTaskList = false;


  completedTasks: any[] = [];
  incompleteTasks: any[] = [];
  
  constructor(private apiService: ApiService){}

  ngOnInit(): void{  
    this.loadTasks();
  }

  createNewTask(){
    this.apiService.createTask(this.newTask).subscribe((
      data)=>{
        this.tasks.push(data);
        this.newTask = {
          title:'',
          description:'',
          done:false
        };
        this.showCreateForm = false;
        this.successMessages ='Tarea Creada Con Exito';

        setTimeout(()=>{
          this.successMessages='';
        },5000);

        this.completedTasks = this.tasks.filter((t) => t.done);
        this.incompleteTasks = this.tasks.filter((t) => !t.done);
      //  this.cdr.detectChanges();
      },
      error =>{
       console.log('Error al crear la nueva tarea, ', error) 
      })
  }
  showCreateTaskForm(){
    this.showCreateForm = true;
  }

  toggleCreateForm(){
    this.showCreateForm = !this.showCreateForm;
  }

  loadTasks(){
    this.apiService.getTasks().subscribe(data => {
      this.tasks = data;
      this.completedTasks= this.tasks.filter((task)=> task.done);
      this.incompleteTasks = this.tasks.filter((task)=> !task.done);
    },
    error =>{
      console.log('Error al cargas las tareas: ', error)
    }
    );
  }

  getTaskStatusLabel(done: boolean): string {
    return done ? 'Completo' : 'Incompleto';
  }

  toggleTaskList(){
    this.showTaskList = !this.showTaskList;
  }
  getTask(taskId:number){
    if(!taskId){
      console.log('Id: ', taskId);
      console.log('Id no valido');
      return;
    }
    this.apiService.getTask(taskId).subscribe(
      data =>{ 
        this.task = data;

      }, error =>{
        console.log('Error al cargar el usuario, ', error);
      }
    );
  }

  deleteTask(task:any){
    if(!task || !task.id){
      console.log('Tarea Invalida');
      return;
    }
    if(confirm('Estas seguro que deseas eliminar esta tarea?')){
      this.apiService.deleteTask(task.id).subscribe(
        ()=>{
          console.log('Tarea eliminada con exito');
          this.tasks = this.tasks.filter(t => t.id !==task.id);

        },
        error=>{
          console.log('error al eliminar la tarea, ',error)
        }
      )
    }
  }


  editTask(task:any){
    this.isEditing =true;
    this.taskToEdit = {...task};
  }

  cancelEdit(){
    this.isEditing = false;
    this.taskToEdit = null;
  }
  updateTask(){
    this.apiService.partialUpdateTask(this.taskToEdit.id, this.taskToEdit).subscribe(
      data=>{
        console.log('Usuario Actualizado: ', data);
        const index = this.tasks.findIndex(t => t.id === this.taskToEdit.id);
        if(index !== -1){
          this.tasks[index] = data;
        }
        this.isEditing = false;
        this.taskToEdit = null;

      },
      
      error => {
        console.log('Error al actualizar la tarea, ', error)
      }
    );
  }


}
