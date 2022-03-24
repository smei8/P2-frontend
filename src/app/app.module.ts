import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListAccountComponent } from './account/list-account/list-account.component';
import { ListRequestComponent } from './reimbursement/list-request/list-request.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { EditAccountComponent } from './account/edit-account/edit-account.component';
import { LoginComponent } from './user/login/login.component';
import { HttpClientModule } from '@angular/common/http'; 
import { LogoutComponent } from './user/logout/logout.component';
import { EmployeeComponent } from './user/employee/employee.component';
import { ManagerComponent } from './user/manager/manager.component';
import { EpRequestComponent } from './user/ep-request/ep-request.component';
import { EditRequestComponent } from './reimbursement/edit-request/edit-request.component';
import { FileUploadComponent } from './file-upload/file-upload.component';



@NgModule({
  declarations: [
    AppComponent,
    ListAccountComponent,
    ListRequestComponent,
    HeaderComponent,
    EditAccountComponent,
    LoginComponent,
    LogoutComponent,
    EmployeeComponent,
    ManagerComponent,
    EpRequestComponent,
    EditRequestComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
