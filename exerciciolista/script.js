let timeoutMensagem; 
let draggedItem = null; // Variável global para armazenar o item sendo arrastado

// --- FUNÇÕES DRAG-AND-DROP ---

function handleDragStart(e) {
    // Armazena o item que está sendo arrastado
    draggedItem = this;
    // Define a opacidade para indicar que está sendo arrastado
    setTimeout(() => this.style.opacity = '0.5', 0);
    // Define o tipo de dado que está sendo transferido (necessário para a operação de drag/drop)
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    // Permite que um elemento possa ser solto aqui
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    // Impede que o item seja solto sobre si mesmo
    if (draggedItem !== this) {
        // Encontra a lista (ul)
        const lista = document.getElementById('listaTarefas');
        const items = Array.from(lista.children);
        
        // Determina se o item deve ser inserido antes ou depois
        const currentItemIndex = items.indexOf(this);
        const draggedItemIndex = items.indexOf(draggedItem);
        
        if (draggedItemIndex < currentItemIndex) {
            // Se o item arrastado veio de cima, insere DEPOIS do item atual
            this.parentNode.insertBefore(draggedItem, this.nextSibling);
        } else {
            // Se o item arrastado veio de baixo, insere ANTES do item atual
            this.parentNode.insertBefore(draggedItem, this);
        }
    }
}

function handleDragEnd(e) {
    // Retorna a opacidade ao normal no final do arrasto
    this.style.opacity = '1';
    draggedItem = null;
}

// --- FUNÇÃO PRINCIPAL DE ADICIONAR TAREFA ---

function adicionarTarefa() {
    const input = document.getElementById('inputTarefa');
    const mensagem = document.getElementById('mensagem');
    const lista = document.getElementById('listaTarefas');
    const tarefa = input.value.trim();

    clearTimeout(timeoutMensagem);

    if (tarefa.length < 5) {
        mensagem.textContent = "A tarefa precisa ter no mínimo 5 caracteres!";
        mensagem.className = "erro";
    } else {
        // Criar item da lista
        const li = document.createElement('li');
        li.textContent = tarefa;
        const fileInput = document.getElementById('file');
        const arquivoImagem = fileInput.files[0];

        // Se o usuário selecionou uma imagem, adiciona uma miniatura
        if (arquivoImagem) {
        adicionarImagemPreview(arquivoImagem, li);
        fileInput.value = ""; // limpa o input para próximo uso
}            
        // *** AQUI TORNAMOS O ITEM ARRASTÁVEL ***
        li.setAttribute('draggable', 'true');
        
        li.addEventListener('dragstart', handleDragStart);
        li.addEventListener('dragover', handleDragOver);
        li.addEventListener('drop', handleDrop);
        li.addEventListener('dragend', handleDragEnd);
        // ***************************************

        // Container para os botões
        const divBotoes = document.createElement('div');
        divBotoes.className = 'botoes-tarefa';

        // --- Botão de Editar ---
        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = "E";
        botaoEditar.className = "botao-editar";
        
        botaoEditar.onclick = function () {
            const isEditing = li.contentEditable === 'true';

            if (isEditing) {
                // Modo Salvar
                li.contentEditable = 'false';
                li.style.backgroundColor = '#ffffff'; 
                botaoEditar.textContent = "E"; // Volta para ícone de editar (ou "E")
                mensagem.textContent = "Tarefa editada e salva!";
                mensagem.className = "sucesso";
                clearTimeout(timeoutMensagem);
                timeoutMensagem = setTimeout(() => { mensagem.textContent = ""; mensagem.className = ""; }, 2000);

            } else {
                // Modo Editar
                li.contentEditable = 'true';
                li.style.backgroundColor = '#f0fff0'; 
                li.focus();
                botaoEditar.textContent = "S"; // Muda para "S" de Salvar
            }
        };

        // --- Botão de Excluir ---
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = "X";
        botaoExcluir.className = "botao-excluir";
        botaoExcluir.onclick = function () {
            li.remove();
        };
        
        // Adiciona os botões e a tarefa à lista
        divBotoes.appendChild(botaoEditar);
        divBotoes.appendChild(botaoExcluir);
        
        li.appendChild(divBotoes);
        lista.appendChild(li);

        mensagem.textContent = "Tarefa adicionada com sucesso!";
        mensagem.className = "sucesso";
        input.value = "";
    }

    // Esconde a mensagem após 2 segundos
    timeoutMensagem = setTimeout(() => {
        mensagem.textContent = "";
        mensagem.className = "";
    }, 2000);
}

// --- LISTENER PARA O INPUT FILE ---
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file');
    fileInput.addEventListener('change', (e) => {
        // Verifica se há arquivos selecionados
        if (e.target.files.length > 0) {
            adicionarImagem(e.target.files[0]);
        }
    });
});

function adicionarImagemPreview(file, li) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.createElement('img');
    img.src = e.target.result;
    img.className = 'imagem-tarefa';
    li.insertBefore(img, li.firstChild);
  };
  reader.readAsDataURL(file);
}