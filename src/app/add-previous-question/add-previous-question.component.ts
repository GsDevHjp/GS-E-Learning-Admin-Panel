import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-previous-question',
  templateUrl: './add-previous-question.component.html',
  styleUrls: ['./add-previous-question.component.css']
})
export class AddPreviousQuestionComponent implements OnInit {
  admin = 1;
  imageUrl: string = "";
  files: any
  previousquestionForm !: FormGroup;
  university_data:any;
  course_data:any;

  constructor(
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<AddPreviousQuestionComponent>,
    private service: ApiService,
  ) { this.files = []; }

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
  }

  addquestion(){
    const formdata = new FormData();
    formdata.append('course_name', this.previousquestionForm.get('course_name')?.value)
    formdata.append('question_file', this.previousquestionForm.get('question_file')?.value)
    formdata.append('question_name', this.previousquestionForm.get('question_name')?.value)
    formdata.append('university_id_fk', this.previousquestionForm.get('university_id_fk')?.value)
    formdata.append('admin_id_fk', this.previousquestionForm.get('admin_id_fk')?.value)
    this.service.post_previousques(formdata).subscribe(
      (result: any) => {
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
      const file = event.target.files[0];
      this.previousquestionForm.get('question_file')?.setValue(file);
    }
  }

  reset(){
    this.previousquestionForm.reset()
  }
}