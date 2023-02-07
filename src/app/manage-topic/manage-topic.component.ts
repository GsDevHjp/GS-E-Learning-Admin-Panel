import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { AddTopicComponent } from '../add-topic/add-topic.component';

@Component({
  selector: 'app-manage-topic',
  templateUrl: './manage-topic.component.html',
  styleUrls: ['./manage-topic.component.css']
})
export class ManageTopicComponent implements OnInit {
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
  this.dialog.open(AddTopicComponent, {
   
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
  this.dialog.open(AddTopicComponent, {
    data: row
  })
}

}



