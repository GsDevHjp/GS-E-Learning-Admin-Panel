import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { HomeComponent } from './home/home.component';
import { ImgSliderComponent } from './img-slider/img-slider.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MCourseComponent } from './m-course/m-course.component';
import { MTopicsComponent } from './m-topics/m-topics.component';
import { ManagePdfNotesComponent } from './manage-pdf-notes/manage-pdf-notes.component';
import { ManagePptNotesComponent } from './manage-ppt-notes/manage-ppt-notes.component';
import { NotificationComponent } from './notification/notification.component';
import { PreviousQuestionComponent } from './previous-question/previous-question.component';
import { SyllabusComponent } from './syllabus/syllabus.component';
import { UniversityComponent } from './university/university.component';
import { VideoComponent } from './video/video.component';


const routes: Routes = [

  { path: '', component: LoginPageComponent },

  
  {path: 'home', component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent, },
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'manage_course', component: MCourseComponent, },
      { path: 'notification', component: NotificationComponent, },
      { path: 'manage_topics', component: MTopicsComponent, },
      { path: 'enquiry', component: EnquiryComponent },
      { path: 'addtopic', component: AddTopicComponent },
      { path: 'ppt_notes', component: ManagePptNotesComponent },
      { path: 'pdf_notes', component: ManagePdfNotesComponent },
      { path: 'university', component: UniversityComponent },
      { path: 'syllabus', component: SyllabusComponent },
      { path: 'previous_question', component: PreviousQuestionComponent },
      { path: 'video',component:VideoComponent,},
      { path: 'img_slider', component:ImgSliderComponent,},

    ]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

