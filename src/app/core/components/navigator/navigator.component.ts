import { Component, OnInit } from '@angular/core';
import { SideBarItem } from '../../models/layout.model';
import { faIndustry, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {

  menuItems: SideBarItem[] = [];

  faChevronDown = faChevronDown;

  currentRoute: String = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.addRouterListener();
  }

  ngOnInit() {
    this.buildNavigator();
  }

  addRouterListener() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  buildNavigator() {
    this.menuItems = [
      {
        id: 2,
        name: 'Page One',
        route: '/page-one',
        parentId: null,
        children: []
      },
      {
        id: 3,
        name: 'Page Two',
        route: '/page-two',
        parentId: null,
        children: [
          {
            id: 30,
            name: 'Sample Sub Item 1',
            route: '/sub-one',
            parentId: 3,
          },
          {
            id: 31,
            name: 'Sample Sub Item 2',
            route: '/sub-two',
            parentId: 3,
          }
        ]
      }
    ];
  }

  toggleMenuItem(menuItem) {
    const target = document.getElementById(`nav-sub-items-${menuItem.id}`);
    if (!target) {
      if (menuItem.children || menuItem.children.length === 0) {
        this.router.navigate([menuItem.route]);
      }
    } else {
      if (target.style.maxHeight) {
        target.style.maxHeight = null;
      } else {
        target.style.maxHeight = target.scrollHeight + 'px';
      }
    }
  }

  navigateTo(subItem) {
    const computedRoute = this.computedSubRoute(subItem);

    this.router.navigate([computedRoute]);
  }

  isSelectedItem(menuItem) {
    return menuItem.children && menuItem.children.length > 0
      ? false
      : this.currentRoute.includes(menuItem.route);
  }

  isSelectedSubItem(menuItem) {
    if (menuItem.children && menuItem.children.length > 0) {
      return menuItem.children.map(item => item.route).find(route => {
        return this.currentRoute.includes(route);
      });
    }
    return false;
  }

  computedSubRoute(subItem) {
    const parentRoute = this.menuItems.find(item => item.id === subItem.parentId);
    return parentRoute.route + subItem.route;
  }
}
