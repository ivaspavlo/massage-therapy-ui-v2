import { Component, OnInit, Input, Optional } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


export type InputTypes = 'text' | 'number' | 'textarea' | 'password';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputComponent,
    multi: true
  }]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() controlName = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() errorsMap: { [key:string]: string; };
  @Input() type: InputTypes;
  
  get isText() { return this.type === 'text'; }
  get isTextArea() { return this.type === 'textarea'; }
  
  public innerControl = new FormControl();
  public innerInputType: InputTypes;
  public hasFocus = false;

  // ControlContainer
  public get form(): FormGroup { return this.controlContainer.control as FormGroup; }
  public get control(): FormControl { return this.form.get(this.controlName) as FormControl; }

  // ControlValueAccessor
  private onChange: Function;
  private onTouched: Function;

  private componentDestroyed$: Subject<void> = new Subject();

  constructor(
    @Optional() private controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.initInnerInputType();
    this.listenToInnerControlChanges();
  }
  
  // ControlValueAccessor methods
  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }
  
  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
  
  public writeValue(value: unknown): void {
    this.innerControl.patchValue(value);
  }
  
  // Public methods
  public listenToInnerControlChanges(): void {
    this.innerControl.valueChanges.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((value) => {
      this.onInput(value);
    });
  }

  public onFocus(): void {
    this.onTouched();
    this.hasFocus = true;
  }

  public onBlur(): void {
    this.hasFocus = false;
  }

  public onInput(value: string): void {
    let formattedValue = value;
    this.innerControl.patchValue(formattedValue, { emitEvent: false, onlySelf: true });
    if (this.onChange) {
      this.onChange(formattedValue);
    }
  }
  
  public onPasswordToggle(isHidden: Event): void {
    this.innerInputType = isHidden ? 'password' : 'text';
  }
  
  // Private mehtods
  private initInnerInputType(): void {
    this.innerInputType = !this.type ? 'text' : this.type;
  }
  
  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
