import { Routes } from '@angular/router';
import { Homepage } from '../pages/homepage/homepage';
import { Projectspage } from '../pages/projectspage/projectspage';

export const routes: Routes = [
    {
        path:"",
        pathMatch:"full",
        component:Homepage
    },
    {
        path:"projects",
        component:Projectspage
    }
];
