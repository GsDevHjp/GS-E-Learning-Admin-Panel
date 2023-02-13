import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-syllabus',
  templateUrl: './add-syllabus.component.html',
  styleUrls: ['./add-syllabus.component.css']
})
export class AddSyllabusComponent implements OnInit {

  admin = 1;
  imageUrl: string = "";
  // imageUrl:string = 'https://greensoft.net.in/gselearning/assets/'
  files: any
  syllabusForm !: FormGroup;
  university_data: any;
  course_data: any;
  for_heading: string = 'Add Syllabus'
  action_btn: string = 'save'
  syllabusUpdatde = "Update University";


  constructor(
    private FormBuilder: FormBuilder,
    private service: ApiService,
    private route: Router,
    private matref: MatDialogRef<AddSyllabusComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata: any,


  ) {
    this.files = [];
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.service.universityGet().subscribe(
      (res: any) => {
        console.log(res)
        this.university_data = res.data
      }
    )
    this.service.courseGet().subscribe(
      (res: any) => {
        console.log(res)
        this.course_data = res.data
      }
    )
    this.syllabusForm = this.FormBuilder.group({
      syllabus_id: [''],
      syllabus_file: ['', Validators.required],
      syllabus_desc: ['', Validators.required],
      course_name: ['', Validators.required],
      university_id_fk: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    })
    // for editdata form /////
    if (this.editdata) {
      this.action_btn = "Update";
      this.for_heading = "Update Syllabus";
      this.syllabusUpdatde = "Update Syllabus";
      this.syllabusForm.controls['syllabus_id'].setValue(this.editdata.syllabus_id);
      this.syllabusForm.controls['syllabus_file'].setValue(this.editdata.syllabus_file);
      this.syllabusForm.controls['syllabus_desc'].setValue(this.editdata.syllabus_desc);
      this.syllabusForm.controls['course_name'].setValue(this.editdata.course_name);
      this.syllabusForm.controls['university_id_fk'].setValue(this.editdata.university_id);
      this.syllabusForm.controls['admin_id_fk'].setValue(this.editdata.admin_id_fk)
    }
  }


  addsyllabus() {
    if (!this.editdata) {
      if (this.syllabusForm.valid) {
        const formdata = new FormData();
        formdata.append('syllabus_file', this.syllabusForm.get('syllabus_file')?.value)
        formdata.append('syllabus_desc', this.syllabusForm.get('syllabus_desc')?.value)
        formdata.append('course_name', this.syllabusForm.get('course_name')?.value)
        formdata.append('university_id_fk', this.syllabusForm.get('university_id_fk')?.value)
        formdata.append('admin_id_fk', this.syllabusForm.get('admin_id_fk')?.value)
        this.service.post_syllabus(formdata).subscribe(
          (result: any) => {
            this.route.navigate(['/home/syllabus'])
            console.log(result)
            alert('Data Insert Successfully')
            this.matref.close();
          },
          (error: any) => {
            console.log(error)
            alert('Data Not Insert')
          }
        )
      }
    }
    else {
      this.update_syllabus()
    }
  }
  update_syllabus() {
    const formedit = new FormData();
    formedit.append('syllabus_id', this.syllabusForm.get('syllabus_id')?.value)
    formedit.append('syllabus_file', this.syllabusForm.get('syllabus_file')?.value)
    formedit.append('syllabus_desc', this.syllabusForm.get('syllabus_desc')?.value)
    formedit.append('course_name', this.syllabusForm.get('course_name')?.value)
    formedit.append('university_id_fk', this.syllabusForm.get('university_id_fk')?.value)
    formedit.append('admin_id_fk', this.syllabusForm.get('admin_id_fk')?.value)
    this.service.put_Syllabus(formedit).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.matref.close();
        alert('successfully..')
      },
      error:(error:any)=>{
        console.log(error)
        alert('data not update')
      }
    })
  }


  onFileChanged(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.syllabusForm.get('syllabus_file')?.setValue(file);
    }
  }

  reset() {
    this.syllabusForm.reset()
  }

}

