import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styles: [
  ],
})
export class AdminHeaderComponent implements OnInit {
  public activeTab$: Observable<string>;
  public activeTab: string = null;
  component: any;

  constructor() { }

  ngOnInit(): void {
  }

  onOutletLoaded(component) {
    this.component = component;
    this.activeTab = this.component.activeTabText;
    // component.prjType = this.prjType;

  }

}
