import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { ParseResult } from 'papaparse';
import { CSVParserService } from 'src/app/services/csvparser.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.scss']
})
export class ValidationFormComponent implements OnInit {
  csvData: ParseResult<any> | null = null;
  constructor(private csvParser: CSVParserService, private validationService: ValidationService) { }

  ngOnInit(): void {
    this.csvParser.$csvContent
      .subscribe({
        next: (val) => {
          this.csvData = cloneDeep(val);
        }
      })
  }
  validateCsv = () => {
    if (this.csvData) {
      this.validationService.validateCsv(this.csvData)
    }
  }

}
