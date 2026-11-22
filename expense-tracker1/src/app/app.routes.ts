import { Routes } from '@angular/router';
import { Dashboard } from './component/dashboard/dashboard';
import { Transaction } from './component/transaction/transaction';
import { History } from './component/history/history';

export const routes: Routes = [
    
    {
        path:'dashboard',
        component: Dashboard
    },
    {
        path:'transaction',
        component:Transaction
    },
    {
        path: 'history',
        component:History
    }
];
