import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';
import { FlowbiteService } from '../../../Services/FlowBite/flow-bite.service';
import { NgClass } from '@angular/common';
import { CartService } from '../../../Services/Cart/cart.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLogin: boolean = false;
  isNavbarOpen: boolean = false;
  isDarkMode: boolean = false;


  constructor(public _CartService: CartService,private router: Router, public _AuthService: AuthService, private _FlowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.updateTheme();
    this.router.events.subscribe(() => {
      this.isNavbarOpen = false;
    });

    this._AuthService.userData.subscribe(res => {
      this.isLogin = res != null;
    });
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  closeNavbar() {
    this.isNavbarOpen = false;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateTheme();
  }

  updateTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark'); // ✅ تفعيل Dark Mode
    } else {
      document.documentElement.classList.remove('dark'); // ❌ تعطيل Dark Mode
    }
  }

}
