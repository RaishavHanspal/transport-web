import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import serverEndpoints from '../serverEndpoints';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent implements OnInit{
  constructor(private apiService: ApiService, private router: Router) { }
  public error: string = "";
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });

  public ngOnInit(): void{
    this.apiService.postRequest(serverEndpoints.getUser, { username: this.apiService.getLoggedInUser()})
    .subscribe((res: any) => {
      if(res.success && res.entries){
        this.form.setValue({
          name: res.entries.name,
          phone: res.entries.phone,
          email: res.entries.email,
          dob: res.entries.dob,
          address: res.entries.address
        })
      }
    })
  }

  public submit(): void {
    const requestBody: any = {
      username: this.apiService.getLoggedInUser(),
      name: this.form.controls['name'].value,
      phone: this.form.controls['phone'].value,
      email: this.form.controls['email'].value,
      dob: this.form.controls['dob'].value,
      address: this.form.controls['address'].value
    }
    this.apiService.postRequest(serverEndpoints.setUser, requestBody).subscribe((res: any) => {
      this.router.navigate(['/']);
    });
  }
}
