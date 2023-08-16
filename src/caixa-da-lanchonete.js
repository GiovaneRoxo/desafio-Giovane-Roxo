import { ItensDaLanchonete } from "./itens-da-lanchonete.js";

class CaixaDaLanchonete {

    constructor() {
        this.qtdCafe = 0;
        this.qtdSanduiche = 0;
        this.valorTotal = 0.00;
        this.valor = 0.00;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        
        let carrinho = [];
        let itensDaLanchonete = new ItensDaLanchonete();

        for(let i = 0; i < itens.length; i++){
            let item = itens[i].split(",");
            carrinho.push(item.map((item) => item.trim()));
            if(carrinho[i][0] == "cafe"){
                this.qtdCafe = carrinho[i][1];
            }else if(carrinho[i][0] == "sanduiche"){
                this.qtdSanduiche = carrinho[i][1];
            }
        }

        if(itens.length == 0){
            return "Não há itens no carrinho de compra!";
        }else if(!this.validarMetodoDePagamento(metodoDePagamento)){
            return "Forma de pagamento inválida!";
        }

        for(let i = 0; i < carrinho.length; i++){
            if(!itensDaLanchonete.validarItem(carrinho[i][0])){
                return "Item inválido!";
            }else if(carrinho[i][1] <= 0){
                return "Quantidade inválida!"
            }else if(!this.validarExtra(carrinho, i)){
                return "Item extra não pode ser pedido sem o principal";
            }else{
                this.valor += itensDaLanchonete.getValorItem(carrinho[i][0], carrinho[i][1]);
            }    
        }
        this.valorTotal =  itensDaLanchonete.getValorTotalComDesconto(this.valor, metodoDePagamento);
        return "R$ " + this.valorTotal.toFixed(2).replace(".", ",");
    }

    validarMetodoDePagamento(metodoDePagamento) {
        if(metodoDePagamento == "dinheiro" || metodoDePagamento == "credito" || metodoDePagamento == "debito"){return true;}else{false}
    }

    validarExtra(carrinho, i){
        if(carrinho[i][0] === "chantily" && this.qtdCafe < carrinho[i][1] ^ this.qtdCafe === undefined){
            return false;
        }else if(carrinho[i][0] === "queijo" && this.qtdSanduiche < carrinho[i][1] ^ this.qtdSanduiche === undefined){
            return false;
        }else{
            return true;
        }
    }
}

export { CaixaDaLanchonete };
