import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {
  // public username: string | null = "";
  constructor(private apiService: ApiService){
    // this.username = localStorage.getItem("username");
  }
}
