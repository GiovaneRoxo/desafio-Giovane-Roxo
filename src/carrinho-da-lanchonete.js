import { ItensDaLanchonete } from "./itens-da-lanchonete";

class CarrinhoDaLanchonete {

    constructor(itens) {

        this.qtdCafe = 0;
        this.qtdSanduiche = 0;
        this.itens = new Map();
        this.itensDaLanchonete = new ItensDaLanchonete();
        

        for(let i = 0; i < itens; i++){
            let itensDoCarrinho = [];
            let item = itens[i].split(",");
            itensDoCarrinho.push(item.map((item) => item.trim()));
            this.itens.set(itensDoCarrinho[i][0], itensDoCarrinho[i][1]);
            if(this.carrinho[i][0] == "cafe"){
                this.qtdCafe = this.carrinho[i][1];
            }else if(carrinho[i][0] == "sanduiche"){
                this.qtdSanduiche = this.carrinho[i][1];
            }
        }
    }

    getTodoCarrinho(){
        return this.carrinho;
    }

    getQtdCafe(){
        return this.qtdCafe;
    }

    getQtdSanduiche(){
        return this.qtdSanduiche;
    }

    adicionarItem(item, quantidade){
        if(this.itensDaLanchonete.validarItem(item) && quantidade > 0){
            return item + ", " + quantidade;
        }else{
            return "Item inválido!";
        }
    }   
}

export { CarrinhoDaLanchonete };