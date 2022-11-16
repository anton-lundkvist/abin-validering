import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import * as lib from 'papaparse/papaparse.min.js';
import * as papaparse from 'papaparse'
import { ParseResult } from 'papaparse';
import { cloneDeep } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class CSVParserService {
  private csvContent = new BehaviorSubject<ParseResult<any> | null>(null);
  public $csvContent = this.csvContent.asObservable();
  private readingCsv = new BehaviorSubject<boolean>(false);
  public $readingCsv = this.readingCsv.asObservable();
  private readingError = new BehaviorSubject<Error | null>(null);
  public $readingError = this.readingError.asObservable();
  constructor() { }

  parseCsv(file: File) {
    this.readingCsv.next(true)
    this.csvContent.next(null)
    papaparse.parse(file, {
      header: true,
      dynamicTyping: true,
      worker: false,
      transformHeader: (header: string, ind: number) => {
        return header.toUpperCase();
      },
      complete: (results, _file) => {
        this.csvContent.next(results);
        this.readingCsv.next(false);
      },
      error: (error, file) => {
        console.error(error);
        this.readingError.next(error);
      },
    });



  }
}
