import { ItensDaLanchonete } from "./itens-da-lanchonete.js";

class CaixaDaLanchonete {

    constructor() {
        this.qtdCafe = 0;
        this.qtdSanduiche = 0;
        this.subTotal = 0.00;
        this.Total = 0.00; 
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
            return formaDePagamentoInvalida;
        }

        for(let i = 0; i < this.carrinho.length; i++){
            if(!this.itensDaLanchonete.validarItem(this.carrinho[i][0])){
                return itemInvalido;
            }else if(this.carrinho[i][1] <= 0){
                return quantidadeInvalida;
            }else if(!this.validarItemExtra(this.carrinho, i)){
                return itemExtraInvalido;
            }else{
                this.subTotal += this.getValorTotalDoItem(i);
            }    
        }
        this.setValorTotal(metodoDePagamento);
        return this.Total;
    }



    setCarrinho(itens){
        for(let i = 0; i < itens.length; i++){
            let item = itens[i].split(",");
            this.carrinho.push(item.map((item) => item.trim()));
            if(this.carrinho[i][0] == "cafe"){
                this.qtdCafe = this.carrinho[i][1];
            }else if(this.carrinho[i][0] == "sanduiche"){
                this.qtdSanduiche = this.carrinho[i][1];
            }
        }
    }

    getValorTotalDoItem(i){
        let quantidade = this.carrinho[i][1];
        let valorTotalDoItem = this.itensDaLanchonete.getValorItem(this.carrinho[i][0]) * quantidade;
        return valorTotalDoItem;
    }

    getValorTotalComDesconto(valor, formaDePagamento){
        if(formaDePagamento == "dinheiro"){
            let valorpercentual = valor * (5/100);
            return valor - valorpercentual;
        }else if(formaDePagamento == "credito"){
            let valorpercentual = valor * (3/100);
            return valor + valorpercentual;
        }else if(formaDePagamento == "debito"){
            return valor;
        }
    }

    setValorTotal(metodoDePagamento){
        this.Total = "R$ "+ this.getValorTotalComDesconto(this.subTotal, metodoDePagamento).toFixed(2).replace(".", ",");
        
    }

    validarMetodoDePagamento(metodoDePagamento){
        if(metodoDePagamento == "dinheiro" ||
        metodoDePagamento == "credito" || 
        metodoDePagamento == "debito"){
            return true;
        }else{false}
    }

    validarItemExtra(carrinho, i){
        if(carrinho[i][0] === "chantily" &&
        this.qtdCafe < carrinho[i][1] ^ 
        this.qtdCafe === undefined){
            return false;
        }else if(carrinho[i][0] === "queijo" && 
        this.qtdSanduiche < carrinho[i][1] ^ 
        this.qtdSanduiche === undefined){
            return false;
        }else{
            return true;
        }
    }
}

export { CaixaDaLanchonete };
