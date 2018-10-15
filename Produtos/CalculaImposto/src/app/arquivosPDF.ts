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

        PDFJS.GlobalWorkerOptions.workerSrc = '../assets/pdf.worker.min.js';

        if (index < files.length) {

             const file: File = files.item(index);
             const reader: FileReader = new FileReader();
             // reader.readAsArrayBuffer(file);
             const that = this;

             reader.onload = (event: any) => {
                 const typedarray = event.target.result;

                this.ObtenhaDocumento(PDFJS, typedarray).then(texts => {
                    for (let y = 0; y < texts.length; y++) {
                        const element = texts[y];
                        this.lista.push(element);
                    }
                    index += 1;
                    this.leiaArquivo(files, index, observer);
                });



             };

            reader.readAsArrayBuffer(file);
        } else {
             observer.next(this.lista);
             observer.complete();
        }
    }

    private ObtenhaDocumento(PDFJS, typedarray) {
        const that = this;
        return PDFJS.getDocument(typedarray).then( pdf => {


            const maxPages = pdf.pdfInfo.numPages;
            const countPromises = []; // collecting all page promises
            const listaDeLinhas = [];
            let lastY = -1;

            for (let j = 1; j <= maxPages; j++) {
            
                
               const page = pdf.getPage(j);

               countPromises.push(page.then(function(pageInterno) { // add page promise
                

                    const textContent = pageInterno.getTextContent();

                    return textContent.then(function(text) { // return content promise
                        
                        let listaItens = [];

                        text.items.forEach(function (i) {

                         // Tracking Y-coord and if changed create new p-tag
                         lastY = lastY === -1 ? i.transform[5] : lastY;
                         const novaLinha = lastY !== i.transform[5];

                         if (novaLinha) {
                           // listaDeLinhas.push(i.textContent);
                           lastY = i.transform[5];
                           that.adicioneLinha(listaItens, listaDeLinhas);
                           listaItens = [];
                         }

                         listaItens.push(i.str);
                       });

                       that.adicioneLinha(listaItens, listaDeLinhas);

                       return listaDeLinhas;
                   });

               }));
            }
            // Wait for all pages and join text
            return Promise.all(countPromises).then(function (listas) {
                const novalista = [];

                for (let i = 0; i < listas.length; i++) {
                    const lista = listas[i];
                    for (let j = 0; j < lista.length; j++) {
                        const element = lista[j];
                        novalista.push(element);
                    }
                }
                console.log(listas);
                console.log(novalista);
            });
        });

    }

    private adicioneLinha(listaItens: any[], listaDeLinhas: any[]) {
        const linha = listaItens.join(' ');
        listaDeLinhas.push(linha);
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