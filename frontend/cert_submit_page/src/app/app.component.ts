import { Component } from '@angular/core';
// import * as pdfMake from "pdfmake/build/pdfMake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { parse } from 'node-html-parser';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { ApiService } from './api.service';



import { BlankPageComponent } from './blank-page/blank-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'cert_submit_page';

  data: any;
  idItem:any;
  certs: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getItems().subscribe((response) => {
      this.data = response;
      console.log(this.data);
    });
    this.apiService.getItemById("i8299d").subscribe((response) => {
      this.idItem = response;
      console.log(this.idItem);
    })
    this.apiService.list().subscribe((response) => {
      this.certs = response;
      console.log(this.certs);
    })
  }

}
