import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hide = true;
  // Adminlogin!: FormGroup
  constructor(
    private router:Router,
    // private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.Adminlogin = this.fb.group({
    //   // username: ['', Validators.required],
    //   // password: ['', Validators.required]
    // })
  }
login(){
  // this.router.navigate(['/home'])
}
}
