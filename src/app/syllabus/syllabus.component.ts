import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { AddSyllabusComponent } from '../add-syllabus/add-syllabus.component';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.css']
})
export class SyllabusComponent implements OnInit {

  syllabus_data:any;
  // imageUrl:string = 'https://greensoft.net.in/gselearning/assets/'
  imageUrl:string = 'http://localhost/assets/upload/'      

  
  displayedColumns: string[] = ['syllabus_id','university_id_fk', 'course_id_fk', 'syllabus_desc','syllabus_file', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private dialog:MatDialog,
    private service:ApiService,
    private route:Router,
    private toast:NgToastService
  ) { 
    this.route.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

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
      if(confirm(" Are sure you to delete")){
        const delsyllabus = new FormData();
        delsyllabus.append('syllabus_id',row.syllabus_id);
        this.service.del_syllabus(delsyllabus).subscribe(
         ( res:any) =>{
          this.route.navigate(['/home/syllabus']);
          this.toast.success({detail:"Success",summary:'Data Delete Successfully'})
          }
        )
      }
      else{
        alert('cancel')
      }
  }
  edit_syllabus(row:any){
    this.dialog.open(AddSyllabusComponent,{
      data:row

    })
  }
}
