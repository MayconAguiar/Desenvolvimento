import { Papel } from './Papel';
import { Operacao } from '../operacao';

export class EntradaOuSaida {

    public papeis: Papel[] = [];
    private count = 0;
    private valor = 0;

    quantidade = 0;

    constructor(operacao: Operacao[]) {

        operacao.forEach(x => {
            const papel = new Papel();
            papel.natureza = x.natureza;
            papel.empresa = x.empresa;

            this.papeis.push(papel);
            this.quantidade += x.quantidade;
            this.count ++;
            this.valor += x.preco;
        });
    }

    public ValorMedio() {
        return this.valor ===  0 ? 0 : this.valor / this.count;
    }
}
