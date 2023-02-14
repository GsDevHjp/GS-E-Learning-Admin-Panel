import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  total_course:number= 0;
  total_content:number= 0;
  total_noti:number= 0;
  all_topics:number=0;
  all_content:number=0;
  all_ppt_notes:number=0;
  all_pdf_notes:number=0;
  all_university:number=0;
  all_syllabus:number=0;
  all_previous_question:number=0;
  all_video:number=0;
  all_img_slider:number=0;

  constructor(
    private api:ApiService
  ) {
       }


  ngOnInit(): void {

    /////////////// for course view/////////////////////

    this.api.courseGet().subscribe(
      (res:any)=>{
        this.total_course= res.data.length
      }
    ) 

    //////////// for topic view//////////////////////////

    this.api.getTopic().subscribe(
      (res:any)=>{
        this.all_topics= res.data.length
      }
    ) 

    ///////////// for content view//////////////////

    this.api.getContent().subscribe(
      (res:any)=>{
        this.all_content= res.data.length
      }
    ) 

    ///////////// for ppt notes view//////////////

    this.api.pptnotesGet().subscribe(
      (res:any)=>{
        this.all_ppt_notes= res.data.length
      }
    ) 

    ///////////// for video view//////////////

    this.api.Getvideo().subscribe(
      (res:any)=>{
        this.all_video= res.data.length
      }
    ) 

    ///////////// for syllabus view//////////////

    this.api.syllabusGet().subscribe(
      (res:any)=>{
        this.all_syllabus= res.data.length
      }
    )
    
    // /////// for previous//////////////////
       this.api.previousGet().subscribe(
        (res:any)=>{
          this.all_previous_question = res.data.lenght
        }
       )

    //////////// for slider////////////////

    this.api.Getslider().subscribe(
      (res:any)=>{
        this.all_img_slider= res.data.length
      }
    ) 

    ///////////// for pdf notes view//////////////

    this.api.pdfnotesGet().subscribe(
      (res:any)=>{
        this.all_pdf_notes= res.data.length
      }
    ) 

    ///////////////// for university//////////
    this.api.universityGet().subscribe(
      (res:any)=>{
        this.all_university= res.data.length
      }
    ) 

  //////////////// For Notification view//////////////////////////

    this.api.msgGet().subscribe(
      (res:any)=>{
        this.total_noti= res.data.length
      }
    ) 
  }

}
