import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


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
  for_heading:string='Add Slider'
  action_btn: string = 'save'
  sliderUpdatde: string = 'Update Slider'




  constructor(
    private FormBuilder: FormBuilder,
    private service: ApiService,
    private route: Router,
    private toast:NgToastService,
    private matref: MatDialogRef<AddSliderComponent>,
    @Inject(MAT_DIALOG_DATA) public editdata: any,

  ) {
    // this.files = [];
    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }    
  }

  ngOnInit(): void {
    this.sliderForm = this.FormBuilder.group({
      slider_id: [''],
      slider_text: ['', Validators.required],
      slider_img: ['',Validators.required],
      admin_id_fk: ['', Validators.required],
    })    
     // for editdata form /////
     if (this.editdata) {
      this.action_btn = "Update";
      this.for_heading = "Update Slider";
      this.sliderUpdatde = "Update Slider";
      this.sliderForm.controls['slider_id'].setValue(this.editdata.slider_id);
      this.sliderForm.controls['slider_text'].setValue(this.editdata.slider_text);
      this.sliderForm.controls['slider_img'].setValue(this.editdata.slider_img);
      this.sliderForm.controls['admin_id_fk'].setValue(this.editdata.admin_id_fk)
    }
  }

  addslider() {
    if (!this.editdata) {
    const formdata = new FormData();
    formdata.append('slider_text', this.sliderForm.get('slider_text')?.value)
    formdata.append('slider_img', this.sliderForm.get('slider_img')?.value)
    formdata.append('admin_id_fk', this.sliderForm.get('admin_id_fk')?.value)
    this.service.post_slider(formdata).subscribe(
      (result: any) => {
        this.route.navigate(['/home/img_slider'])
        console.log(result)
        this.toast.success({detail:"Success",summary:'Data Add Successfully...'})
        this.matref.close();
      },
      (error: any) => {
        console.log(error)
        this.toast.error({detail:"Error",summary:'Data is not Add..'})
      }
    )
    }
    else {
      this.update_slider()
    } 
  }  
  update_slider() {    
    const updatedata = new FormData();
    updatedata.append('slider_id', this.sliderForm.get('slider_id')?.value)
    updatedata.append('slider_text', this.sliderForm.get('slider_text')?.value)
    updatedata.append('slider_img', this.sliderForm.get('slider_img')?.value)
    updatedata.append('admin_id_fk', this.sliderForm.get('admin_id_fk')?.value)
    this.service.put_slider(updatedata).subscribe({         
          next:(res:any)=>{
            this.route.navigate(['home/img_slider']);
            console.log(res)
            this.matref.close();
            this.toast.success({detail:"Success",summary:'Data is  Update Successfully..'})
          },
          error:(error:any)=>{
            console.log(error)
            this.toast.error({detail:"Error",summary:'Data is not Update.'})
          }
        })
      
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
