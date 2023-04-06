import { Component, Input, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  constructor(private authService: AuthService) { }
  isTabCaching: boolean = false;
  textProp = 'Paul';
  big = {a: 1};

  ngOnInit(): void {
  }

  changeProp() {
    this,this.textProp = 'newValue';
    
  }

}
