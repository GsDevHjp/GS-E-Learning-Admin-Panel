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
  constructor(
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<NotificationFormComponent>,
    private service: ApiService,
  ) { }

  ngOnInit(): void {
    this.msgForm = this.FormBuilder.group({
      msg: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
  }

  addmsg(){
    console.log(this.msgForm.value);
    this.service.msgPost(this.msgForm.value).subscribe(
      (result:any)=>{
        console.log(result);
        alert("Data Add Successfully");
        this.matref.close();
      },
      (error:any)=>{
        alert("Data Not Insert")
      }
    )
  }
  
  reset(){
    this.msgForm.reset()
  }
}
