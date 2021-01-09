import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './state/reducers/administration-categories'
import { reducers } from './state/reducers';
import { AdministrationViewComponent } from './component/adminstartion-view/administration-view.component';
//import { ListAdministrationComponent } from './containers/list-administration/list-administration.component';
import { ManageRoutingModule } from './manage-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministrationDataService } from './services/administration-data.service';
import { AdministrationStoreEffects } from './state/effects/administration-categories';
import { SpecificListStoreEffects } from './state/effects/specificlist';
import { FundingListStoreEffects } from './state/effects/fundingtype';
import { AdminHeaderComponent } from './component/admin-header/admin-header.component';
import { AdminNotificationComponent } from './component/admin-notification/admin-notification.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ManageRoutingModule,
    ReactiveFormsModule, 
    StoreModule.forFeature('adminstration', reducers),
    StoreModule.forFeature('administrationCategory', courseReducer),
    EffectsModule.forFeature([FundingListStoreEffects, SpecificListStoreEffects, AdministrationStoreEffects])
  ],
  declarations: [AdministrationViewComponent, AdminHeaderComponent, AdminNotificationComponent],
  providers: [AdministrationDataService]
})
export class ManageModule { }
