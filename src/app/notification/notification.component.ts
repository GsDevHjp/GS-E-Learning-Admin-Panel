import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationFormComponent } from '../notification-form/notification-form.component';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  displayedColumns: string[] = ['notif_id', 'message', 'action'];
  dataSource = new MatTableDataSource<any>;

  notifdata:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  row: any;

  constructor(
    private service:ApiService,
    private dialog:MatDialog,
    private route:Router,
    private toast:NgToastService
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
    this.dialog.open(NotificationFormComponent,{
      // disableClose:true,
    })
  }  
  delete_noti(row:any){
    if (confirm("Are you sure to delete")) {
      const deldatanoti = new FormData();
      deldatanoti.append('notif_id',row.notif_id);
      this.service.del_notification(deldatanoti).subscribe(
        (res: any) => {
          this.toast.success({detail:"success",summary:'Data  Delete Successfully'})
          this.route.navigate(['/home/notification']);
        }
      )
    }
    else {
      alert('cancel')

    }
  }    
  editnotification(row:any){
    this.dialog.open(NotificationFormComponent,{
        data:row  
    })
  } 
  }


