import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error: string | null = "";

  @Output() submitEM = new EventEmitter();

  public ngOnInit(): void {
      
  }

  public login(): void{
    console.log("login submit", this.loginForm);
  }
}
