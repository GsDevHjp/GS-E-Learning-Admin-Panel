import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { HomeComponent } from './home/home.component';
import { ImgSliderComponent } from './img-slider/img-slider.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { ManagePdfNotesComponent } from './manage-pdf-notes/manage-pdf-notes.component';
import { ManagePptNotesComponent } from './manage-ppt-notes/manage-ppt-notes.component';
import { ManageTopicComponent } from './manage-topic/manage-topic.component';
import { NotificationComponent } from './notification/notification.component';
import { PreviousQuestionComponent } from './previous-question/previous-question.component';
import { SyllabusComponent } from './syllabus/syllabus.component';
import { UniversityComponent } from './university/university.component';
import { VideoComponent } from './video/video.component';
import { ManageContentComponent } from './manage-content/manage-content.component';


const routes: Routes = [

  { path: '', component: LoginPageComponent },

  
  {path: 'home', component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent, },
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'notification', component: NotificationComponent, },
      { path: 'enquiry', component: EnquiryComponent },
      { path: 'ppt_notes', component: ManagePptNotesComponent },
      { path: 'pdf_notes', component: ManagePdfNotesComponent },
      { path: 'university', component: UniversityComponent },
      { path: 'syllabus', component: SyllabusComponent },
      { path: 'previous_question', component: PreviousQuestionComponent },
      { path: 'video',component:VideoComponent,},
      { path: 'img_slider', component:ImgSliderComponent,},
      {path:'manage_course',component:ManageCourseComponent},
      {path:'manage_topic',component:ManageTopicComponent},
      {path:'manage_content',component:ManageContentComponent},

    ]

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

