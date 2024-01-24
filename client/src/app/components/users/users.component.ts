import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; 
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users:any[]=[]; 
  user:any;
  userId: any;

  newUser= {
    name: '',
    last_name:'',
    name_user:'',
    email:'',
    password:''
  }

  updateFields={
    name: '',
    last_name:'',
    name_user:'',
    email:''
  }


  isEditing= false;
  userToEdit :any;

  showCreateForm =false;
  successMessages = '';

  showUserList= false;

  constructor(private apiService: ApiService){}

  ngOnInit():void{
    this.loadUsers();
  }
  
  //Manejando lel createUser
  createNewUser(){
    this.apiService.createUser(this.newUser).subscribe(
      data =>{
        this.users.push(data);
        this.newUser = {
          name: '',
          last_name:'',
          name_user:'',
          email:'',
          password:''
        };
        this.showCreateForm= false;
        this.successMessages= 'Usuario Creado Con Exito';

        setTimeout(() => {
          this.successMessages='';
        }, 5000);
      },
      error => {
        console.log('Error al crear nuevo usuario:', error);
      }
    );
  }

  showCreateUserForm(){
    this.showCreateForm = true;
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }




  loadUsers(){
    this.apiService.getUsers().subscribe(data=>{
      this.users = data;
    },
    error => {
      console.log("Error al cargar los usuarios", error);
    })
  }

  toggleUserList() {
    this.showUserList = !this.showUserList;
  }

  getUser(userId:number){
    if(!userId){
      console.log('id: ', userId);
      console.log('Id no valido');
      return;
    }
    this.apiService.getUser(userId).subscribe( data =>
      {
        this.user = data;
      }, error => { console.log('Error al cargar el usuario: ', error); }
    );
  }

  deleteUser(user:any){
    if(!user || !user.id){
      console.log('Usuario invalido.');
      return;
    }
    if(confirm('Estas seguro que deseas eliminar este usuario?')){
      this.apiService.deleteUser(user.id).subscribe(
        ()=>{
          console.log('Usuario Eliminado con exito');
          this.users = this.users.filter(u => u.id !== user.id);
        },
        error => {console.log('Error al eliminar el usuario ', error);}
        )
    };
  }


  //manejando el update
  editUser(user: any) {
    this.isEditing = true;
    this.userToEdit = { ...user }; // Realiza una copia del usuario para evitar modificar el original
  }

  cancelEdit() {
    this.isEditing = false;
    this.userToEdit = null;
  }

  updateUser() {
    // Realiza la llamada a la API con this.userToEdit
    this.apiService.partialUpdateUser(this.userToEdit.id, this.userToEdit).subscribe(
      data => {
        console.log('Usuario actualizado: ', data);
        const index = this.users.findIndex(u => u.id === this.userToEdit.id);
        if (index !== -1) {
          this.users[index] = data;
        }
        this.isEditing = false;
        this.userToEdit = null;
      },
      error => {
        console.log('Error al actualizar el usuario', error);
      }
    );
  }


}
