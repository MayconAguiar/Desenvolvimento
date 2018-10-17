import { Operacao } from '../operacao';
import { Saldo } from './Saldo';
import { EntradaOuSaida } from './EntradaOuSaida';


export class OperacaoCompleta {
    private operacaoAnterior: OperacaoCompleta;
    public entrada: EntradaOuSaida;
    public saida: EntradaOuSaida;
    public saldo: Saldo;

    constructor() {
        this.saldo = new Saldo();
    }

    processe(operacao1: Operacao[], operacao2: Operacao[], operacaoAnterior: OperacaoCompleta) {
        this.operacaoAnterior = operacaoAnterior;
        this.entrada = new EntradaOuSaida(operacao1);
        this.saida = new EntradaOuSaida(operacao2);

        this.atualizeValores();
    }
    
    processeSaida(operacao1: Operacao[]) {        
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
    }

    private inverta() {
        const aux = this.saida;
        this.saida = this.entrada;
        this.entrada = aux;
    }

}
