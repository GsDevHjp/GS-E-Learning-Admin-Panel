import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { AddPreviousQuestionComponent } from '../add-previous-question/add-previous-question.component';


@Component({
  selector: 'app-previous-question',
  templateUrl: './previous-question.component.html',
  styleUrls: ['./previous-question.component.css']
})
export class PreviousQuestionComponent implements OnInit {

  imageUrl: string = 'https://greensoft.net.in/gselearning/assets/'
  displayedColumns: string[] = ['previous_id','university_id_fk', 'course_name','question_name', 'question_file',  'action'];
  dataSource = new MatTableDataSource<any>;
  previous_ques_data: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.service.previousGet().subscribe(
      (previous_ques_data: any)=>{
        this.dataSource = new MatTableDataSource(previous_ques_data.data);
        this.previous_ques_data  = previous_ques_data.data.length
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }


  applyFilter($event: Event) { }

  addPreviousForm() {
    this.dialog.open(AddPreviousQuestionComponent), {

    }
  }
  delect_previous(row:any){
    if(confirm('are you sure to Delete')){
      const deldatapre = new FormData();
      deldatapre.append('previous_id',row.previous_id);
      this.service.del_previous_ques(deldatapre).subscribe(
        (res:any) =>{
          alert('Delete successfully')
        }
      )
      }
      else{
        alert('cancel')
      }
    }
  }



