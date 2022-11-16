import { Injectable } from '@angular/core';
import { ParseResult } from 'papaparse';
import { BehaviorSubject } from 'rxjs';
import { validateBestandProvyta } from '../validation/bestand_provyta';
import { ValidationResult } from '../validation/validationResult.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private isValidating = new BehaviorSubject<boolean>(false);
  public $isValidating = this.isValidating.asObservable();

  private validationResult = new BehaviorSubject<ValidationResult[] | null>(null);
  public $validationResult = this.validationResult.asObservable();

  constructor() { }

  public validateCsv = (val: ParseResult<any>) => {
    const bestandProvytaResults = validateBestandProvyta(val.data)
    this.validationResult.next(bestandProvytaResults)
  }
}
