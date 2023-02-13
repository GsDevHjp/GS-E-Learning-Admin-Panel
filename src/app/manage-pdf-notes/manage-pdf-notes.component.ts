import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { AddPdfNotesComponent } from '../add-pdf-notes/add-pdf-notes.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-pdf-notes',
  templateUrl: './manage-pdf-notes.component.html',
  styleUrls: ['./manage-pdf-notes.component.css']
})
export class ManagePdfNotesComponent implements OnInit {
  displayedColumns: string[] = ['pdf_id','course_id_fk','topics_id_fk', 'pdf_notes_name','pdf_file', 'action'];
  dataSource = new MatTableDataSource<any>;
  imageUrl:string = 'https://greensoft.net.in/gselearning/assets/'
  pdfdata:any;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  pdfnotesGet: any;

  constructor(
    private dialog:MatDialog,
    private service:ApiService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.service.pdfnotesGet().subscribe(
      (pdfnotesGet: any)=>{
        this.dataSource = new MatTableDataSource(pdfnotesGet.data);
        this.pdfnotesGet  = pdfnotesGet.data.length
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  applyFilter(event:Event) {

    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  addpdf(){
    this.dialog.open(AddPdfNotesComponent),{

    }
  }
  editpdf(row: any){
    this.dialog.open(AddPdfNotesComponent,{
      data: row
    })
  }
  pdf_notes_delect(row:any){
      if(confirm("are you sure to delect")){
        const deldatapdf = new FormData();
        deldatapdf.append ('pdf_id',row.pdf_id);
        this.service.del_pdf_notes(deldatapdf).subscribe(
          (res: any) => {
            this.route.navigate(['/home/pdf_notes']);
            alert('data delate sucessfully')
          }
        )
      }
      else {
        alert('cancle')
      }
      } 
}
