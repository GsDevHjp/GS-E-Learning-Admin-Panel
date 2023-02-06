import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AddTopicFormComponent } from '../add-topic-form/add-topic-form.component';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent implements OnInit {

  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['topic_id', 'course_id_fk', 'topics_name', 'action'];
  topicdata: any;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(
    private dialog: MatDialog,
    private service:ApiService
  ) { }

  ngOnInit(): void {
    this.service.getTopic().subscribe(
      (topicdata: any)=>{
        this.dataSource = new MatTableDataSource(topicdata.data);
        this.topicdata  = topicdata.data.length
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )

  }

  opentopicaddForm() {
    this.dialog.open(AddTopicFormComponent, {
     
    })


  }


  ///////////////// for table search///////////////

   applyFilter(event:Event) {

    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  edittopic(row:any){
    this.dialog.open(AddTopicFormComponent, {
      data: row
    })
  }

}
