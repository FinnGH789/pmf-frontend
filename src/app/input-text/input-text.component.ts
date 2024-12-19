import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  HostListener,
  inject,
  Injector,
  input,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';

let index = 0;

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor, OnInit {
  label = input.required<string>();

  protected control!: AbstractControl;
  protected disabled = false;
  protected value?: string;
  private injector = inject(Injector);

  private onChangeFn: OnChangeFn = () => {};
  private onTouchedFn: OnTouchedFn = () => {};

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);
    if (ngControl instanceof FormControlName) {
      this.control = this.injector
        .get(FormGroupDirective)
        .getControl(ngControl);
    } else if (ngControl instanceof FormControlDirective) {
      this.control = (ngControl as FormControlDirective)
        .form as AbstractControl;
    } else {
      this.control = (ngControl as NgModel).control;
    }
  }
  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(onChangeFn: OnChangeFn): void {
    this.onChangeFn = onChangeFn;
  }
  registerOnTouched(onTouchedFn: OnTouchedFn): void {
    this.onTouchedFn = onTouchedFn;
  }
  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  @HostListener('input', ['$event.target.value'])
  protected handleInputEvent(value: string) {
    if (this.disabled) {
      return;
    }
    this.value = value;
    this.onChangeFn(value);
  }

  @HostListener('focusout')
  protected handleFocusoutEvent() {
    if (this.disabled) {
      return;
    }
    this.onTouchedFn();
  }
}

type OnChangeFn = (value: string) => void;
type OnTouchedFn = () => void;