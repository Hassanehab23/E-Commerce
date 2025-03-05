import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NavBarComponent } from './Components/MainStructure/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/MainStructure/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavBarComponent,FooterComponent,DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'E-Commerce';
  date:Date=new(Date);
}