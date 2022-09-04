import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface RouteInfo {
    path: string;
    submenu:boolean;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/admin-layout/dashboard',submenu:false, title: 'Dashboard', icon: 'nc-bank', class: '' },
];
@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public router : Router;
    isEpanded = false;
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    logout() {
        localStorage.setItem("login","false");
    }
}
