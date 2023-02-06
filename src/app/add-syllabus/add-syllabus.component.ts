import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
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
  university_data:any;

  constructor(
    private FormBuilder:FormBuilder,
    private service: ApiService,
    private route:Router,
    private matref: MatDialogRef<AddSyllabusComponent>,
  ) { 
    this.files = []
    this.route.routeReuseStrategy.shouldReuseRoute = function(){
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
      this.syllabusForm = this.FormBuilder.group({
        university_id_fk:['', Validators.required],
        syllabus_file:['', Validators.required],
        syllabus_desc:['',Validators.required],
        course_name:['',Validators.required],
        admin_id_fk:['',Validators.required],
      })
    
  }


  addsyllabus(){
    const formdata = new FormData();
    formdata.append('university_id_fk', this.syllabusForm.get('university_id_fk')?.value)
    formdata.append('syllabus_file', this.syllabusForm.get('syllabus_file')?.value)
    formdata.append('syllabus_desc', this.syllabusForm.get('syllabus_desc')?.value)
    formdata.append('course_name',this.syllabusForm.get('course_name')?.value)
    formdata.append('admin_id_fk', this.syllabusForm.get('admin_id_fk')?.value)
    this.service.post_syllabus(formdata).subscribe(
      (result: any) => {
        this.route.navigate(['/syllabus'])
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

  onFileChanged(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.syllabusForm.get('syllabus_file')?.setValue(file);
    }
  }

  reset(){
    this.syllabusForm.reset()
  }

}
