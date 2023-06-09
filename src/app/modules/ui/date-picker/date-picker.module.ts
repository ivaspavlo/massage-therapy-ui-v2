import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { SharedModule } from '@app/shared/shared.module';
import { DatePickerContainerComponent } from './container/date-picker-container.component';


@NgModule({
  declarations: [
    DatePickerContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularMyDatePickerModule
  ],
  exports: [
    DatePickerContainerComponent
  ]
})
export class DatePickerModule { }
