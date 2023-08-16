import { ItensDaLanchonete } from "./itens-da-lanchonete.js";

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        let carrinho = [];
        let valor = 0.00;
        let ValorTotal = 0.00;
        let itensDaLanchonete = new ItensDaLanchonete();
        let qtdCafe;
        let qtdSanduiche;

        for(let i = 0; i < itens.length; i++){
            let item = itens[i].split(",");
            carrinho.push(item.map((item) => item.trim()));
            if(carrinho[i][0] == "cafe"){
                qtdCafe = carrinho[i][1];
            }else if(carrinho[i][0] == "sanduiche"){
                qtdSanduiche = carrinho[i][1];
            }
        }

        if(itens.length == 0){
            return "Não há itens no carrinho de compra!";
        }else if(!this.validarMetodoDePagamento(metodoDePagamento)){
            return "Forma de pagamento inválida!";
        }

        for(let i = 0; i < carrinho.length; i++){
            if(itensDaLanchonete.validarItem(carrinho[i][0]) == false){
                return "Item inválido!";
            }else if(carrinho[i][1] <= 0){
                return "Quantidade inválida!"
            }else if(carrinho[i][0] === "chantily" && qtdCafe < carrinho[i][1] ^ qtdCafe === undefined){
                return "Item extra não pode ser pedido sem o principal";
            }else if(carrinho[i][0] === "queijo" && qtdSanduiche < carrinho[i][1] ^ qtdSanduiche === undefined){
                return "Item extra não pode ser pedido sem o principal";
            }else{
                valor += itensDaLanchonete.getValorItem(carrinho[i][0], carrinho[i][1]);
            }    
        }
        ValorTotal =  itensDaLanchonete.getValorTotalComDesconto(valor, metodoDePagamento);
        return "R$ " + ValorTotal.toFixed(2).replace(".", ",");
    }

    validarMetodoDePagamento(metodoDePagamento) {
        if(metodoDePagamento == "dinheiro" || metodoDePagamento == "credito" || metodoDePagamento == "debito"){return true;}else{false}
    }

    validarExtra(carrinho){
        if(carrinho[i][0] === "chantily" && qtdCafe < carrinho[i][1] ^ qtdCafe === undefined){
            return false;
        }else if(carrinho[i][0] === "queijo" && qtdSanduiche < carrinho[i][1] ^ qtdSanduiche === undefined){
            return false;
        }
    }
}

export { CaixaDaLanchonete };
