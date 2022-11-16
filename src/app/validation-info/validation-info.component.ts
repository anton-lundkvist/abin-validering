import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation.service';
import { ValidationResult } from '../validation/validationResult.model';

@Component({
  selector: 'app-validation-info',
  templateUrl: './validation-info.component.html',
  styleUrls: ['./validation-info.component.scss']
})
export class ValidationInfoComponent implements OnInit {
  isLoading: boolean = false;
  validationResult: ValidationResult[] | null = null;
  antalFel: number | null = null;
  antalVarningar: number | null = null;

  constructor(private validationService: ValidationService) { }

  ngOnInit(): void {
    this.validationService.$isValidating
      .subscribe(x => this.isLoading = x);

    this.validationService.$validationResult
      .subscribe(x => {
        if (x) {
          this.validationResult = x;
          this.antalFel = x.filter(y => y.severity === "error").length
          this.antalVarningar = x.filter(y => y.severity === "warning").length;
        }


      })
  }

  downloadValidationResult = () => {
    if (!this.validationResult) {
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(this.validationResult.map(e => `${e.severity}; ${e.row}; ${e.description}`).join("\n"));
    window.open(csvContent);

  }

}
