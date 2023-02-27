import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {
  admin_id: number = 1;
  contentForm !: FormGroup;
  course_data: any;
  topicfilter_data: any;
  // imageUrl: string = 'https://greensoft.net.in/gselearning/assets/';
  imageUrl: string = '/gselearning/assets/';


  actionBtn: string = 'Save'
  contentUpdate: string = 'Add Content'
  constructor(
    private Form: FormBuilder,
    private matref: MatDialogRef<AddContentComponent>,
    private service: ApiService,
    private router: Router,
    private toast:NgToastService,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
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

    //////////////// for course data///////////////

    this.contentForm = this.Form.group({
      content_id: [''],
      content_heading: ['', Validators.required],
      englishcontent: ['', Validators.required],
      hindicontent: ['', Validators.required],
      urducontent: ['', Validators.required],
      hinglishcontent: ['', Validators.required],
      content_image: ['', Validators.required],
      course_id_fk: ['', Validators.required],
      topics_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    }
    )

    if (this.editdata) {
      console.log(this.editdata)
      this.actionBtn = 'Update';
      this.contentUpdate = 'Update Content';
      this.contentForm.controls['content_id'].setValue(Number(this.editdata.content_id));
      this.contentForm.controls['content_heading'].setValue(this.editdata.content_heading);
      this.contentForm.controls['englishcontent'].setValue(this.editdata.englishcontent);
      this.contentForm.controls['hindicontent'].setValue(this.editdata.hindicontent);
      this.contentForm.controls['urducontent'].setValue(this.editdata.urducontent);
      this.contentForm.controls['hinglishcontent'].setValue(this.editdata.hinglishcontent);
      this.contentForm.controls['content_image'].setValue(this.editdata.content_image);
      this.contentForm.controls['course_id_fk'].setValue(this.editdata.course_id);
      this.contentForm.controls['topics_id_fk'].setValue(this.editdata.topic_id);
      this.contentForm.controls['admin_id_fk'].setValue(this.editdata.admin_id_fk);
    }
  }

  addtopic() {
    if (!this.editdata) {
      if (this.contentForm.valid) {
        const conformdata = new FormData();
        conformdata.append('content_heading', this.contentForm.get('content_heading')?.value)
        conformdata.append('englishcontent', this.contentForm.get('englishcontent')?.value)
        conformdata.append('urducontent', this.contentForm.get('urducontent')?.value)
        conformdata.append('hinglishcontent', this.contentForm.get('hinglishcontent')?.value)
        conformdata.append('hindicontent', this.contentForm.get('hindicontent')?.value)
        conformdata.append('content_image', this.contentForm.get('content_image')?.value)
        conformdata.append('course_id_fk', this.contentForm.get('course_id_fk')?.value)
        conformdata.append('topics_id_fk', this.contentForm.get('topics_id_fk')?.value)
        conformdata.append('admin_id_fk', this.contentForm.get('admin_id_fk')?.value)
        this.service.postcontent(conformdata).subscribe(
          (result: any) => {
            this.router.navigate(['/home/manage_content'])
            console.log(result)
            this.toast.success({detail:"Success",summary:'Data Add successfully...'})
            this.matref.close();
          },
          (error: any) => {
            console.log(error)
            this.toast.error({detail:"Error",summary:'Data is not Add'})
          
          }
        )
      }
    }
    else {
      this.Updatecontent()
    }
  }
  Updatecontent() {
    console.log(this.contentForm.get('content_id')?.value)
    const updatedata = new FormData();
    updatedata.append('content_id', this.contentForm.get('content_id')?.value);
    updatedata.append('content_heading', this.contentForm.get('content_heading')?.value)
    updatedata.append('englishcontent', this.contentForm.get('englishcontent')?.value)
    updatedata.append('urducontent', this.contentForm.get('urducontent')?.value)
    updatedata.append('hinglishcontent', this.contentForm.get('hinglishcontent')?.value)
    updatedata.append('hindicontent', this.contentForm.get('hindicontent')?.value)
    updatedata.append('content_image', this.contentForm.get('content_image')?.value)
    updatedata.append('course_id_fk', this.contentForm.get('course_id_fk')?.value)
    updatedata.append('topics_id_fk', this.contentForm.get('topics_id_fk')?.value)
    updatedata.append('admin_id_fk', this.contentForm.get('admin_id_fk')?.value)
    this.service.putContent(updatedata).subscribe({
      next:(result:any)=>{
        console.log(result)
        this.toast.success({detail:"Success",summary:'data Update successfully.....'})
      },
      error:(error:any)=>{
        console.log(error)
        this.toast.error({detail:"Error",summary:'data not Update.....'})
      }
    })
  }


  ////////////// for filter topic name while choosing course ////////////////
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


  ////////////// for filter topic name while choosing course ////////////////

  ImageUpload(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.contentForm.get('content_image')?.setValue(file);
      console.log(file)
    }

  }

}


