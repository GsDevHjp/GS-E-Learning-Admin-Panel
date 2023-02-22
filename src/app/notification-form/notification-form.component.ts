import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.css']
})
export class NotificationFormComponent implements OnInit {
  admin = 1;
  msgForm !: FormGroup;
  action_btn: string = 'send'
  for_heading: string = 'Notification'


  constructor(
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private FormBuilder: FormBuilder,
    private service: ApiService,
    private route: Router,
    private toast:NgToastService,
    private matref: MatDialogRef<NotificationFormComponent>,

  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.msgForm = this.FormBuilder.group({
      message: ['', Validators.required],
      notif_id: [''],
      admin_id_fk: ['', Validators.required],
    })


    if (this.editdata) {
      console.log(this.editdata)
      this.action_btn = 'Update'
      this.for_heading = "Update Notification";
      this.msgForm.controls['message'].setValue(this.editdata.message)
      this.msgForm.controls['notif_id'].setValue(this.editdata.notif_id);

    }

  }

  addmsg() {
    if (!this.editdata) {
      console.log(this.msgForm.value);
      if (!this.editdata) {
        if (this.msgForm.valid) {
          this.service.msgPost(this.msgForm.value).subscribe(
            (result: any) => {
              this.toast.success({detail:"Success",summary:'Data is Add Successfully..'})              
              this.matref.close();
              this.route.navigate(['/home/notification'])

            },
            (error: any) => {
            this.toast.error({detail:"Error",summary:'Data is not Add..'})
            }
          )
        }


      }
    }
    else {
      this.updateNotification()
    }
  }

  updateNotification() { 
    const updateppt = new FormData();
    updateppt.append('notif_id', this.msgForm.get('notif_id')?.value)
    updateppt.append('message', this.msgForm.get('message')?.value)
    updateppt.append('admin_id_fk', this.msgForm.get('admin_id_fk')?.value)

    this.service.putnotification(updateppt).subscribe(
      (result: any) => {
        this.route.navigate(['/home/notification'])
        console.log(result);
       this.toast.success({detail:"Success", summary:'Data Update Successfully... '})
        this.matref.close();
      },
      (error: any) => {
        this.toast.error({detail:"Error",summary:'Data is not Update'})
      }
    )
  }


  reset() {
    this.msgForm.reset()
  }

}
