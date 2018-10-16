import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { PDFJSStatic } from "pdfjs-dist";
import { Operacao } from './operacao';
import * as moment from 'moment';
import { Taxas } from './resultados/taxas';
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
        return PDFJS.getDocument(typedarray, new Uint8Array(typedarray)).then( pdf => {


            const maxPages = pdf.pdfInfo.numPages;
            const countPromises = []; // collecting all page promises
            
            

            for (let j = 1; j <= maxPages; j++) {
            
               
               const page = pdf.getPage(j);
               const listaDeLinhas = [];
               

               countPromises.push(page.then(function(pageInterno) { // add page promise
                

                    const textContent = pageInterno.getTextContent();
                    

                    return textContent.then(function(text) { // return content promise
                        
                        let listaItens = [];
                        let lastY = -1;                        

                        text.items.forEach(function (i) {
                        

                         // Tracking Y-coord and if changed create new p-tag
                        //  console.log(i.transform);
                         lastY = lastY === -1 ? i.transform[5] : lastY;
                         
                         const novaLinha = lastY !== i.transform[5];

                         if (novaLinha) {
                           // listaDeLinhas.push(i.textContent);
                           lastY = i.transform[5];
                           that.adicioneLinha(listaItens, listaDeLinhas);
                           listaItens = [];
                         }

                         if (that.ehElementoValido(i.str)){
                            listaItens.push(i.str);   
                         }   
                         
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
                // console.log(novalista);
                // console.log();
                const retorno = that.obtenhaListaFormatada(novalista);
                console.log(retorno);
                return retorno;
            });
        });

    }

    ehElementoValido(item: string) {
        return item.trim() !='' 
        && !item.startsWith('PN') 
        && !item.startsWith('01/00') 
        && !item.startsWith('VISTA')
        && !item.startsWith('VISTA')
        && !item.startsWith('EJ')
        && !item.startsWith('N2')
        && !item.startsWith('ON') 
        && item != 'D';
    }

    obtenhaListaFormatada(lista: string[]){
        
        const novaLista = [];
        const indiceData = lista.indexOf("Data pregão") + 1;
        let codigo = Number(lista[indiceData].replace(/\D/g, ''));

        const data = lista[indiceData];

        
        for (let index = 0; index < lista.length; index++) {
            const element = lista[index];
            const arrayElement = element.split(";");
            const quantidade  = arrayElement.length;
            if (this.ehLinhaSwingTrade(element)){
                const operacao = new Operacao();
                codigo += 1;
                operacao.natureza =arrayElement[1];
                operacao.codigo = codigo;
                operacao.data = this.obtenhaDataFormatada(data);
                operacao.empresa = arrayElement[2];
                operacao.quantidade = Number(arrayElement[3].replace(/\D/g, ''));
                operacao.origem = arrayElement;
                ////console.log(arrayElement.length);
                
                if (operacao.empresa == '01/00'){
                    console.log(lista[indiceData -1]);
                    console.log(element);
                    //  console.log(operacao);
                    //  console.log(arrayElement[9]);
                }

                operacao.preco = parseFloat(arrayElement[4].replace(/,/g, '.'));

                operacao.taxas = new Taxas(operacao);
                novaLista.push(operacao);
            }
        }

        return novaLista;
    }

    private obtenhaDataFormatada(value) {
        moment.locale('pt-br');
        return moment(value.substr(0, 10) , 'DD/MM/YYYY');
        // if (value == null || value === ''){
        //     debugger;
        //     console.log('teste');
        // } else {
        // }
      }

    private adicioneLinha(listaItens: any[], listaDeLinhas: any[]) {
        const linha = listaItens.join(';');
        // if (this.ehLinhaSwingTrade(linha)){
        //     listaDeLinhas.push(linha);
        // } else {
        //     console.log(linha);
        // }

        listaDeLinhas.push(linha);

    }

    private ehLinhaSwingTrade(linha: string){
        return linha.indexOf("1-BOVESPA") > -1;
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