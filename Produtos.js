class Cliente {
    constructor(){
        this.clientes = localStorage.getItem('tbClientes') === null
                        ? []
                        : JSON.parse(localStorage.getItem('tbClientes'))
    }
    salva(cliente){
        if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){
            this.apaga(cliente.codigo)
        }
        this.clientes.push(cliente) //adiciona um novo elemento ao array
        alert('Cliente salvo com sucesso!')
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes))
    }

    edita(cliente){
        document.getElementById('codigo').value = cliente.codigo
        document.getElementById('codigo').setAttribute('disabled','disabled')
        document.getElementById('nome').value = cliente.nome
        document.getElementById('cep').value = cliente.cep
        document.getElementById('endereco').value = cliente.endereco
        document.getElementById('bairro').value = cliente.bairro
        document.getElementById('cidade').value = cliente.cidade
        document.getElementById('observacoes').value = cliente.observacoes
        document.getElementById('limite').value = cliente.limite
        document.getElementById('utilizado').value = cliente.utilizado
        document.getElementById('saldo').value = cliente.saldo
    }

    apaga(codigo){
        let index = this.clientes.findIndex(cliente => cliente.codigo == codigo)
        this.clientes.splice(index, 1) //splice remove o item do índice no array
        localStorage.setItem('tbClientes',JSON.stringify(this.clientes))
        cliente.atualiza()
    }

    lista(){
        const listagem = this.clientes.map((cliente) => (
            `<tr>
                <td>${cliente.codigo}</td>    
                <td>${cliente.nome}</td>
                <td>${cliente.cep}</td>       
                <td>${cliente.endereco}</td>
                <td>${cliente.bairro}</td>    
                <td>${cliente.cidade}</td>
                <td>${cliente.observacoes}</td>
                <td>
        <button id='apagar' onClick='cliente.apaga(${cliente.codigo})'>
        🗑️ Apagar </button>
        <button id='editar' onClick='cliente.edita(${JSON.stringify(cliente)})'>
        🗒️ Editar </button> 
                </td>
             </tr>
            `
        ))
        return(`<table border='1' class='paleBlueRows'>
        <caption>Relação de Clientes</caption>
        <thead>
            <th>Código</th>      
            <th>Nome</th>
            <th>CEP</th>         
            <th>Endereço</th>
            <th>Bairro</th>      
            <th>Cidade</th>
            <th>Observações</th> 
            <th>Opções</th>
        </thead>
        <tbody>${listagem}</tbody>
        </table>    
        `)
    }
    atualiza(){
        document.getElementById('listagem').innerHTML = cliente.lista()
    }
}
//instanciamos um novo objeto
const cliente = new Cliente()
//tratamos o botão salvar
document.getElementById('salvar').onclick = function(){
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        cep: document.getElementById('cep').value,
        endereco:document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        observacoes: document.getElementById('observacoes').value,
        limite: document.getElementById('limite').value,
        utilizado: document.getElementById('utilizado').value,
        saldo: document.getElementById('saldo').value
    }
    cliente.salva(registro)
}
//tratamos a listagem
window.onload = function() {
    cliente.atualiza()
}
//tratamos a alteração no campo utilizado
document.getElementById('utilizado').onchange = function (){
   let limite = document.getElementById('limite').value
   let utilizado = document.getElementById('utilizado').value
   if(parseFloat(utilizado) > parseFloat(limite)){
       alert(`O valor utilizado ${utilizado} não pode ser maior que o limite de crédito de ${limite}!`)
       document.getElementById('utilizado').value = 0
   } else {
       saldo = (limite - utilizado)
   }
   document.getElementById('saldo').value = saldo.toFixed(2)
}
