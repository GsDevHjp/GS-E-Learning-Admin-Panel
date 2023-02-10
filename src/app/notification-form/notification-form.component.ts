import { Component, OnInit } from '@angular/core';
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
  dialogRef:any;
  actionBtn: string | undefined;
  editData: any;
  constructor(
    private FormBuilder: FormBuilder,
    private service: ApiService,
  ) {   }

  ngOnInit(): void {
    this.msgForm = this.FormBuilder.group({
      msg: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })   
    // if (this.editData) {
    //   this.actionBtn = 'Update'
    //   this.msgForm.controls['notif_id'].setValue(this.editData.notif_id);
    //   this.msgForm.controls['msg'].setValue(this.editData.msg);
    //   this.msgForm.controls['admin_id_fk'].setValue(this.editData.admin_id_fk);
    // }
  
  }
   

  addmsg(){
    console.log(this.msgForm.value);
    if (!this.editData) {
     if (this.msgForm.valid) {
    this.service.msgPost(this.msgForm.value).subscribe(
      (result:any)=>{
        console.log(result);
        alert("Data Add Successfully");

      },
      (error:any)=>{
        alert("Data Not Insert")
      }
    )
     }
  
  //   else {
  //     this.updateRole()
  //   }
  // }
}

//   updateRole(){
//   if (this.msgForm.valid) {
//     this.service.putnotification(this.msgForm.value).subscribe(
//       (data: any) => {
//         // this.router.navigate(['/manage_role']);
//         // this.addRole.reset();
//         this.matref.close('save');
//         // this.popup.success({detail:'Success',summary:'Role Update Successfully...',sticky:true,position:'tr'})
//       },
//       (error: any) => {
//         console.log(['message']);
//         // this.popup.error({detail:'message',summary:'Role data is not  Update', sticky:true,position:'tr'})        

//       }
//     );
//   }

}
  
  reset(){
    this.msgForm.reset()
  }
}
