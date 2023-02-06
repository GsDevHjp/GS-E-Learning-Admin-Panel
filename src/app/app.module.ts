import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

////////////// for ngx loader///////////

import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

//////////////// Component in this website///////////////////////

import { DashboardComponent } from './dashboard/dashboard.component';
import { MCourseComponent } from './m-course/m-course.component';
import { NotificationComponent } from './notification/notification.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { TopicFormComponent } from './topic-form/topic-form.component';
import { MTopicsComponent } from './m-topics/m-topics.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { AddTopicFormComponent } from './add-topic-form/add-topic-form.component';
import { ManagePptNotesComponent } from './manage-ppt-notes/manage-ppt-notes.component';
import { AddPptNotesComponent } from './add-ppt-notes/add-ppt-notes.component';
import { ManagePdfNotesComponent } from './manage-pdf-notes/manage-pdf-notes.component';
import { AddPdfNotesComponent } from './add-pdf-notes/add-pdf-notes.component';
import { UniversityComponent } from './university/university.component';
import { AddUniversityComponent } from './add-university/add-university.component';
import { PreviousQuestionComponent } from './previous-question/previous-question.component';
import { SyllabusComponent } from './syllabus/syllabus.component';
import { AddSyllabusComponent } from './add-syllabus/add-syllabus.component';
import { AddPreviousQuestionComponent } from './add-previous-question/add-previous-question.component';
import { LoginPageComponent } from './login-page/login-page.component';


///////////////// Use of angular meterial in this website//////////////////

import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { VideoComponent } from './video/video.component';
import { AddVideoComponent } from './add-video/add-video.component';
import { ImgSliderComponent } from './img-slider/img-slider.component';
import { AddSliderComponent } from './add-slider/add-slider.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    DashboardComponent,
    MCourseComponent,
    NotificationComponent,
    CourseFormComponent,
    NotificationFormComponent,
    TopicFormComponent,
    MTopicsComponent,
    EnquiryComponent,
    AddTopicComponent,
    AddTopicFormComponent,
    ManagePptNotesComponent,
    AddPptNotesComponent,
    ManagePdfNotesComponent,
    AddPdfNotesComponent,
    UniversityComponent,
    AddUniversityComponent,
    PreviousQuestionComponent,
    SyllabusComponent,
    AddSyllabusComponent,
    AddPreviousQuestionComponent,
    LoginPageComponent,
    VideoComponent,
    AddVideoComponent,
    ImgSliderComponent,
    AddSliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    BrowserModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatRadioModule,
    MatMenuModule,
    MatDialogModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
