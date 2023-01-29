<p align="center">
  <a href="http://kubide.io/" target="blank"> <img src="https://adalab.es/wp-content/uploads/2022/09/logo_0000s_0036_Kubide.png" width="150" alt="Kubide logo" /></a>
  <a href="http://angular.io" target="blank"><img src="https://raw.githubusercontent.com/WEAHub/PT-Frontend-Kubide/master/preview/angular.png" width="60" alt="Angular Logo" /></a>
  <a href="https://ngrx.io/" target="blank"><img src="https://raw.githubusercontent.com/WEAHub/PT-Frontend-Kubide/master/preview/ngrx.png" width="60" alt="Ngrx Logo" /></a>
  <a href="https://www.primefaces.org/primeng/" target="blank"><img src="https://raw.githubusercontent.com/WEAHub/PT-Frontend-Kubide/master/preview/primeng.svg" width="210" alt="Primeng Logo" /></a>
  <a href="http://kubide.io/" target="blank"> <img src="https://kubide.es/wp-content/uploads/2016/06/logotipo-blanco-300.png" width="160" alt="Kubide logo" /></a>
</p>

<p align="center">Prueba tecnica desarrollada con <a href="http://angular.io" target="_blank">Angular v15.1</a> • <a href="http://ngrx.io" target="_blank">NGRX</a> • <a href="https://www.primefaces.org/primeng/" target="_blank">PrimeNG</a> • <a href="https://www.primeflex.org/" target="_blank">Primeflex</a></p>

## Introducción
- Aplicación web en Angular que brinda información sobre los héroes de Marvel y permite la creación de un equipo con ellos. 
- La aplicación consume la <a href="https://developer.marvel.com/">API de Marvel</a> y almacena los datos obtenidos en un store con <a href="http://ngrx.io" target="_blank">NGRX</a> con <a href="https://v14.ngrx.io/guide/entity/adapter">adaptadores de entidad</a>.
- Se ha utilizado PrimeNG y PrimeFlex para brindar una experiencia de usuario atractiva con animaciones en las vistas.
- Se ha utilizado localStorage para guardar y recuperar parte del estado del store NGRX para brindar una experiencia de usuario más eficiente.

## Ejecutar el app
- Primero, es necesario tener instalado el CLI de Angular.
```cmd
npm install -g @angular/cli
```
- Si estás utilizando Windows tendrás que ejecutar este comando en PowerShell.
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
- Ya estas listo para instalar y iniciar la app.

```cmd
git clone https://github.com/WEAHub/PT-Frontend-Kubide
npm install
ng serve
```

- Para poder visualizar el app desde otros dispositivos.
```cmd
ng serve --host 0.0.0.0 --port 4200
```

## Lista de héroes
<p align="center">
<img src="https://github.com/WEAHub/PT-Frontend-Kubide/blob/master/preview/scroll.gif" width="800" align="center"/>
</p>

## Búsqueda
<p align="center">
<img src="https://github.com/WEAHub/PT-Frontend-Kubide/blob/master/preview/search.gif" width="800" align="center"/>
</p>

## Añadir al equipo
<p align="center">
<img src="https://github.com/WEAHub/PT-Frontend-Kubide/blob/master/preview/addteam.gif" width="800" align="center"/>
</p>

## Ver detalles del héroe
<p align="center">
<img src="https://github.com/WEAHub/PT-Frontend-Kubide/blob/master/preview/viewdetails.gif" width="800" align="center"/>
</p>

## Gestión del equipo
<p align="center">
<img src="https://github.com/WEAHub/PT-Frontend-Kubide/blob/master/preview/team.gif" width="800" align="center"/>
</p>