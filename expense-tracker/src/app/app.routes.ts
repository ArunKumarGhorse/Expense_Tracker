import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { CanActivateChildFn, Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Dashboard } from './component/dashboard/dashboard';
import { Transaction } from './component/transaction/transaction';
import { History } from './component/history/history';
import { Home } from './component/home/home';
import { Login } from './component/login/login';

const requireLogin: CanActivateChildFn = () => {
    if (localStorage.getItem('loggedInUser')) {
        return true;
    }

    return inject(Router).createUrlTree(['/login']);
};

export const routes: Routes = [

    // Without Navbar
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },

    // With Common Navbar
    {
        path: '',
        component: DashboardLayout,
        canActivateChild: [requireLogin],
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'transaction',
                component: Transaction
            },
            {
                path: 'history',
                component: History
            }
        ]
    }
];