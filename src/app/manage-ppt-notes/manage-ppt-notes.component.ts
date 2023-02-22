import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {AfterViewInit, ViewChild} from '@angular/core';
import { AddPptNotesComponent } from '../add-ppt-notes/add-ppt-notes.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-manage-ppt-notes',
  templateUrl: './manage-ppt-notes.component.html',
  styleUrls: ['./manage-ppt-notes.component.css']
})
export class ManagePptNotesComponent implements OnInit {

  // imageUrl:string = 'https://greensoft.net.in/gselearning/assets/'
  imageUrl:string = 'http://localhost/assets/upload/'      

  // pptdata:any;

  displayedColumns: string[] = ['ppt_notes_id','course_id_fk','topics_id_fk', 'ppt_notes_name','ppt_file', 'action'];
  dataSource = new MatTableDataSource<any>;
  pptnotesdata:any;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;


  constructor(
    private dialog:MatDialog,
    private service:ApiService,
    private toast:NgToastService
  ) { }

  ngOnInit(): void {
    this.service.pptnotesGet().subscribe(
      (pptnotesdata: any)=>{
        this.dataSource = new MatTableDataSource(pptnotesdata.data);
        this.pptnotesdata  = pptnotesdata.data.length
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      }
    )
  }

  editppt(row: any){
    this.dialog.open(AddPptNotesComponent,{
      data: row
    })
  }

  

  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  addppt(){
    this.dialog.open(AddPptNotesComponent),{

    }
  }
  ppt_delect(row:any){
    if (confirm("Are you sure to delete")) {
      const deldatappt = new FormData();
      deldatappt.append('ppt_notes_id', row.ppt_notes_id);
      this.service.del_ppt_notes(deldatappt).subscribe(
        (res: any) => {
         this.toast.success({detail:"Success",summary:'Data Delete Successfully'})
        }
      )
    }
    else {
      alert('cancel')
    }
  }  
}
