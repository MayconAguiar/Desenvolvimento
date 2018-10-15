import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { PDFJSStatic } from "pdfjs-dist";
declare var require: any;

export class ArquivosPDF {
    private lista = [];
    
    

    constructor() {
    }

    obtenhaLista(files: FileList) {
        return new Observable<any>(observer => this.leiaArquivo(files, 0, observer));
    }

    private leiaArquivo(files, index, observer: Subscriber<any>) {
        const PDFJS: PDFJSStatic = require('pdfjs-dist');
        debugger;
        
        // PDFJS.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.entry.js';
        PDFJS.GlobalWorkerOptions.workerSrc = '../assets/pdf.worker.min.js';

        // if (index < files.length) {
        //     const file: File = files.item(index);
        //     const reader: FileReader = new FileReader();
        //     reader.readAsText(file);
        //     const that = this;
        //     reader.onload = (e) => {
        //         debugger;
        //         const linha = reader.result;
        //         index += 1;
        //         this.lista.push(that.csvJSON(linha));
        //         this.leiaArquivo(files, index, observer);
        //     };
        // } else {
        //     observer.next(this.lista);
        //     observer.complete();
        // }
        // PDFJS.workerSrc = '/static/js/pdf.worker.js';

        if (index < files.length) {

             const file: File = files.item(index);
             const reader: FileReader = new FileReader();
             // reader.readAsArrayBuffer(file);
             const that = this;

             reader.onload = (event: any) => {
                 debugger;
                 const typedarray = event.target.result;
                 //const typedarray = new Uint8Array(event.target.result);

                 PDFJS.getDocument(typedarray).then((pdf) => {
                     debugger;
                    console.log(pdf);
                    index += 1;
                    this.leiaArquivo(files, index, observer);
                 });
                 
                 
                 //// this.lista.push(that.csvJSON(linha));

             };

            reader.readAsArrayBuffer(file);
        } else {
             observer.next(this.lista);
             observer.complete();
        }
    }

    private csvJSON(csv) {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(';');

        for (let i = 1; i < lines.length; i++) {
          const obj = {};
          if (lines[i] !== '') {
            const currentline = lines[i].split(';');

            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
            }

            result.push(obj);
          }
        }

        return JSON.stringify(result);
      }
}