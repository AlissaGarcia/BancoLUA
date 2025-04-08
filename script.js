var contas = [];

document.getElementById("btnLogin").onclick = function() {
  var login = document.getElementById("login").value;
  var senha = document.getElementById("senha").value;
  if(login === "lua" && senha === "123") {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("menu-screen").style.display = "block";
  } else {
    alert("Login ou senha incorretos");
  }
};

function criarConta() {
  var numero = prompt("Digite o número da conta:");
  var agencia = prompt("Digite a agência:");
  var tipo = prompt("Digite o tipo de conta (CC para Conta Corrente ou CP para Conta Poupança):");
  var saldo = parseFloat(prompt("Digite o saldo inicial:"));
  var nome = prompt("Digite o nome do titular:");
  var cpf = prompt("Digite o CPF do titular:");
  var endereco = prompt("Digite o endereço do titular:");
  var telefone = prompt("Digite o telefone do titular:");
  contas.push({
    numero: numero,
    agencia: agencia,
    tipo: tipo,
    saldo: saldo,
    titular: { nome: nome, cpf: cpf, endereco: endereco, telefone: telefone }
  });
  alert("Conta criada com sucesso!");
}

function consultarConta() {
  var num = prompt("Digite o número da conta para consulta:");
  var conta = null;
  for(var i = 0; i < contas.length; i++){
    if(contas[i].numero === num) { conta = contas[i]; break; }
  }
  if(conta) {
    alert("Conta: " + conta.numero + "\nAgência: " + conta.agencia + "\nTipo: " + conta.tipo +
          "\nSaldo: " + conta.saldo + "\nTitular: " + conta.titular.nome);
  } else {
    alert("Conta não encontrada");
  }
}

function removerConta() {
  var num = prompt("Digite o número da conta a ser removida:");
  for(var i = 0; i < contas.length; i++){
    if(contas[i].numero === num) { contas.splice(i,1); alert("Conta removida com sucesso!"); return; }
  }
  alert("Conta não encontrada");
}

function creditar() {
  var num = prompt("Digite o número da conta para crédito:");
  for(var i = 0; i < contas.length; i++){
    if(contas[i].numero === num) {
      var valor = parseFloat(prompt("Digite o valor a creditar:"));
      contas[i].saldo += valor;
      alert("Crédito efetuado. Novo saldo: " + contas[i].saldo);
      return;
    }
  }
  alert("Conta não encontrada");
}

function debitar() {
  var num = prompt("Digite o número da conta para débito:");
  for(var i = 0; i < contas.length; i++){
    if(contas[i].numero === num) {
      var valor = parseFloat(prompt("Digite o valor a debitar:"));
      if(contas[i].saldo >= valor) {
        contas[i].saldo -= valor;
        alert("Débito efetuado. Novo saldo: " + contas[i].saldo);
      } else {
        alert("Saldo insuficiente");
      }
      return;
    }
  }
  alert("Conta não encontrada");
}

function renderJuros() {
  var num = prompt("Digite o número da conta para render juros:");
  for(var i = 0; i < contas.length; i++){
    if(contas[i].numero === num) {
      if(contas[i].tipo.toUpperCase() === "CP") {
        var taxa = parseFloat(prompt("Digite a taxa de juros (em %):"));
        var juros = contas[i].saldo * (taxa/100);
        contas[i].saldo += juros;
        alert("Juros renderam R$" + juros.toFixed(2) + ". Novo saldo: " + contas[i].saldo);
      } else {
        alert("Operação disponível apenas para contas poupança (CP)");
      }
      return;
    }
  }
  alert("Conta não encontrada");
}

function transferir() {
  var origem = prompt("Digite o número da conta de débito:");
  var destino = prompt("Digite o número da conta de crédito:");
  var valor = parseFloat(prompt("Digite o valor a transferir:"));
  var contaOrigem = null, contaDestino = null;
  for(var i = 0; i < contas.length; i++){
    if(contas[i].numero === origem) contaOrigem = contas[i];
    if(contas[i].numero === destino) contaDestino = contas[i];
  }
  if(contaOrigem && contaDestino) {
    if(contaOrigem.saldo >= valor) {
      contaOrigem.saldo -= valor;
      contaDestino.saldo += valor;
      alert("Transferência efetuada.\nNovo saldo da conta origem: " + contaOrigem.saldo +
            "\nNovo saldo da conta destino: " + contaDestino.saldo);
    } else {
      alert("Saldo insuficiente na conta de origem");
    }
  } else {
    alert("Conta(s) não encontrada(s)");
  }
}

function listarContas() {
  if(contas.length === 0) {
    alert("Nenhuma conta cadastrada");
    return;
  }
  var tabela = "<table><tr><th>Conta</th><th>Agência</th><th>Tipo</th><th>Saldo</th><th>Titular</th></tr>";
  for(var i = 0; i < contas.length; i++){
    tabela += "<tr><td>" + contas[i].numero + "</td><td>" + contas[i].agencia + "</td><td>" +
              contas[i].tipo + "</td><td>" + contas[i].saldo + "</td><td>" +
              contas[i].titular.nome + "</td></tr>";
  }
  tabela += "</table>";
  document.getElementById("tabelaContas").innerHTML = tabela;
}

function sair() {
  alert("Saindo do sistema");
  location.reload();
}
