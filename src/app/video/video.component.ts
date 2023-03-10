import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { AddVideoComponent } from '../add-video/add-video.component';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  videodata:any  
  dataSource = new MatTableDataSource<any>;
  displayedColumns: string[] = ['video_id','course_id_fk', 'topics_id_fk','video_title', 'video_url', 'action'];
  
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(
    private dialog:MatDialog,
    private service:ApiService,
    private toast:NgToastService,
    private route:Router
  ) { 
    this.route.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  ngOnInit(): void {
    this.service.Getvideo().subscribe(
      (videodata: any)=>{
        this.dataSource = new MatTableDataSource(videodata.data);
        this.videodata  = videodata.data.length
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
    
  }

  openvideoaddForm(){
    this.dialog.open(AddVideoComponent,{

    })
  }

  applyFilter(event:Event) {

    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  editvideo(row:any){
    this.dialog.open(AddVideoComponent,{
      data:row
    })
  }
  delete_video(row:any){
    if(confirm('are you sure to delete')){
     const deldatavideo = new FormData();
     deldatavideo.append('video_id',row.video_id);
     this.service.del_video(deldatavideo).subscribe(
      (res:any) =>{
       this.toast.success({detail:"Success",summary:'Data Delete Successfully'})
      }
     )
    }
    else{
      alert('cancel')
    }
  }

}
