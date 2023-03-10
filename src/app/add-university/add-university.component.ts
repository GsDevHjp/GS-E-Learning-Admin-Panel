import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css']
})
export class AddUniversityComponent implements OnInit {
  admin_id=1;
  files:any
  // imageUrl: string = "";
  adduniversityForm !: FormGroup;
  actionBtn: string = 'save'
  universityUpdatde: string = 'Update University'
  for_heading:string='Add University'
  imageUrl:string ="E:/GS-E-Learning-Admin-Panel/src/assets/upload/"

  

  constructor(
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<AddUniversityComponent>,
    private service: ApiService,
    private route:Router,
    private toast:NgToastService,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
  ) { this.files = []; 
    this.route.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  ngOnInit(): void {
    this.adduniversityForm = this.FormBuilder.group({
      university_id:[''],
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
    if (!this.editdata) {
    const formdata = new FormData();
    formdata.append('university_name', this.adduniversityForm.get('university_name')?.value)
    formdata.append('university_img', this.adduniversityForm.get('university_img')?.value)
    formdata.append('admin_id_fk', this.adduniversityForm.get('admin_id_fk')?.value)
    this.service.post_university(formdata).subscribe(
      (result: any) => {
        this.route.navigate(['/home/university'])
        console.log(result)
       this.toast.success({detail:"Success",summary:'Data Add Successfully...'})
        this.matref.close();
      },
      (error: any) => {
        console.log(error)
        this.toast.error({detail:"Error",summary:'Data not Add..'})
      }
    )
    }
    else {
      this.updateUniver()
    }   
  }

  updateUniver() {
    console.log(this.adduniversityForm.value)
    const updatedata = new FormData();
    // console.log('course' + this.courseForm.get('course_id')?.value)
    updatedata.append('university_id', this.adduniversityForm.get('university_id')?.value)
    updatedata.append('university_name', this.adduniversityForm.get('university_name')?.value)
    updatedata.append('university_img', this.adduniversityForm.get('university_img')?.value)
    updatedata.append('admin_id_fk', this.adduniversityForm.get('admin_id_fk')?.value)
    console.log(this.adduniversityForm.value);
    this.service.put_university(updatedata).subscribe(
      (result: any) => {
        this.route.navigate(['/home/university'])
        console.log(result);
        this.toast.success({detail:"Success",summary:'Data Update Successfully...'})
        this.matref.close();
      },
      (error: any) => {
          this.toast.error({detail:"error",summary:'Data is not Update...'})
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
