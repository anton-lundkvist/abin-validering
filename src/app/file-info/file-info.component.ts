import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CSVParserService } from '../services/csvparser.service';

@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrls: ['./file-info.component.scss']
})
export class FileInfoComponent implements OnInit {
  private fileInfo = new BehaviorSubject<{ rows: number; columns: number | undefined; columnNames: string[] | undefined } | null>(null);
  public $fileInfo = this.fileInfo.asObservable();
  parsingError: Error | null = null;
  constructor(private csvParser: CSVParserService) { }

  ngOnInit(): void {
    this.csvParser.$csvContent
      .subscribe(x => {
        if (x) {
          this.fileInfo.next({
            rows: x.data.length,
            columns: x.meta.fields?.length,
            columnNames: x.meta.fields
          })
        }
      });
    this.csvParser.$readingError
      .subscribe(x => {
        this.parsingError = x;
      })
  }

}
