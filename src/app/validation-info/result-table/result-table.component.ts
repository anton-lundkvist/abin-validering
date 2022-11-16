import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ValidationService } from 'src/app/services/validation.service';
import { ValidationResult } from 'src/app/validation/validationResult.model';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['severity', 'row', 'description'];
  dataSource: MatTableDataSource<ValidationResult>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private validationService: ValidationService) {
    const data: ValidationResult[] = [];
    this.dataSource = new MatTableDataSource(data);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.validationService.$validationResult
      .subscribe(x => {
        if (x) {
          this.dataSource.data = x;
        }


      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
