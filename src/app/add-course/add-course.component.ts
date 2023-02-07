import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  admin = 1;
  courseForm !: FormGroup;
  upload: any;
  image: any;
  actionBtn: string = 'Save'
  courseUpdatde: string = 'Add Course'
  imageUrl: string = "";
  files: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<AddCourseComponent>,
    private service: ApiService,
    private route: Router
  ) {
    this.files = [];
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }

  ngOnInit(): void {
    this.courseForm = this.FormBuilder.group({
      course_id: [''],
      course_name: ['', Validators.required],
      course_desc: ['', Validators.required],
      course_img: [null],
      admin_id_fk: ['', Validators.required],
    })

    // for editdata form /////
    if (this.editdata) {
      this.actionBtn = "Update";
      this.courseUpdatde = "Update Course";
      this.courseForm.controls['course_id'].setValue(Number(this.editdata.course_id));
      this.courseForm.controls['course_name'].setValue(this.editdata.course_name);
      this.courseForm.controls['course_desc'].setValue(this.editdata.course_desc);
      this.courseForm.controls['course_img'].setValue(this.editdata.course_img);
      this.courseForm.controls['admin_id_fk'].setValue(this.editdata.admin_id_fk)

    }
  }
  addcourse() {
    if (!this.editdata) {
      const formdata = new FormData();
      formdata.append('course_name', this.courseForm.get('course_name')?.value)
      formdata.append('course_desc', this.courseForm.get('course_desc')?.value)
      formdata.append('course_img', this.courseForm.get('course_img')?.value)
      formdata.append('admin_id_fk', this.courseForm.get('admin_id_fk')?.value)
      console.log(this.courseForm.value);
      this.service.coursePost(formdata).subscribe(
        (result: any) => {
          this.route.navigate(['manage_course'])
          console.log(result);
          alert("Data add successfully");
          this.matref.close();
        },

      )
    }
    else {
      this.updateCourse()
    }
  }

  updateCourse() {
    const updatedata = new FormData();
    // console.log('course' + this.courseForm.get('course_id')?.value)

    updatedata.append('course_id', this.courseForm.get('course_id')?.value)
    updatedata.append('course_name', this.courseForm.get('course_name')?.value)
    updatedata.append('course_desc', this.courseForm.get('course_desc')?.value)
    updatedata.append('course_img', this.courseForm.get('course_img')?.value)
    updatedata.append('admin_id_fk', this.courseForm.get('admin_id_fk')?.value)
    console.log(this.courseForm.value);
    this.service.putCourse(updatedata).subscribe(
      (result: any) => {
        this.route.navigate(['/manage_course'])
        console.log(result);
        alert("Data Update successfully");
        this.matref.close();
      },
      (error: any) => {
        alert('Data not Update')
      }
    )
  }

  reset() {
    this.courseForm.reset()
  }

  onFileChanged(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.courseForm.get('course_img')?.setValue(file);
    }

  }

}


