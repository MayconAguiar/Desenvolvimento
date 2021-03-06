import { Papel } from './Papel';
import { ItemArquivo } from '../arquivos/itemArquivo';
import { Tipos } from '../tipos.enum';
import moment = require('moment');

export class EntradaOuSaida {

    public papeis: Papel[] = [];
    public operacao: ItemArquivo[];
    public data: moment.Moment;
    public tipo: Tipos;
    public count = 0;
    private valor = 0;

    quantidade = 0;

    constructor(operacao: ItemArquivo[]) {
        this.operacao = operacao;
        operacao.forEach(x => {
            const papel = new Papel();
            papel.natureza = x.natureza;
            papel.empresa = x.empresa;
            this.data = x.data;
            this.papeis.push(papel);
            this.quantidade += x.quantidade;
            this.count ++;
            this.valor += x.preco;
            this.tipo = x.tipo;
        });
    }

    public existeValor() {
        return this.operacao.length > 0;
    }

    public ValorMedio() {
        return this.valor ===  0 ? 0 : this.valor / this.count;
    }

    public Data() {
        return this.data == null ? '' : this.data.format('DD/MM/YYYY');
    }
}
