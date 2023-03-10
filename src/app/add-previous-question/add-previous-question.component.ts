import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-previous-question',
  templateUrl: './add-previous-question.component.html',
  styleUrls: ['./add-previous-question.component.css']
})
export class AddPreviousQuestionComponent implements OnInit {
  admin = 1;
  imageUrl:string ="E:/GS-E-Learning-Admin-Panel/src/assets/upload/"
  files: any
  previousquestionForm !: FormGroup;
  university_data:any;
  course_data:any;
  actionBtn: string = 'save'
  for_heading:string='Add Previous Question'
  universityUpdatde = "Update Previous Question";

  constructor(
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<AddPreviousQuestionComponent>,
    private service: ApiService,
    private route:Router,
    private toast:NgToastService,
  ) { this.files = [];
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
   }
  }

  ngOnInit(): void {

    // for selecting university

    this.service.universityGet().subscribe(
      (res: any) => {
        console.log(res)
        this.university_data = res.data

      }
    )

    // for selecting course

    this.service.courseGet().subscribe(
      (res: any) => {
        console.log(res)
        this.course_data = res.data

      }
    )

    this.previousquestionForm = this.FormBuilder.group({
      previous_id:[''],
      course_name: ['', Validators.required],
      question_file: ['', Validators.required],
      university_id_fk: ['', Validators.required],
      question_name: ['', Validators.required],
      admin_id_fk: ['', Validators.required],
    }
    )
      // for editdata form /////
      if (this.editdata) {
        console.log(this.editdata.course_name)
        this.actionBtn = "Update";
        this.for_heading ="Update Previous Question";
        this.universityUpdatde = "Update University";
        this.previousquestionForm.controls['previous_id'].setValue(Number(this.editdata.previous_id));
        this.previousquestionForm.controls['course_name'].setValue(this.editdata.course_name);       
        this.previousquestionForm.controls['question_file'].setValue(this.editdata.question_file);
        this.previousquestionForm.controls['university_id_fk'].setValue(this.editdata.university_id);
        this.previousquestionForm.controls['question_name'].setValue(this.editdata.question_name);
        this.previousquestionForm.controls['admin_id_fk'].setValue(this.editdata.admin_id_fk)
      }
  }

  addquestion(){    
    if (!this.editdata) {
      console.log(this.previousquestionForm.value)
    const formdata = new FormData();
    formdata.append('course_name', this.previousquestionForm.get('course_name')?.value)
    formdata.append('question_file', this.previousquestionForm.get('question_file')?.value)
    formdata.append('question_name', this.previousquestionForm.get('question_name')?.value)
    formdata.append('university_id_fk', this.previousquestionForm.get('university_id_fk')?.value)
    formdata.append('admin_id_fk', this.previousquestionForm.get('admin_id_fk')?.value)
    this.service.post_previousques(formdata).subscribe(
      (result: any) => {
        console.log(this.previousquestionForm.value)
        this.route.navigate(['/home/previous_question'])        
        console.log(result)
        this.toast.success({detail:"success",summary:'Data Add Successfully..'})
        this.matref.close();
      },
      (error: any) => {
        console.log(error)
        this.toast.error({detail:"Error", summary:'Data is not Add..'})
       
      }
    )
    }
    
    else {
      this.update_pre()
    }
  } 

   update_pre() {
      console.log(this.previousquestionForm.value)
      const updatedata = new FormData();
      // console.log('course' + this.courseForm.get('course_id')?.value)
      updatedata.append('previous_id', this.previousquestionForm.get('previous_id')?.value)
      updatedata.append('course_name', this.previousquestionForm.get('course_name')?.value)
      updatedata.append('question_file', this.previousquestionForm.get('question_file')?.value)
      updatedata.append('university_id_fk', this.previousquestionForm.get('university_id_fk')?.value)
      updatedata.append('question_name', this.previousquestionForm.get('question_name')?.value)
      updatedata.append('admin_id_fk', this.previousquestionForm.get('admin_id_fk')?.value)
      console.log(this.previousquestionForm.value);
      this.service.put_previous_ques(updatedata).subscribe(
        (result: any) => {
          this.route.navigate(['/home/previous_question']);
          console.log(result);
         this.toast.success({detail:"Success",summary:'Data Add Successfully..'})
          this.matref.close();   
         },
        (error: any) => {
          this.toast.error({detail:"Error",summary:'Data is not Add'})
        }
      )
    }

  onFileChanged(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      this.previousquestionForm.get('question_file')?.setValue(file);
    }
  }

  reset(){
    this.previousquestionForm.reset()
  }
}