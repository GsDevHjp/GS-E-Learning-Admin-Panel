import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { AddUniversityComponent } from '../add-university/add-university.component';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
  // imageUrl:string = 'https://greensoft.net.in/gselearning/assets/'
  imageUrl:string = 'assets/'

  displayedColumns: string[] = ['university_id', 'university_name','university_img', 'action'];
  dataSource = new MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  universitydata:any
  constructor(
    private dialog:MatDialog,
    private service:ApiService
  ) { }

  ngOnInit(): void {
    this.service.universityGet().subscribe(
      (universitydata: any)=>{
        this.dataSource = new MatTableDataSource(universitydata.data);
        this.universitydata  = universitydata.data.length
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

  addUniversity(){
    this.dialog.open(AddUniversityComponent),{

    }
  }
  delect_unsity(row:any){
    if(confirm("are you sure delect")){
      const deldatauniver = new FormData();
      deldatauniver.append('university_id',row.university_id),
      this.service.del_university(deldatauniver).subscribe(
      (res:any) =>{
         alert('data is delect successfully')
      }
      )
      }
      else{
          alert('cancel')
      }

    }
    update_uni(row:any){
      this.dialog.open(AddUniversityComponent,{
          data:row
      })
    }

  }

