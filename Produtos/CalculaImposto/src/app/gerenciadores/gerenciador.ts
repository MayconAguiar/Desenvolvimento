
import { OperacaoCompleta } from '../negocio/OperacaoCompleta';
import * as moment from 'moment';
import { ItemArquivo } from '../arquivos/itemArquivo';

export class Gerenciador {
    private compra: ItemArquivo[];
    private venda: ItemArquivo[];
    private resultado: OperacaoCompleta[] = [];
    private idsAtivos = [];
    private datasPorAtivo = [];
    private formatoData = 'YYYYMMDD';

    constructor(compra: ItemArquivo[], venda: ItemArquivo[]) {
        this.compra = compra;
        this.venda = venda;
        // console.log('compra');
        // console.log(this.compra);
        // console.log('venda');
        // console.log(this.venda);

        this.ordene();
        this.inicieDados();
    }

    obtenha() {

        const chaves = Object.keys(this.datasPorAtivo).sort((a, b) => a < b? -1 : 1);

        const that = this;
        chaves.forEach(chave => {

            const empresa = chave;
            let operacaoAnterior = new OperacaoCompleta();
            const datas = that.datasPorAtivo[chave].sort((a, b) => a < b? -1 : 1);
            
            datas.forEach(data => {
                // debugger;
                const naoExisteSaidaDaAnterior = operacaoAnterior.entrada !==undefined 
                && operacaoAnterior.entrada.existeValor() 
                && !operacaoAnterior.saida.existeValor();

                if (naoExisteSaidaDaAnterior) {
                    const saidasDoDia = this.venda.filter(x => data === x.Data(this.formatoData) && x.empresa === empresa);
                    operacaoAnterior.processeSaida(saidasDoDia);
                } else {
                    const operacao = new OperacaoCompleta();
                    const entradasDoDia = this.compra.filter(x => data === x.Data(this.formatoData) && x.empresa === empresa);
                    const saidasDoDia = this.venda.filter(x => data === x.Data(this.formatoData) && x.empresa === empresa);
    
                    operacao.processe(entradasDoDia, saidasDoDia, operacaoAnterior);
                    operacaoAnterior = operacao;
                    this.resultado.push(operacao);
                }
            });

        });
        console.log(this.resultado);
        return this.resultado;
    }

    private inicieDados() {
        const operacoes = this.compra.concat(this.venda);

        operacoes.forEach(element => {
            const data = element.data.format(this.formatoData);
            if (this.idsAtivos.indexOf(element.empresa) === -1) {
                this.idsAtivos.push(element.empresa);
                this.datasPorAtivo[element.empresa] = [];
                this.datasPorAtivo[element.empresa].push(data);
            } else if (this.datasPorAtivo[element.empresa].indexOf(data) === -1)  {
                this.datasPorAtivo[element.empresa].push(data);
            }
        });
    }

    private ordene() {
        this.compra = this.compra.sort((a, b) =>
        a.empresa < b.empresa && a.codigo < b.codigo ? -1 : 1);

        this.venda = this.venda.sort((a, b) =>
        a.empresa < b.empresa && a.codigo < b.codigo ? -1 : 1);
    }

    private obtenhaDataFormatada(value) {
        moment.locale('pt-br');
        return moment(value.substr(0, 10) , 'DD/MM/YYYY');
      }
}