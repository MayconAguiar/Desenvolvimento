import { ItemDashboard } from './ItemDashboard';

export class ResumoIndividual  {
    taxas = 0;
    basecalculoimposto = 0;
    impostoDevido = 0;
    impostoRetido = 0;
    impostoAPagar = 0;
    corretagem = 0.80;
    lucroOuPrejuizo = 0;
    totalVenda = 0;

    item: ItemDashboard;

    constructor(item: ItemDashboard) {
        this.item = item;
        this.calcule();
    }

    private calcule() {
        if (this.item.saida.existeValor()) {
            const totalEntrada = this.item.entrada.ValorMedio() * this.item.saida.quantidade;
            this.totalVenda = this.item.saida.ValorMedio() * this.item.saida.quantidade;
            this.lucroOuPrejuizo = totalEntrada - this.totalVenda;
            const valorDaOperacao = (totalEntrada + this.totalVenda);
            const taxaDeLiquidacao = valorDaOperacao * (0.0275 / 100);
            const emolumentos = valorDaOperacao * 0.00004829;
            const iss = this.corretagem * (9.65 / 100);

            this.taxas = taxaDeLiquidacao + emolumentos + iss + (this.corretagem * this.item.entrada.count);
        }
    }
}
