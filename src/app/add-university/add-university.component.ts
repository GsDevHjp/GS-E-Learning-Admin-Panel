import { Component, OnInit } from '@angular/core';
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
  admin=1;
  files:any
  imageUrl: string = "";
  adduniversityForm !: FormGroup;
  

  constructor(
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<AddUniversityComponent>,
    private service: ApiService,
    private route:Router,
  ) { this.files = []; 
    this.route.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  ngOnInit(): void {
    this.adduniversityForm = this.FormBuilder.group({
      university_name: ['', Validators.required],
      university_img: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    }
    )
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
