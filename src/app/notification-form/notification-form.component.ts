import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.css']
})
export class NotificationFormComponent implements OnInit {
  admin = 1;
  msgForm !: FormGroup; 
  action_btn: string = 'send'
  for_heading:string='Notification'

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private FormBuilder: FormBuilder,
    private service: ApiService,
  ) {   }

  ngOnInit(): void {
    this.msgForm = this.FormBuilder.group({
      msg: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })   

    
    if (this.editdata) {
      console.log(this.editdata.msg)
      this.action_btn = 'Update'
      this.for_heading ="Update Notification";
      this.msgForm.controls['notif_id'].setValue(this.editdata[0].notif_id);
      this.msgForm.controls['msg'].setValue(this.editdata.msg);
      this.msgForm.controls['admin_id_fk'].setValue(this.editdata[0].admin_id_fk);

    }
  
  }   

  addmsg(){
    if (!this.editdata) {
    console.log(this.msgForm.value);
    if (!this.editdata) {
     if (this.msgForm.valid) {
    this.service.msgPost(this.msgForm.value).subscribe(
      (result:any)=>{
        console.log(result);
        alert("Data Add Successfully");

      },
      (error:any)=>{
        alert("Data Not Insert")
      }
    )}  
  
    else {
      this.updateNotification()
    }
  }
}
  }
  

updateNotification(){
  if (this.msgForm.valid) {
    this.service.putnotification(this.msgForm.value).subscribe(
      (data: any) => {
        // this.router.navigate(['/manage_role']);
        // this.addRole.reset();
        // this.matref.close('save');
        // this.popup.success({detail:'Success',summary:'Role Update Successfully...',sticky:true,position:'tr'})
      },
      (error: any) => {
        console.log(['message']);
        // this.popup.error({detail:'message',summary:'Role data is not  Update', sticky:true,position:'tr'})        

      }
    ); 
  }
} 
  reset(){
    this.msgForm.reset()
  }
}
