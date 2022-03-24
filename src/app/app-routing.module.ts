import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAccountComponent } from './account/edit-account/edit-account.component';
import { ListAccountComponent } from './account/list-account/list-account.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EditRequestComponent } from './reimbursement/edit-request/edit-request.component';
import { ListRequestComponent } from './reimbursement/list-request/list-request.component';
import { AuthGuard } from './user/auth.guard';
import { EmployeeComponent } from './user/employee/employee.component';
import { EpRequestComponent } from './user/ep-request/ep-request.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { ManagerComponent } from './user/manager/manager.component';


const routes: Routes = [
  { path: 'account-list', component: ListAccountComponent, canActivate: [AuthGuard] },
  { path: 'request-list', component: ListRequestComponent, canActivate: [AuthGuard] },
  { path: 'account-edit/:id', component: EditAccountComponent, canActivate: [AuthGuard] }, 
  { path: 'employee-home', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'manager-home', component: ManagerComponent, canActivate: [AuthGuard] },
  { path: 'ep-request', component: EpRequestComponent, canActivate: [AuthGuard] },
  { path: 'edit-request', component: EditRequestComponent, canActivate: [AuthGuard] },
  { path: 'img-upload/:rid', component: FileUploadComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
