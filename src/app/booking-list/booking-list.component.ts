import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import serverEndpoints from '../serverEndpoints';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.less']
})
export class BookingListComponent implements OnInit{
  public bookings: any[] = [];
  constructor(private apiService: ApiService){}
  public bookingDetailTitleMap: any = {
    source: "Source",
    destination: "Destination",
    bookedOn: "Booking Date",
    dateOfBoarding: "Date of Boarding"
  }
  public ngOnInit(): void {
    this.apiService.postRequest(serverEndpoints.getbookings, {
      username: this.apiService.getLoggedInUser()
    }).subscribe((res: any) => {
      if(res.success){
        this.bookings = res.entries;
        
      };
    })
  }

  /** utility written to use Object.keys fn in html */
  public getKeys(object: any): Array<string>{
    return Object.keys(object)
  }

}
