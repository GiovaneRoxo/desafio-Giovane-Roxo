import { ItensDaLanchonete } from "./itens-da-lanchonete.js";

class CaixaDaLanchonete {

    constructor() {
        this.subTotal = 0.00;
        this.total = 0.00; 
        this.carrinho = [];
        this.itensDaLanchonete = new ItensDaLanchonete();
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        const itemInvalido = "Item inválido!";
        const formaDePagamentoInvalida = "Forma de pagamento inválida!";
        const carrinhoVazio = "Não há itens no carrinho de compra!";
        const quantidadeInvalida = "Quantidade inválida!";
        const itemExtraInvalido = "Item extra não pode ser pedido sem o principal";
        
        this.setCarrinho(itens);
        if(itens.length == 0){
            return carrinhoVazio;
        }else if(!this.validarMetodoDePagamento(metodoDePagamento)){
            return formaDePagamentoInvalida;}
        for(let i = 0; i < this.carrinho.length; i++){
            if(!this.itensDaLanchonete.validarItem(this.carrinho[i][0])){
                return itemInvalido;
            }else if(this.carrinho[i][1] <= 0){
                return quantidadeInvalida;
            }else if(!this.validarItemExtra(i)){
                return itemExtraInvalido;
            }else{
                this.subTotal += this.getValorTotalDoItem(i);}    
        }
        this.setValorTotal(metodoDePagamento);
        return this.total;
    }



    setCarrinho(itens){
        for(let i = 0; i < itens.length; i++){
            let item = itens[i].split(",");
            this.carrinho.push(item.map((item) => item.trim()));
        }
    }

    getQuantidadeDoItem(nome){
        for(let i = 0; i < this.carrinho.length; i++){
            if(this.carrinho[i][0] === nome){
                return this.carrinho[i][1];
            }
        }
    }

    getValorTotalDoItem(i){
        let quantidade = this.carrinho[i][1];
        let valorTotalDoItem = this.itensDaLanchonete.getValorItem(this.carrinho[i][0]) * quantidade;
        return valorTotalDoItem;
    }

    getValorTotalComDesconto(valor, formaDePagamento){
        let valorcomdesconto = 0.00;
        if(formaDePagamento == "dinheiro"){
            valorcomdesconto = valor * (5/100);
            return valor - valorcomdesconto;
        }else if(formaDePagamento == "credito"){
            valorcomdesconto = valor * (3/100);
            return valor + valorcomdesconto;
        }else if(formaDePagamento == "debito"){
            return valor;}
    }

    setValorTotal(metodoDePagamento){
        this.total = "R$ "+ this.getValorTotalComDesconto(this.subTotal, metodoDePagamento).toFixed(2).replace(".", ",");
    }

    validarMetodoDePagamento(metodoDePagamento){
        if(metodoDePagamento == "dinheiro" ||
        metodoDePagamento == "credito" || 
        metodoDePagamento == "debito"){
            return true;
        }else{false}
    }

    validarItemExtra(i){
        if(this.carrinho[i][0] === "chantily" &&
        this.getQuantidadeDoItem("cafe") < this.carrinho[i][1] ^ 
        this.getQuantidadeDoItem("cafe") === undefined){
            return false;
        }else if(this.carrinho[i][0] === "queijo" && 
        this.getQuantidadeDoItem("sanduiche") < this.carrinho[i][1] ^ 
        this.getQuantidadeDoItem("sanduiche") === undefined){
            return false;
        }else{
            return true;}
    }
}

export { CaixaDaLanchonete };
