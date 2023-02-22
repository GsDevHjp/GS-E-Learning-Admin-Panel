import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { AddSliderComponent } from '../add-slider/add-slider.component';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.css']
})
export class ImgSliderComponent implements OnInit {

  //imageUrl: string = 'https://greensoft.net.in/gselearning/assets/'
  imageUrl: string = 'http://localhost/assets/upload/'
  // imageUrl: string = "";
  
  displayedColumns: string[] = ['slider_id', 'slider_text', 'slider_img', 'action'];
  dataSource = new MatTableDataSource<any>;
  coursedata: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: ApiService,
    private route:Router,
    private toast:NgToastService
  ) { 
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

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
  delete_slider(row:any){
    if(confirm('are you sure to delete')){
      const deldataslider = new FormData();
      deldataslider.append ('slider_id',row.slider_id);
      this.service.del_slider(deldataslider).subscribe(
        (res:any) =>{
          this.route.navigate(['/home/img_slider']);
          this.toast.success({detail:"Success",summary:'Data Delete Successfully'})
        }
      )
    }
    else{
      alert('cancel')
    }

  }
  edit_slider(row:any){
    this.dialog.open(AddSliderComponent,{
      data:row

    })
  } 
}




