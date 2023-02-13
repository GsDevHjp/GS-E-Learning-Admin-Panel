import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pdf-notes',
  templateUrl: './add-pdf-notes.component.html',
  styleUrls: ['./add-pdf-notes.component.css']
})
export class AddPdfNotesComponent implements OnInit {

  addpdfForm !: FormGroup;
  course_data: any;
  admin = 1;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  files: any
  imageUrl: string = "";
  topicfilter_data: any;
  updatepdf: string = 'Add PDF'
  actionBtn: string = 'Submit'

  constructor(
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private FormBuilder: FormBuilder,
    private matref: MatDialogRef<AddPdfNotesComponent>,
    private service: ApiService,
    private route: Router,
  ) {
    this.files = [];
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    // for course data
    this.service.courseGet().subscribe(
      (res: any) => {
        console.log(res)
        this.course_data = res.data
      }
    )

    this.service.getTopic().subscribe(
      (res: any) => {
        this.topicfilter_data = res.data
      }
    )

    this.addpdfForm = this.FormBuilder.group({
      pdf_id: [''],
      pdf_notes_name: ['', Validators.required],
      pdf_file: ['', Validators.required],
      topics_id_fk: ['', Validators.required],
      course_id_fk: [''],
      admin_id_fk: ['', Validators.required],
    }
    )

    if (this.editdata) {
      console.log(this.editdata)
      this.actionBtn = 'Update';
      this.updatepdf = 'Update PDF';
      this.addpdfForm.controls['pdf_id'].setValue(Number(this.editdata.pdf_id));
      this.addpdfForm.controls['pdf_notes_name'].setValue(this.editdata.pdf_notes_name);
      this.addpdfForm.controls['pdf_file'].setValue(this.editdata.pdf_file);
      this.addpdfForm.controls['topics_id_fk'].setValue(this.editdata.topic_id);
      this.addpdfForm.controls['course_id_fk'].setValue(this.editdata.course_id);
      this.addpdfForm.controls['admin_id_fk'].setValue(this.editdata.admin_id_fk);
    }
  }

  addPpt() {
    if (!this.editdata) {
      const formdata = new FormData();
      formdata.append('pdf_notes_name', this.addpdfForm.get('pdf_notes_name')?.value)
      formdata.append('pdf_file', this.addpdfForm.get('pdf_file')?.value)
      formdata.append('course_id_fk', this.addpdfForm.get('course_id_fk')?.value)
      formdata.append('topics_id_fk', this.addpdfForm.get('topics_id_fk')?.value)
      formdata.append('admin_id_fk', this.addpdfForm.get('admin_id_fk')?.value)
      this.service.post_pdtnotes(formdata).subscribe(
        (result: any) => {
          this.route.navigate(['/home/pdf_notes'])
          console.log(result)
          alert('Data Insert Sucessfully')
          this.matref.close();
        },
        (error: any) => {
          console.log(error)
          alert('Data not insert')
        }
      )

    }

    else {
      this.PdfUpdate()
    }
  }

  PdfUpdate() {
    const updatepdf = new FormData();
    updatepdf.append('pdf_id', this.addpdfForm.get('pdf_id')?.value)
    updatepdf.append('pdf_notes_name', this.addpdfForm.get('pdf_notes_name')?.value)
    updatepdf.append('pdf_file', this.addpdfForm.get('pdf_file')?.value)
    updatepdf.append('course_id_fk', this.addpdfForm.get('course_id_fk')?.value)
    updatepdf.append('topics_id_fk', this.addpdfForm.get('topics_id_fk')?.value)
    updatepdf.append('admin_id_fk', this.addpdfForm.get('admin_id_fk')?.value)
    console.log(this.addpdfForm.value);
    this.service.putPDF(updatepdf).subscribe(
      (result: any) => {
        this.route.navigate(['/home/pdf_notes'])
        console.log(result);
        alert('Data Update Successfully')
        this.matref.close()
      },
      (error: any) => {
        alert('Data Not Update')
      }
    )
  }

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


  onFileChanged(event: any) {
    if (event.target.files) {
      const abc = event.target.files[0];
      console.log(abc)
      this.addpdfForm.get('pdf_file')?.setValue(abc);
    }

  }
  reset() {
    this.addpdfForm.reset()
  }

}