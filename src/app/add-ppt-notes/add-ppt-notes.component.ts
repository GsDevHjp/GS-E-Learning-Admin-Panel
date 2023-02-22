import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-ppt-notes',
  templateUrl: './add-ppt-notes.component.html',
  styleUrls: ['./add-ppt-notes.component.css']
})
export class AddPptNotesComponent implements OnInit {

  addpptForm !: FormGroup;
  course_data: any;
  admin = 1;
  files: any
  imageUrl:string ="E:/GS-E-Learning-Admin-Panel/src/assets/upload/"
  topicfilter_data: any;
  actionBtn: string = 'Submit'
  pptUpdate: string = "Add PPT"

  constructor(
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<AddPptNotesComponent>,
    private service: ApiService,
    private route: Router,
    private toast:NgToastService
  ) {
    this.files = [];
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

    this.service.getTopic().subscribe(
      (res: any) => {
        this.topicfilter_data = res.data

      }
    )

    this.addpptForm = this.FormBuilder.group({
      ppt_notes_id: [''],
      ppt_notes_name: ['', Validators.required],
      ppt_file: ['', Validators.required],
      topics_id_fk: ['', Validators.required],
      course_id_fk: [''],
      admin_id_fk: ['', Validators.required],
    }
    )

    if (this.editdata) {
      console.log(this.editdata)
      this.actionBtn = "Update";
      this.pptUpdate = "Update PPT";
      this.addpptForm.controls['ppt_notes_id'].setValue(Number(this.editdata.ppt_notes_id));
      this.addpptForm.controls['ppt_notes_name'].setValue(this.editdata.ppt_notes_name);
      this.addpptForm.controls['ppt_file'].setValue(this.editdata.ppt_file);
      this.addpptForm.controls['topics_id_fk'].setValue(this.editdata.topic_id);
      this.addpptForm.controls['course_id_fk'].setValue(this.editdata.course_id);
      this.addpptForm.controls['admin_id_fk'].setValue(this.editdata.admin_id_fk);
    }
  }

  addPpt() {
    if (!this.editdata) {
      const formdata = new FormData();
      formdata.append('ppt_notes_name', this.addpptForm.get('ppt_notes_name')?.value)
      formdata.append('ppt_file', this.addpptForm.get('ppt_file')?.value)
      formdata.append('course_id_fk', this.addpptForm.get('course_id_fk')?.value)
      formdata.append('topics_id_fk', this.addpptForm.get('topics_id_fk')?.value)
      formdata.append('admin_id_fk', this.addpptForm.get('admin_id_fk')?.value)
      this.service.post_pptnotes(formdata).subscribe(
        (result: any) => {
          this.route.navigate(['/home/ppt_notes'])
          console.log(result)
          this.toast.success({detail:"Success", summary:'Data Add successfully....'})
          this.matref.close();
        },
        (error: any) => {
          console.log(error)
          this.toast.error({detail:"Error",summary:'Data is not Add..'})
          
        }
      )
    }
    else {
      this.UpdatePPT()
    }
  }

  UpdatePPT() {
    const updateppt = new FormData();
    // console.log(this.addpptForm.get('topics_id_fk')?.value)
    updateppt.append('ppt_notes_id', this.addpptForm.get('ppt_notes_id')?.value)
    updateppt.append('ppt_notes_name', this.addpptForm.get('ppt_notes_name')?.value)
    updateppt.append('ppt_file', this.addpptForm.get('ppt_file')?.value)
    updateppt.append('course_id_fk', this.addpptForm.get('course_id_fk')?.value)
    updateppt.append('topics_id_fk', this.addpptForm.get('topics_id_fk')?.value)
    updateppt.append('admin_id_fk', this.addpptForm.get('admin_id_fk')?.value)
    console.log(this.addpptForm.value);
    this.service.putPPT(updateppt).subscribe(
      (result: any) => {
        this.route.navigate(['/home/ppt_notes'])
        console.log(result);
        this.toast.success({detail:"Success",summary:'Data Update successfully...'})
        this.matref.close();
      },
      (error: any) => {
        this.toast.error({detail:"Error",summary:'Data is not Update'})
      }
    )

  }

  // for topic filter

  getCourse(event: any) {
    const topicformdata = new FormData();
    topicformdata.append('course_id', event)

    this.service.gettopicfilter(topicformdata).subscribe(
      (res: any) => {
        console.log(res.data)
        this.topicfilter_data = res.data
      }
    )
  }

  onFileChanged(event: any) {
    if (event.target.files) {
      const abc = event.target.files[0];
      console.log(abc)
      this.addpptForm.get('ppt_file')?.setValue(abc);
    }

  }
  reset() {
    this.addpptForm.reset()
  }
}
