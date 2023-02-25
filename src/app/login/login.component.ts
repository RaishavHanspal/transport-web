import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import serverEndpoints from '../serverEndpoints';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService){}
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  private showErrorTimeOut: any = null;
  @Input() error: string | null = "";

  @Output() submitEM = new EventEmitter();

  public ngOnInit(): void {
      
  }

  /** on login submit input, send request to server for is valid user */
  public login(): void{
    this.reset();
    const requestBody = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }
    if(requestBody.username && requestBody.password){
      this.apiService.postRequest(serverEndpoints.login, requestBody).subscribe((response: any) => {
        if(response.success){
          alert("success")!
        }
        else{
          this.showNewError(response.msg);
        }
      })
    }
  }

  /** display error message, as received from server */
  public showNewError(errorMessage: string): void{
    this.error = errorMessage;
    this.showErrorTimeOut = setTimeout((): void => {
      this.reset();
    }, 2000);
  }

  private reset(): void {
    this.showErrorTimeOut && clearTimeout(this.showErrorTimeOut);
    this.showErrorTimeOut = null;
    this.error = "";
  }
}
