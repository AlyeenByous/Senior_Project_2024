import { Component } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfMake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { ApiService } from '../api.service';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';



(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.css'],
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule,
    MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
    MatIconModule, MatButtonModule, MatDividerModule, NgFor, NgIf,
  ]
})


export class BlankPageComponent {
 
  constructor(private apiService: ApiService) {}

  items: any[] = [];
  selectedItemId: string = '';
  selectedItem: any;
  newCertForm: any;

  ngOnInit(): void {
    this.apiService.list().subscribe(items => {
      this.items = items;
    });
  }

  addNewCert(){
    this.selectedItemId="";
    this.selectedItem="";
  }

  onSelectedItemChange(event: any): void {
    const selectedValue = event.target.value;
    console.log("onselecteditemchange", selectedValue);
    this.apiService.getItemById(selectedValue).subscribe(item => {
      this.selectedItem = item;
      console.log("log item", item);
    });
    console.log("after onselecteditemchange", this.selectedItem);
  }
  
  
  generatePDF()
  {

    //https://stackoverflow.com/questions/55019343/how-to-generate-a-pdf-using-angular-7 basically helped me with this with few adjustments.
    let data = <HTMLElement>document.getElementById('exportform');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
      //let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('Cert_Submission.pdf');
    });
  }

  // getItemById() {
  //   if(this.itemId){
  //     this.apiService.getItems().subscribe((response) => {
  //       this.item = response;
  //       console.log(this.item);
  //     });
    // }
  // }


}

