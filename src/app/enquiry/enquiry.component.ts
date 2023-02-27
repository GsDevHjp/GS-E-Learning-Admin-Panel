import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})


export class EnquiryComponent implements OnInit {
  notifdata:any;
  displayedColumns: string[] = ['std_id','std_name','std_email_id','std_country', 'inq_msg'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(
    private dailog: MatDialog,
    private service:ApiService
  ) { }

  ngOnInit(): void {
    this.service.msgGet().subscribe(
      (msgdata: any)=>{
        // this.dataSource = new MatTableDataSource(msgdata.data);
        // this.notifdata = msgdata.data.length
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
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

}