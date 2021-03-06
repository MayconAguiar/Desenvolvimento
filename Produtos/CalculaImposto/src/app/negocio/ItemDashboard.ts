
import { Saldo } from './Saldo';
import { EntradaOuSaida } from './EntradaOuSaida';
import { ItemArquivo } from '../arquivos/itemArquivo';
import { Tipos } from '../tipos.enum';
import { ResumoIndividual } from './ResumoIndividual';


export class ItemDashboard {
    private operacaoAnterior: ItemDashboard;
    public entrada: EntradaOuSaida;
    public saida: EntradaOuSaida;
    public saldo: Saldo;
    public tipo: Tipos;
    public resumo: ResumoIndividual;


    constructor() {
        this.saldo = new Saldo();
    }

    processe(operacao1: ItemArquivo[], operacao2: ItemArquivo[], operacaoAnterior: ItemDashboard) {
        this.operacaoAnterior = operacaoAnterior;
        this.entrada = new EntradaOuSaida(operacao1);
        this.saida = new EntradaOuSaida(operacao2);

        this.atualizeValores();
    }

    processeSaida(operacao1: ItemArquivo[]) {
        this.saida = new EntradaOuSaida(operacao1);
        this.atualizeValores();
    }

    valorMedio() {
        return this.saldo.valorMedio > 0 ?  (this.saldo.valorMedio + this.entrada.ValorMedio()) / 2 : this.entrada.ValorMedio();
    }

    private atualizeValores() {
        const quantidadeEntrada = this.operacaoAnterior.saldo.diferenca + this.entrada.quantidade;

        // vai terminar a operação vendido;
        // garante que as entradas sempre serão maiores
        if (quantidadeEntrada < this.saida.quantidade) {
            this.inverta();
        }

        // calcular o saldo
        this.saldo.diferenca = Math.abs(quantidadeEntrada - this.saida.quantidade);
        this.saldo.valorMedio = this.entrada.ValorMedio();

        this.tipo = this.entrada.tipo;
        this.resumo = new ResumoIndividual(this);
    }

    private inverta() {
        const aux = this.saida;
        this.saida = this.entrada;
        this.entrada = aux;
    }

}
