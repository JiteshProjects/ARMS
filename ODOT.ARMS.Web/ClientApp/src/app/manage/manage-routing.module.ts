import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationViewComponent } from './component/adminstartion-view/administration-view.component';
import { AdminHeaderComponent } from './component/admin-header/admin-header.component';
import { AdminNotificationComponent } from './component/admin-notification/admin-notification.component'


const routes: Routes = [
  
  //{ path: '', component: AdministrationViewComponent }
  {
    path: 'administration', component: AdminHeaderComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'admin-view' },
      {
        path: 'admin-view', component: AdministrationViewComponent
      },
      {
        path: 'admin-notification', component: AdminNotificationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
