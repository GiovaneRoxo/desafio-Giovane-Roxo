import { ItensDaLanchonete } from "./cardapio.js";

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

    let carrinho = [];
    let valorTotal = 0.00;
    let ValorDaCompra = 0.00;
    let itensDaLanchonete = new ItensDaLanchonete();

    for(let i = 0; i < itens.length; i++){
        let item = itens[i].split(",");
        carrinho.push(item.map((item) => item.trim()));
    }

    if(itens.length == 0){
        return "Não há itens no carrinho de compra!";
    }else if(metodoDePagamento != "dinheiro" && metodoDePagamento != "credito" && metodoDePagamento != "debito"){
        return "Forma de pagamento inválida!";
    }


    

    for(let i = 0; i < carrinho.length; i++){
        if(itensDaLanchonete.validarItem(carrinho[i][0]) == false){
            return "Item inválido!";
        }else if(itensDaLanchonete.validarItem(carrinho[i][0]) == true && carrinho[i][1] <= 0){
            return "Quantidade inválida!"
        }else if(itensDaLanchonete.getItens().includes(carrinho[i][0]) == true && carrinho[i][1] > 0){
            valorTotal += itensDaLanchonete.getValorItem(carrinho[i][0], carrinho[i][1]);
        }    
    }
    ValorDaCompra =  itensDaLanchonete.getValorTotalComDesconto(valorTotal, metodoDePagamento);
    return "R$ " + ValorDaCompra.toFixed(2).replace(".", ",");
    }
}

export { CaixaDaLanchonete };
