import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TopicFormComponent } from '../topic-form/topic-form.component';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-m-topics',
  templateUrl: './m-topics.component.html',
  styleUrls: ['./m-topics.component.css']
})
export class MTopicsComponent implements OnInit {

  topic_count: any;
  imageUrl: string = 'http://localhost/E-Learning/src/assets/'
  displayedColumns: string[] = ['topic_id', 'course_id_fk','topics_id_fk', 'content_heading', 'englishcontent', 'hindicontent', 'urducontent', 'hinglishcontent', 'youtubelink', 'content_image', 'action'];
  dataSource = new MatTableDataSource<any>;
  content_data: any
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: ApiService
  ) { }

  ngOnInit(): void {

    this.service.getContent().subscribe(
      (content_data: any)=>{
        this.dataSource = new MatTableDataSource(content_data.data);
        this.content_data  = content_data.data.length
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
  opentopicForm() {
    this.dialog.open(TopicFormComponent, {
     
    })
  }

  editcontent(row: any){
    this.dialog.open(TopicFormComponent,{
      data: row
    })
  }
}


