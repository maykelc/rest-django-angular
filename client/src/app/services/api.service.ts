import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/tasks/api/v1/';
  private users = 'users/';
  private tasks = 'tasks/';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Se produjo un error del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      // El backend devolvió un código de error
      console.error(`Código de error del backend : ${error.status}`);
      console.error('Cuerpo del error en Json:', JSON.stringify(error.error));
      // Puedes agregar más detalles o personalización según tus necesidades
    }
    // Retorna un observable con un mensaje de error para el usuario
    return throwError(
      'Hubo un problema al procesar la solicitud. Por favor, intenta nuevamente más tarde.'
    );
  }
  

  // USER CRUD

  getUsers(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}${this.users}`)
      .pipe(catchError(this.handleError));
  }

  getUser(id: number): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}${this.users}${id}/`)
      .pipe(catchError(this.handleError));
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${this.users}`, user).pipe(
      catchError(this.handleError)
      );
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}${this.users}${id}/`, user)
      .pipe(catchError(this.handleError));
  }

  partialUpdateUser(id: number, updateFields: any): Observable<any> {
    const partialUpdateUrl = `${this.apiUrl}${this.users}${id}/`;
    return this.http
      .patch<any>(partialUpdateUrl, updateFields)
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}${this.users}${id}/`)
      .pipe(catchError(this.handleError));
  }

  // Tasks CRUD

  getTasks(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}${this.tasks}`)
      .pipe(catchError(this.handleError));
  }

  getTask(id: number): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}${this.tasks}${id}/`)
      .pipe(catchError(this.handleError));
  }

  createTask(task: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}${this.tasks}`, task)
      .pipe(catchError(this.handleError));
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}${this.tasks}${id}/`, task)
      .pipe(catchError(this.handleError));
  }

  partialUpdateTask(id: number, updateFields: any): Observable<any> {
    const partialUpdateUrl = `${this.apiUrl}${this.tasks}${id}/`;
    return this.http
      .patch<any>(partialUpdateUrl, updateFields)
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}${this.tasks}${id}/`)
      .pipe(catchError(this.handleError));
  }
}


