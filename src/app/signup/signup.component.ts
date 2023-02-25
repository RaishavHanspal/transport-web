import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import serverEndpoints from '../serverEndpoints';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  constructor(private apiService: ApiService){}
  public form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  private showErrorTimeOut: any = null;
  @Input() error: string | null = "";

  public ngOnInit(): void {
      
  }

  /** on login submit input, send request to server for is valid user */
  public submit(): void{
    this.reset();
    const requestBody = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value
    }
    if(requestBody.username && requestBody.password){
      this.apiService.postRequest(serverEndpoints.signup, requestBody).subscribe((response: any) => {
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
