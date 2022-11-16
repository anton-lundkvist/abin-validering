import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectFormComponent } from './file-select-form.component';

describe('FileSelectFormComponent', () => {
  let component: FileSelectFormComponent;
  let fixture: ComponentFixture<FileSelectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSelectFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSelectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
