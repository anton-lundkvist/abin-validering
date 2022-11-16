import { Component, OnInit } from '@angular/core';
import { CSVParserService } from 'src/app/services/csvparser.service';
import { delay } from 'rxjs'
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-file-select-form',
  templateUrl: './file-select-form.component.html',
  styleUrls: ['./file-select-form.component.scss']
})
export class FileSelectFormComponent implements OnInit {
  private readingFile = new BehaviorSubject<boolean>(false);
  public $readingFile = this.readingFile.asObservable();

  private fileInfo = new BehaviorSubject<{ rows: number; columns: number | undefined; columnNames: string[] | undefined } | null>(null);
  public $fileInfo = this.fileInfo.asObservable();

  errorMessage: string | null = null;

  constructor(private csvParser: CSVParserService) { }

  ngOnInit(): void {
    this.csvParser.$readingCsv
      .subscribe({
        next: (val) => {
          this.readingFile.next(val)
        }
      });

  }

  fileSelected(evt: any) {
    this.errorMessage = null;
    if (!evt.target.files || evt.target.files.length === 0 || evt.target.files[0].type !== 'text/csv') {
      this.errorMessage = 'Fel filtyp, endast .csv tillåts';
      return;
    }
    const file = evt.target.files[0];
    this.csvParser.parseCsv(file)

  }

}
