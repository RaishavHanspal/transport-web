import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import serverEndpoints from '../serverEndpoints';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less']
})
export class BookingComponent {
  constructor(private apiService: ApiService, private router: Router) { }
  public bookingDetails: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    source: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    dateOfBoarding: new FormControl('', Validators.required),
  });
  public paymentDetails: FormGroup = new FormGroup({
    modeOfPayment: new FormControl('')
  })
  isLinear = true;

  /** submit booking details */
  public submit(): void {
    this.apiService.postRequest(serverEndpoints.book, {
      username: this.apiService.getLoggedInUser(),
      isLoggedin: true,
      name: this.bookingDetails.controls['name'].value,
      phone: this.bookingDetails.controls['phone'].value,
      source: this.bookingDetails.controls['source'].value,
      destination: this.bookingDetails.controls['destination'].value,
      bookedOn: Date.now(),
      dateOfBoarding: new Date(this.bookingDetails.controls['dateOfBoarding'].value),
      paymentMode: this.paymentDetails.controls['modeOfPayment'].value
    }).subscribe((res: any) => {
      this.router.navigate(['/dashboard']);
    })
  }
}
