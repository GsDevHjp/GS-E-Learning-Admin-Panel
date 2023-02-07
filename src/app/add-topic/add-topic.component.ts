import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent implements OnInit {
  course_data: any;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  addtopicForm !: FormGroup;
  admin = 1;
  topic_pri: any
  actionBtn: string = 'Submit'
  topicUpdatde: string = 'Add Topic'
  constructor(
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<AddTopicComponent>,
    private service: ApiService,
    private route: Router
  ) {
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }

  ngOnInit(): void {  
    // for course data
    this.service.courseGet().subscribe(
      (res: any) => {
        this.course_data = res.data
      }
    )

    this.addtopicForm = this.FormBuilder.group({
      topic_id: [''],
      topics_name: ['', Validators.required],
      course_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
      topic_number: ['']
    }
    )

    if (this.editdata) {
      console.log(this.editdata)
      this.actionBtn = "Update";
      this.topicUpdatde = "Update Topic";
      this.addtopicForm.controls['topic_id'].setValue(Number(this.editdata.topic_id));
      this.addtopicForm.controls['topics_name'].setValue(this.editdata.topics_name);
      this.addtopicForm.controls['topic_number'].setValue(this.editdata.topic_number)
      this.addtopicForm.controls['course_id_fk'].setValue(this.editdata.course_id);
      this.addtopicForm.controls['admin_id_fk'].setValue(this.editdata.admin_id_fk)
    }
  }

  addtopic() {
    if (!this.editdata) {
      this.service.getTopic().subscribe(
        (res: any) => {
          this.topic_pri = Number(res.data[0].topic_number) + Number(1)
          const formdata = new FormData();
          formdata.append('topics_name', this.addtopicForm.get('topics_name')?.value)
          formdata.append('course_id_fk', this.addtopicForm.get('course_id_fk')?.value)
          formdata.append('admin_id_fk', this.addtopicForm.get('admin_id_fk')?.value)
          formdata.append('topic_number', this.topic_pri)
          this.service.post_topic(formdata).subscribe(
            (result: any) => {
              console.log(result)
              alert('Data Insert Successfully')
              this.matref.close();
              this.route.navigate(['/addtopic'])

            },
            (error: any) => {
              alert('Data not insert')
            }
          )
        }
      )
    }
    else {
      this.updatetopic()
    }
  }

  updatetopic() {
    console.log(this.addtopicForm.value)
    this.service.putTopic(this.addtopicForm.value).subscribe(
      (result: any) => {
        console.log(result)
        // this.route.navigate(['/addtopic'])
        alert('Data Update Successfully')
        this.matref.close();
      },
      (error: any) => {
        alert('Data not Update')
      }
    )
  }

  reset(){
    this.addtopicForm.reset()
  }

}


