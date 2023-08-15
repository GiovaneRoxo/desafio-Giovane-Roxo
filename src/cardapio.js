class ItensDaLanchonete {

    getItens(){
        let ItensDaLanchonete = [];
            ItensDaLanchonete.push("cafe")
            ItensDaLanchonete.push("chantily")
            ItensDaLanchonete.push("suco")
            ItensDaLanchonete.push("sanduiche")
            ItensDaLanchonete.push("queijo")
            ItensDaLanchonete.push("salgado")
            ItensDaLanchonete.push("combo1")
            ItensDaLanchonete.push("combo2")
        return ItensDaLanchonete;
        }
    
    
    getValorItem(item, quantidade) {
        const itens = new Map();
            itens.set('cafe', 3.00);
            itens.set('chantily', 1.50);
            itens.set('suco', 6.20);
            itens.set('sanduiche', 6.50);
            itens.set('queijo', 2.00);
            itens.set('salgado', 7.25);
            itens.set('combo1', 9.50);
            itens.set('combo2', 7.50);
            let result = itens.get(item) * quantidade;    
        return result;
    }

    validarItem(item) {
        if(this.getItens().includes(item) === true){
            return true;
        }else{
            return false;
        }
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
}

export { ItensDaLanchonete };