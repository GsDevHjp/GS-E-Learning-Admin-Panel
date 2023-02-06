import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.css']
})
export class AddSliderComponent implements OnInit {
  admin = 1;
  sliderForm !: FormGroup;
  upload: any;
  image: any;
  imageUrl: string = "";
  files: any

  constructor(
    private FormBuilder: FormBuilder,
    private service: ApiService,
    private route: Router,
    private matref: MatDialogRef<AddSliderComponent>,
  ) {
    this.files = [];
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.sliderForm = this.FormBuilder.group({
      slider_id: [''],
      slider_text: ['', Validators.required],
      slider_img: [null],
      admin_id_fk: ['', Validators.required],
    })
  }

  addslider() {
    const formdata = new FormData();
    formdata.append('slider_text', this.sliderForm.get('slider_text')?.value)
    formdata.append('slider_img', this.sliderForm.get('slider_img')?.value)
    formdata.append('admin_id_fk', this.sliderForm.get('admin_id_fk')?.value)
    this.service.post_slider(formdata).subscribe(
      (result: any) => {
        this.route.navigate(['/img_slider'])
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

  onFileChanged(event: any) {
    if (event.target.files) {
      const abc = event.target.files[0];
      console.log(abc)
      this.sliderForm.get('slider_img')?.setValue(abc);
    }

  }

  reset() {
    this.sliderForm.reset()
  }

}
