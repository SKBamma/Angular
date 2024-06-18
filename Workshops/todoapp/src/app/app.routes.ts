import { Routes } from '@angular/router';
import { TodolistComponent } from './todolist.component';

export const routes: Routes = [
    {
        path: '',
        component: TodolistComponent,
        pathMatch: 'full'
    },
    {
        path: 'add-todo',
        loadComponent: () => import('./addtodo.component').then(c => c.AddtodoComponent)
    },
    {
        path: 'update-todo',
        loadComponent: () => import('./updatetodo.component').then(c => c.UpdatetodoComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
