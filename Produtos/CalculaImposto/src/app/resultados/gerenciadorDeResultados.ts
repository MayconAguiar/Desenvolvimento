import { Resultado } from "./resultado";
import { OperacaoFinalizada } from "../operacaoFinalizada";

export class GerenciadorDeResultados {
    
    private operacoesFinalizadas: OperacaoFinalizada[];

    constructor(operacoes: OperacaoFinalizada[]) {
        this.operacoesFinalizadas = operacoes;    
    }

    obtenha(): Resultado {
        
        let resultado = new Resultado();

        for (let index = 0; index < this.operacoesFinalizadas.length; index++) {
            const element = this.operacoesFinalizadas[index];
            resultado.adicioneOperacaoFinalizada(element);
        }

        return resultado;        
    }
}