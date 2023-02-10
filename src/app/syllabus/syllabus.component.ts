import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { AddSyllabusComponent } from '../add-syllabus/add-syllabus.component';


@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.css']
})
export class SyllabusComponent implements OnInit {

  syllabus_data:any;
  imageUrl:string = 'https://greensoft.net.in/gselearning/assets/'
  
  displayedColumns: string[] = ['syllabus_id','university_id_fk', 'course_name', 'syllabus_desc','syllabus_file', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private dialog:MatDialog,
    private service:ApiService
  ) { }

  ngOnInit(): void {
    this.service.syllabusGet().subscribe(
      (syllabus_data: any)=>{
        this.dataSource = new MatTableDataSource(syllabus_data.data);
        this.syllabus_data  = syllabus_data.data.length
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


  addPreviousForm(){
    this.dialog.open(AddSyllabusComponent),{

    }
  }

  editCourse(row: any){
    this.dialog.open(AddSyllabusComponent,{
      data: row
    })
  }
  delect_syllabus(row:any){
      if(confirm(" Are sure you to delect")){
        const delsyllabus = new FormData();
        delsyllabus.append('syllabus_id',row.syllabus_id);
        this.service.del_syllabus(delsyllabus).subscribe(
         ( res:any) =>{
              alert('data delect successfully')
          }
        )
      }
      else{
        alert('cancel')
      }
  }
}
