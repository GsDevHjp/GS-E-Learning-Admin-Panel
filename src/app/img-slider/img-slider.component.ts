import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { AddSliderComponent } from '../add-slider/add-slider.component';


@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.css']
})
export class ImgSliderComponent implements OnInit {

  imageUrl: string = 'https://greensoft.net.in/gselearning/assets/'
  // imageUrl: string = 'http://localhost/E-Learning/src/assets/'
  // imageUrl: string = "";
  
  displayedColumns: string[] = ['slider_id', 'slider_text', 'slider_img', 'action'];
  dataSource = new MatTableDataSource<any>;
  coursedata: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: ApiService
  ) { }

  ngOnInit(): void {
    this.service.Getslider().subscribe(
      (coursedata: any) => {
        this.dataSource = new MatTableDataSource(coursedata.data);
        this.coursedata = coursedata.data.length
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openslider() {
    this.dialog.open(AddSliderComponent), {

    }
  }


}




