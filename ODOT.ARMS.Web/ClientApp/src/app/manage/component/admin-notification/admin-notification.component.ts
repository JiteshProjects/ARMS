import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styles: [
  ],
})
export class AdminNotificationComponent implements OnInit {
  public pDescription: string = "";
  public maxChars = 255;
  isSaveButtonDisabled: boolean = false;
  public activeTabText: string = "Notification";

  constructor() { }

  ngOnInit(): void {
  }

  public clearTxt() {

  }
  public save() { }

}
