import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input() logInUser: string =  "";
  @Output() logOutEvent = new EventEmitter<string>();

  logOut(): void{
    this.logOutEvent.emit();
  }
}
