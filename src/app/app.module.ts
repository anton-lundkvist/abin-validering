import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { ValidationFormComponent } from './forms/validation-form/validation-form.component';
import { FileSelectFormComponent } from './forms/file-select-form/file-select-form.component';
import { FileInfoComponent } from './file-info/file-info.component';
import { ValidationInfoComponent } from './validation-info/validation-info.component';
import { ResultTableComponent } from './validation-info/result-table/result-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ValidationFormComponent,
    FileSelectFormComponent,
    FileInfoComponent,
    ValidationInfoComponent,
    ResultTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
