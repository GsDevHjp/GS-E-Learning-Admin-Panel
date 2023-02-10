import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationFormComponent } from '../notification-form/notification-form.component';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  displayedColumns: string[] = ['notif_id', 'msg', 'action'];
  dataSource = new MatTableDataSource<any>;

  notifdata:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  dialog: any;

  constructor(
    private dailog: MatDialog,
    private service:ApiService
  ){ }

  ngOnInit(): void {
    this.service.msgGet().subscribe(
      (msgdata: any)=>{
        this.dataSource = new MatTableDataSource(msgdata.data);
        this.notifdata = msgdata.data.length
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

  // for notification form

  notificationform() {
    this.dailog.open(NotificationFormComponent,{
      disableClose:true,
    })
  }
 
 
  delete_noti(row:any){
    if (confirm("Are you sure to delate")) {
      const deldatanoti = new FormData();
      deldatanoti.append('notif_id',row.notif_id);
      this.service.del_notification(deldatanoti).subscribe(
        (res: any) => {
          alert('data delate sucessfully')
        }
      )
    }
    else {
      alert('cancel')
    }
  }  
    edittopic(row:any){
      this.dialog.open(NotificationFormComponent,{
        data:row
  
      })
    } 
  }


