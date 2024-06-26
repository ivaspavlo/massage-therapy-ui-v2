import { ControlRequiredPipe } from './control-required.pipe';
import { DynamicTranslatePipe } from './dynamic-translate.pipe';
import { FirstErrorPipe } from './first-error.pipe';
import { MonthTranslatePipe } from './month-translate.pipe';


export const PIPES = [
  FirstErrorPipe,
  ControlRequiredPipe,
  DynamicTranslatePipe,
  MonthTranslatePipe
];
