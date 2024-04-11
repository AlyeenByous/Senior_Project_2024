import { Component } from '@angular/core';
// import * as pdfMake from "pdfmake/build/pdfMake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { BlankPageComponent } from './blank-page/blank-page.component';
import {parse} from 'node-html-parser';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { ApiService } from './api.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'cert_submit_page';

  data: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getItems().subscribe((response) => {
      this.data = response;
      console.log(this.data);
    });
  }

}
