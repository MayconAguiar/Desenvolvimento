import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { PDFJSStatic } from 'pdfjs-dist';
import { Operacao } from './operacao';
import * as moment from 'moment';
import { Taxas } from './resultados/taxas';
import { Tipos } from './tipos.enum';
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

        const that = this;

        if (index < files.length) {

             const file: File = files.item(index);
             const reader: FileReader = new FileReader();
             // reader.readAsArrayBuffer(file);
             

             reader.onload = (event: any) => {
                 const typedarray = event.target.result;

                this.ObtenhaDocumento(PDFJS, typedarray).then(texts => {
                    for (let y = 0; y < texts.length; y++) {
                        const element = texts[y];
                        that.lista.push(element);
                    }
                    index += 1;
                    //debugger;
                    this.leiaArquivo(files, index, observer);
                });
             };

            reader.readAsArrayBuffer(file);
        } else {
             observer.next(this.lista);
             console.log('lista com todos');
             console.log(this.lista);
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
                let novalista = [];

                for (let i = 0; i < listas.length; i++) {
                    const pagina = listas[i];
                    
                    // console.log('pagina de dados');
                    // console.log(pagina);
                    const listaDeAcoes = that.obtenhaListaFormatada(pagina);
                    // console.log('lista de acoes');
                    // console.log(listaDeAcoes);
                    listaDeAcoes.forEach(x => novalista.push(x));
                }
                
                return novalista;
            });
        });

    }

    ehElementoValido(item: string) {
        return item.trim() !== '';
    }

    obtenhaListaFormatada(lista: string[]) {

        const novaLista = [];
        const indiceData = lista.indexOf('Data pregão') + 1;
        let codigo = Number(lista[indiceData].replace(/\D/g, ''));

        const data = lista[indiceData];


        for (let index = 0; index < lista.length; index++) {
            const element = lista[index];
            const arrayElement = element.split(';');
            const tipo = this.ObtenhaTipo(element);


            if (tipo === Tipos.NAO_ATENDIDO) {
                // console.log('tipo não atendido:');
                // console.log(element);
                continue;
            }

            const operacao = new Operacao();

            codigo += 1;
            operacao.natureza = arrayElement[1];
            operacao.codigo = codigo;
            operacao.data = this.obtenhaDataFormatada(data);
            operacao.origem = arrayElement;
            const ultimoElemento = arrayElement.length - 1;
            switch (tipo) {
                case Tipos.SWING_TRADE:
                    operacao.empresa = arrayElement[4].split(" ")[0];
                    operacao.quantidade = Number(arrayElement[ultimoElemento -3].replace(/\D/g, ''));
                    operacao.preco = parseFloat(arrayElement[ultimoElemento -2].replace(/,/g, '.'));
                    break;
                case Tipos.OPCOES:
                    operacao.empresa = arrayElement[4].split(" ")[0];
                    operacao.quantidade = Number(arrayElement[ultimoElemento -3].replace(/\D/g, ''));
                    operacao.preco = parseFloat(arrayElement[ultimoElemento -2].replace(/,/g, '.'));
                    break;
                default:
                    break;
            }

            operacao.taxas = new Taxas(operacao);
             //if(operacao.empresa =='BRASIL') {                
                 novaLista.push(operacao);
             //} 
            //  else {
            //      console.log('empresa diferente:');
            //      console.log(operacao);
            //  }
            // novaLista.push(operacao);
        }
        // console.log('lista onde deve ter todos:');
        // console.log(novaLista);
        return novaLista;
    }

    private obtenhaDataFormatada(value) {
        moment.locale('pt-br');
        return moment(value.substr(0, 10) , 'DD/MM/YYYY');
    }

    private adicioneLinha(listaItens: any[], listaDeLinhas: any[]) {
        const linha = listaItens.join(';');
        listaDeLinhas.push(linha);

    }

    private ObtenhaTipo(linha: string) {
        let tipo = Tipos.NAO_ATENDIDO;

        if (linha.indexOf('1-BOVESPA') > -1) {
            tipo =  linha.indexOf('OPCAO DE COMPRA') > -1 || 
            linha.indexOf('OPCAO DE VENDA') > -1 ? Tipos.OPCOES : Tipos.SWING_TRADE;
        }

        return tipo;
    }
}