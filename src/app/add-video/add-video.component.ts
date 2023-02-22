import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {
  addvideoForm !: FormGroup
  course_data: any
  admin_id = 1;
  topicfilter_data: any;
  actionBtn:string = 'Save'
  universityUpdatde: string = 'Update University'
  for_heading:string='Add Video'
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private service: ApiService,
    private FormBuilder: FormBuilder,
    private route: Router,
    private toast:NgToastService,
    private matref: MatDialogRef<AddVideoComponent>,
  ) { }

  ngOnInit(): void {
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
    this.addvideoForm = this.FormBuilder.group({
      video_id: [''],
      course_id_fk: ['', Validators.required],
      topics_id_fk: ['', Validators.required],
      video_title: ['', Validators.required],
      video_url: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    }
    )

    if (this.editdata) {
      console.log(this.editdata)
      this.actionBtn = "Update";
      this.for_heading ="Update Video";
      // this.universityUpdatde = "Update University";
      this.addvideoForm.controls['video_id'].setValue(Number(this.editdata.video_id));
      this.addvideoForm.controls['course_id_fk'].setValue(this.editdata.course_id);
      this.addvideoForm.controls['topics_id_fk'].setValue(this.editdata.topic_id);
      this.addvideoForm.controls['video_title'].setValue(this.editdata.video_title);
      this.addvideoForm.controls['video_url'].setValue(this.editdata.video_url);
      this.addvideoForm.controls['admin_id_fk'].setValue(this.editdata.admin_id_fk);
    }   
    
  }

  addvideo() {
    if (!this.editdata) {
      const formdata = new FormData();
      formdata.append('course_id_fk', this.addvideoForm.get('course_id_fk')?.value)
      formdata.append('topics_id_fk', this.addvideoForm.get('topics_id_fk')?.value)
      formdata.append('video_title', this.addvideoForm.get('video_title')?.value)
      formdata.append('video_url', this.addvideoForm.get('video_url')?.value)
      formdata.append('admin_id_fk', this.addvideoForm.get('admin_id_fk')?.value)
      console.log(this.addvideoForm.value);
      this.service.post_video(formdata).subscribe(
        (result: any) => {
          this.route.navigate(['/video'])
          console.log(result)
          this.toast.success({detail:"success",summary:'Data Add Successfully..'})
          this.matref.close();
        },
        (error: any) => {
          this.toast.error({detail:"error",summary:'Data is not Add'})
        }
      )
    }
    else{
      this.videoUpdate()
    }
  }

  videoUpdate(){
    console.log(this.addvideoForm.value)
    this.service.putVideo(this.addvideoForm.value).subscribe(
      (result: any) => {
        console.log(result)
        this.toast.success({detail:"Success",summary:'Data Update Successfully..'})
      },
      (error: any) => {
        this.toast.error({detail:"Error",summary:'Data is not Update'})
      }
    )
  }

  // topic filter data code

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

  resetform() {
    this.addvideoForm.reset();
  }

}
