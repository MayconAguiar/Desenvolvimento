import { ItemDashboard } from './ItemDashboard';

export class Resumo  {
    taxas = 0;
    lucroOuPrejuizo = 0;
    totalVenda = 0;
    impostoDevido = 0;
    impostoRetido = 0;
    impostoAPagar = 0;

    constructor(itens: ItemDashboard[]) {

    }

    private construa(itens: ItemDashboard[]) {
        itens.forEach( x => {
            this.taxas += x.resumo.taxas;
            this.lucroOuPrejuizo += x.resumo.lucroOuPrejuizo;
            this.totalVenda += x.resumo.totalVenda;
        });
    }

}