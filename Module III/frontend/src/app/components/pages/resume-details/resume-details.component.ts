import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalVariablesService } from 'src/app/global-variables.service';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-resume-details',
  templateUrl: './resume-details.component.html',
  styleUrls: ['./resume-details.component.scss']
})
export class ResumeDetailsComponent implements OnInit {

  experience = 0;

  qualification = "";

  constructor(public global_vars: GlobalVariablesService) { }

  ngOnInit(): void 
  {
    this.calculate_experience();

    this.set_qualification();
  }

  calculate_experience()
  {
    for(let i = 0; i < this.global_vars.work_experience.length; i++)
    {
      let start: number = +this.global_vars.work_experience[i].Starting_Year;
      let end: number = +this.global_vars.work_experience[i].Ending_Year; 

      if (start == NaN)
        start = 0;
      
      if (end == NaN)
        end = 0;

      this.experience += (end- start);
    }
  }


  set_qualification()
  {
    let qualifications = [];
    for(let i = 0; i < this.global_vars.education.length; i++)
    {
      qualifications.push( this.global_vars.education[i].Title );
    }

    this.qualification = qualifications.join(", ");
  }


  title = 'htmlToPDF';
   
  @ViewChild('pdfTable') pdfTable: ElementRef;
   
  // public downloadAsPDF() {
  //   const doc = new jsPDF();
    
  //   const pdfTable = this.pdfTable.nativeElement;
    
  //   var html = htmlToPdfmake(pdfTable.innerHTML);
  //   console.log(html);
  //   const documentDefinition = { content: html };

  //   pdfMake.createPdf(documentDefinition).open(); 
      
  // }

  public convetToPDF()
  {
    var data = document.getElementById('pdfTable');
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 300;
    var pageHeight = 400;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('new-file.pdf'); // Generated PDF
    });
  }
}
