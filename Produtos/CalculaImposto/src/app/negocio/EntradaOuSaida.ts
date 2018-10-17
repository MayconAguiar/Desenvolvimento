import { Papel } from './Papel';
import { ItemArquivo } from '../arquivos/itemArquivo';

export class EntradaOuSaida {

    public papeis: Papel[] = [];
    public operacao: ItemArquivo[];
    public data: string;
    private count = 0;
    private valor = 0;

    quantidade = 0;

    constructor(operacao: ItemArquivo[]) {
        this.operacao = operacao;
        operacao.forEach(x => {
            const papel = new Papel();
            papel.natureza = x.natureza;
            papel.empresa = x.empresa;
            this.data = x.Data();
            this.papeis.push(papel);
            this.quantidade += x.quantidade;
            this.count ++;
            this.valor += x.preco;
        });
    }

    public existeValor() {
        return this.operacao.length > 0;
    }

    public ValorMedio() {
        return this.valor ===  0 ? 0 : this.valor / this.count;
    }
}
