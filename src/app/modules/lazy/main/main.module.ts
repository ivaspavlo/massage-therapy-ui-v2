import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { FooterModule, HeaderModule } from '@app/modules/ui';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page.component';
import { COMPONENTS } from './components';


@NgModule({
  declarations: [
    MainPageComponent,
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    HeaderModule,
    FooterModule,
    CoreTranslationModule.forChild()
  ]
})
export class MainModule { }
