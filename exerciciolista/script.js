function adicionarTarefa() {

    //recebe valor do input do usuário
    const inputTarefa = document.getElementById("inputTarefa")
    let tarefa = inputTarefa.value.trim()

    const mensagem = document.getElementById("mensagem")

    // se o valor do input for vazio então mostre uma mensagem de erro para o usuário
    if (tarefa == "") {
        //mostre uma mensagem de erro
        let mensagemErro = "Digite uma tarefa para adicioná-la a sua lista!"
        mensagem.textContent = mensagemErro
    } else {
        //mensagem de tarefa adicionada com sucesso
        let mensagemSucesso = "Tarefa adicionada com sucesso!"
        mensagem.textContent = mensagemSucesso

        //cria novo item (li) e insere na (lista ul)
        const listaTarefas = document.getElementById("listaTarefas")
        let novaTarefa = document.createElement("li")
        novaTarefa.textContent = tarefa
        listaTarefas.appendChild(novaTarefa)
    }

    //limpa o input do usuário
    inputTarefa.value = ""
}
function adicionarTarefa() {
  const input = document.getElementById('inputTarefa');
  const mensagem = document.getElementById('mensagem');
  const lista = document.getElementById('listaTarefas');

  const tarefa = input.value.trim();

  // Validação mínimo de caracteres
  if (tarefa.length < 5) {
    mensagem.textContent = "A tarefa precisa ter no mínimo 5 caracteres!";
    mensagem.className = "erro";
    return;
  }

  // Criar item da lista
  const li = document.createElement('li');
  li.textContent = tarefa;

  // Botão de excluir
  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = "X";
  botaoExcluir.className = "botao-excluir";
  botaoExcluir.onclick = function () {
    li.remove();
  };

  li.appendChild(botaoExcluir);
  lista.appendChild(li);

  // Mensagem de sucesso
  mensagem.textContent = "Tarefa adicionada com sucesso!";
  mensagem.className = "sucesso";

  // Limpar input
  input.value = "";
}

const me = document.getElementById('mensagem');

setTimeout(function() {
  meuElemento.style.display = 'none';

  input.value = ""; 
}, 3000);