import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private router: Router){}
  isLoggedIn: boolean = false;
  title = 'transport-web';
  ngOnInit(): void {
    this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
    this.router.navigate([this.isLoggedIn ? '/dashboard' : '/login']);
  }
  
  public logOut(): void{
    this.isLoggedIn = false;
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    this.router.navigate(['/login']);
  }
}
