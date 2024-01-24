activa el entorno virtual (virtualenv)
Instala las Dependencias desde el requirements.txt
ejecuta el comando:  pip install -r requirements.txt
ejecuta el comando: py manage.py runserver o python manage.py runserver
esto ejecutara el back-end y se iniciara en el puerto: http://localhost:8000/
ingresa a la carpeta client
ejecute: npm install
en el interior de la carpeta client ejecute: ng serve 
ng serve: abrira el front-end (un server) de angular en el puerto: http://localhost:4200

al ingresar al http://localhost:4200 podra realizar las acciones del crud para usuario y para tarea
esta es la primera version de la pagina

la proxima Actualizacion: -Login | - Relacion de la tarea con usuario | -Reemplazo de DB (mysql - Firebase Realtime Database - PostgreSQL) | - Manejo de errores

