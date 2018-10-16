import { Operacao } from '../operacao';
import { OperacaoCompleta } from '../negocio/OperacaoCompleta';
import * as moment from 'moment';

export class Gerenciador {
    private compra: Operacao[];
    private venda: Operacao[];
    private resultado: OperacaoCompleta[] = [];
    private idsAtivos = [];
    private datasPorAtivo = [];

    constructor(compra: Operacao[], venda: Operacao[]) {
        this.compra = compra;
        this.venda = venda;
        console.log('compra');
        console.log(this.compra);
        console.log('venda');
        console.log(this.venda);

        this.ordene();
        this.inicieContaCorrente();
    }

    obtenha() {

        const chaves = Object.keys(this.datasPorAtivo);

        const that = this;
        chaves.forEach(chave => {

            const empresa = chave;
            const operacaoAnterior = new OperacaoCompleta();

            that.datasPorAtivo[chave].forEach(data => {

                const operacao = new OperacaoCompleta();
                const entradasDoDia = this.compra.filter(x => data === x.Data() && x.empresa === empresa);
                const saidasDoDia = this.venda.filter(x => data === x.Data() && x.empresa === empresa);

                operacao.processe(entradasDoDia, saidasDoDia, operacaoAnterior);
                this.resultado.push(operacao);


            });

        });

        return this.resultado;
    }

    private inicieContaCorrente() {
        const operacoes = this.compra.concat(this.venda);

        operacoes.forEach(element => {
            const data = element.data.format('DD/MM/YYYY');
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