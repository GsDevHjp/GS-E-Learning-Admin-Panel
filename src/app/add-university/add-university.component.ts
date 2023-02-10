import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {
  admin_id=1;
  files:any
  imageUrl: string = "";
  adduniversityForm !: FormGroup;
  actionBtn: string = 'save'
  universityUpdatde: string = 'Update University'
  for_heading:string='Add University'
  

  constructor(
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<AddUniversityComponent>,
    private service: ApiService,
    private route:Router,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
  ) { this.files = []; 
    this.route.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  ngOnInit(): void {
    this.adduniversityForm = this.FormBuilder.group({
      university_id:['',Validators.required],
      university_name: ['', Validators.required],
      university_img: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    }
    )
     // for editdata form /////
     if (this.editdata) {
      this.actionBtn = "Update";
      this.for_heading ="Update University";
      this.universityUpdatde = "Update University";
      this.adduniversityForm.controls['university_id'].setValue(Number(this.editdata.university_id));
      this.adduniversityForm.controls['university_name'].setValue(this.editdata.university_name);
      this.adduniversityForm.controls['university_img'].setValue(this.editdata.university_img);
      this.adduniversityForm.controls['admin_id_fk'].setValue(this.editdata.admin_id_fk)
    }
  }

  adduniversity(){
    const formdata = new FormData();
    formdata.append('university_name', this.adduniversityForm.get('university_name')?.value)
    formdata.append('university_img', this.adduniversityForm.get('university_img')?.value)
    formdata.append('admin_id_fk', this.adduniversityForm.get('admin_id_fk')?.value)
    this.service.post_university(formdata).subscribe(
      (result: any) => {
        this.route.navigate(['/university'])
        console.log(result)
        alert('Data Insert Sucessfully')
        this.matref.close();
      },
      (error: any) => {
        console.log(error)
        alert('data not insert')
      }
    )
    // else {
    //   this.updateCourse()
    // }   
  }
  updateCourse() {
    console.log(this.adduniversityForm.value)

    const updatedata = new FormData();
    // console.log('course' + this.courseForm.get('course_id')?.value)

    updatedata.append('course_id', this.adduniversityForm.get('course_id')?.value)
    updatedata.append('course_name', this.adduniversityForm.get('course_name')?.value)
    updatedata.append('course_desc', this.adduniversityForm.get('course_desc')?.value)
    updatedata.append('course_img', this.adduniversityForm.get('course_img')?.value)
    updatedata.append('admin_id_fk', this.adduniversityForm.get('admin_id_fk')?.value)
    console.log(this.adduniversityForm.value);
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

    onFileChanged(event: any) {
    if (event.target.files) {
      const abc = event.target.files[0];
      console.log(abc)
      this.adduniversityForm.get('university_img')?.setValue(abc);
    }

  }
  reset(){
    this.adduniversityForm.reset()
  } 

}
