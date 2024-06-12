import { Routes } from '@angular/router';

export const todos_routes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./list.component').then(c => c.ListComponent)
    },
    {
        path: 'add-todo',
        loadComponent: () => import('./add.component').then(c => c.AddComponent)
    },
    {
        path: 'update-todo',
        loadComponent: () => import('./update.component').then(c => c.UpdateComponent)
    },
    {
        path: 'todo-details',
        loadComponent: () => import('./todo-details.component').then(c => c.TodoDetailsComponent)
    }
];