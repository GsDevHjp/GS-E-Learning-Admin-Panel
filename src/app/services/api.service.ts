import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  // online
  Url:string = 'https://greensoft.net.in/gselearning/api/'

  // offline
  // Url: string = 'http://localhost/elearning%20api/'

  ////////////////////// for course ////////////////////////////////////


  coursePost(data: any) {
    return this.http.post<any>(this.Url + 'course_insert.php', data);
  }

  courseGet() {
    return this.http.get<any>(this.Url + 'course_view.php',);
  }

  putCourse(data: any) {
    return this.http.post<any>(this.Url + 'course_update.php', data)

  }
  del_course(data:any){
    return this.http.post<any>(this.Url + 'course_del.php',data)
  }
   



  //////////////////////////// for notification ////////////////////////

  msgPost(data: any) {
    return this.http.post<any>(this.Url + 'notification_tbl_insert.php', data);
  }
  msgGet() {
    return this.http.get<any>(this.Url + 'notification_view.php');
  }

  putnotification(data: any) {
    return this.http.post<any>(this.Url + 'notification_update.php', data)

  }

  del_notification(data:any){
    return this.http.post<any>(this.Url + 'notification_del.php',data)
  }



  ////////////////////////////////// for topic/////////////////////////

  post_topic(data: any) {
    return this.http.post<any>(this.Url + 'topic_insert.php', data)
  }

  getTopic() {
    return this.http.get<any>(this.Url + 'topic_view.php');
  }

  putTopic(data: any) {
    return this.http.put<any>(this.Url + 'topic_update.php', data)
  }
  del_topic(data:any){
    return this.http.post<any>(this.Url + 'topic_del.php',data)
  }

  ///////////////////////////////////////// for content ///////////////////////

  postcontent(data: any) {
    return this.http.post<any>(this.Url + 'content_insert.php', data);
  }
  getContent() {
    return this.http.get<any>(this.Url + 'content_view.php');
  }
  putContent(data: any){
    return this.http.post<any>(this.Url + 'update_content.php', data);
  }
  del_content(data:any){
    return this.http.post<any>(this.Url + 'content_del.php',data)
  }
  ///////////////////////////// for ppt notes////////////////////

  post_pptnotes(data: any) {
    return this.http.post<any>(this.Url + 'ppt_notes_insert.php', data);
  }

  pptnotesGet() {
    return this.http.get<any>(this.Url + 'ppt_notes_view.php');
  }

  putPPT(data: any){
    return this.http.post<any>(this.Url + 'update_ppt.php',data)
  }
  del_ppt_notes(data:any){
    return this.http.post<any>(this.Url + 'ppt_notes_del.php',data)
  }


  //////////////// for pdf notes//////////////

  post_pdtnotes(data: any) {
    return this.http.post<any>(this.Url + 'pdf_notes_insert.php', data);
  }

  pdfnotesGet() {
    return this.http.get<any>(this.Url + 'pdf_notes_view.php');
  }

  putPDF(data: any){
    return this.http.post<any>(this.Url + 'update_pdf.php', data);
  }
  del_pdf_notes(data:any){
    return this.http.post<any>(this.Url + 'pdf_notes_del.php',data)
  
  }

  // ////////////////////for university/////////////////

  post_university(data: any) {
    return this.http.post<any>(this.Url + 'university_insert.php', data);
  }

  universityGet() {
    return this.http.get<any>(this.Url + 'university_view.php');
  }
  del_university(data:any){
    return this.http.post<any>(this.Url + 'university_del.php',data)
  
  }
  put_university(data: any){
    return this.http.post<any>(this.Url + 'university_update.php', data);
  }

 

  // ///////for previous question////

  post_previousques(data: any) {
    return this.http.post<any>(this.Url + 'previous_question_insert.php', data);
  }

  previousGet() {
    return this.http.get<any>(this.Url + 'previous_question_view.php');
  }
  del_previous_ques(data:any){
    return this.http.post<any>(this.Url + 'previous_ques_del.php',data)
  
  }
  
  put_previous_ques(data: any){
    return this.http.post<any>(this.Url + 'previous_ques_update.php', data);
  }
  
  

  ////////////////// for syllabus//////////////

  post_syllabus(data: any) {
    return this.http.post<any>(this.Url + 'syllabus_insert.php', data)
  }

  syllabusGet() {
    return this.http.get<any>(this.Url + 'syllabus_view.php')
  }
  del_syllabus(data:any){
    return this.http.post<any>(this.Url + 'syllabus_del.php',data)
  
  }
  put_Syllabus(data: any){
    return this.http.post<any>(this.Url + 'syllabus_update.php', data)
  }

  ///////////////// for video topic/////////////////

  post_video(data: any) {
    return this.http.post<any>(this.Url + 'video_insert.php', data)
  }

  Getvideo() {
    return this.http.get<any>(this.Url + 'video_view.php')
  }

  putVideo(data: any){
    return this.http.put<any>(this.Url + 'video_update.php', data)
  }
  del_video(data:any){
    return this.http.post<any>(this.Url + 'video_del.php',data)
  
  }

  //////////// for slider///////////////

  post_slider(data: any) {
    return this.http.post<any>(this.Url + 'slider_insert.php', data)
  }

  Getslider() {
    return this.http.get<any>(this.Url + 'slider_view.php')
  }
  del_slider(data:any){
    return this.http.post<any>(this.Url + 'slider_del.php',data)
  
  }
  put_slider(data: any){
    return this.http.post<any>(this.Url + 'slider_update.php', data)
  }
 

  /////////////////// for topic filter data /////////////////////////////

  gettopicfilter(data: any) {
    return this.http.post<any>(this.Url + 'topic_filter_data.php', data)

  }
}