import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
//import * as logo from './mylogo.js';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  private toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      XLSX.writeFile(workbook, this.toExportFileName(excelFileName));
  }
}
