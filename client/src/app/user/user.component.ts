import { Component, OnInit } from '@angular/core';

import { NavGuard } from '../guards/nav.guard';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: any;

  constructor(private navGuard: NavGuard) { 
  }

  ngOnInit() {
  }

}
