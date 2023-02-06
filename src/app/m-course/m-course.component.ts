import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CourseFormComponent } from '../course-form/course-form.component';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-m-course',
  templateUrl: './m-course.component.html',
  styleUrls: ['./m-course.component.css']
})
export class MCourseComponent implements OnInit {

  imageUrl: string = 'https://greensoft.net.in/gselearning/assets/'
  displayedColumns: string[] = ['course_id', 'course_name', 'course_desc', 'course_img', 'action'];
  dataSource = new MatTableDataSource<any>;
  coursedata: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.service.courseGet().subscribe(
      (coursedata: any) => {
        this.dataSource = new MatTableDataSource(coursedata.data);
        this.coursedata = coursedata.data.length
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  /////////////// for table search////////////////////

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ////////// For opening form onclick plus icon////////////

  openCourse() {
    this.dialog.open(CourseFormComponent), {

    }

  }

  editCourse(row: any) {
    this.dialog.open(CourseFormComponent, {
      data: row
    })
  }

}