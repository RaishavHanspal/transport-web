import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, public apiService: ApiService){}
  title = 'transport-web';
  ngOnInit(): void {
    this.router.navigate([this.apiService.getLoggedInUser() ? '/dashboard' : '/login']);
  }
  
  /** when user presses on log out from header */
  public logOut(): void{
    this.apiService.setLoggedIn();
    this.router.navigate(['/login']);
  }
}
