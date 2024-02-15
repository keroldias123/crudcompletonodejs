// Quando o usuário terminar de digitar no campo de pesquisa
var typingTimer;                // Identificador do timer
var doneTypingInterval = 500;   // Tempo de espera em milissegundos

$('#nomeEstudante').on('keyup', function() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(pesquisarEstudantes, doneTypingInterval);
});

$('#nomeEstudante').on('keydown', function() {
    clearTimeout(typingTimer);
});

// Função para pesquisar estudantes
function pesquisarEstudantes() {
    // Obter o valor do campo de texto
    var pesquisa = $('#nomeEstudante').val();
    
    // Se o campo de pesquisa estiver vazio, carregar todos os estudantes
    if (pesquisa === '') {
        carregarEstudantes();
        return; // Sair da função para evitar a execução da requisição AJAX
    }
    
    // Construir a URL de pesquisa por nome
    var url = 'http://localhost:333/api/pesquisar/nome/' + pesquisa;
    
    // Enviar uma requisição AJAX para o servidor
    $.ajax({
        type: 'GET',
        url: url,
        success: function(estudantes) {
            // Limpar o conteúdo anterior da tabela
            $('#tabelaEstudantes tbody').empty();
            
            // Adicionar os resultados à tabela
            estudantes.forEach(function(estudante) {
                $('#tabelaEstudantes tbody').append(`
                    <tr>
                        <td>${estudante.id}</td>
                        <td>${estudante.nome}</td>
                        <td>${estudante.turma ? estudante.turma.nome : ''}</td> <!-- Verifica se há uma turma associada -->
                        <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#adicionarEstudanteModal" onclick='editarEstudante(${estudante.id})'>Editar </button>
                            <button class="btn btn-primary btn-excluir-estudante" data-id="${estudante.id}">Excluir</button>
                        </td>
                    </tr>
                `);
            });
            
            // Adiciona o evento de clique para o botão de excluir estudante
            $('.btn-excluir-estudante').click(function() {
                const estudanteId = $(this).data('id');
                const confirmation = confirm(`Tem certeza que deseja excluir o estudante com o ID ${estudanteId}?`);
                if (confirmation) {
                    excluirEstudante(estudanteId);
                }
            });
        },
        error: function(xhr, status, error) {
            // Exibir uma mensagem de erro em caso de falha na requisição
            $('#tabelaEstudantes tbody').html('<tr><td colspan="4">Erro ao pesquisar estudantes: ' + error + '</td></tr>');
        }
    });
}

// Função para excluir um estudante
function excluirEstudante(estudanteId) {
    $.ajax({
        url: 'http://localhost:333/api/eliminar/' + estudanteId,
        method: 'DELETE',
        success: function (response) {
                Toastify({
                text: "Estudante eliminado com sucesso!",
                duration: 3000, // 3 segundos
                 backgroundColor: "linear-gradient(to right, #FF0000, #FF4500)"
            }).showToast();
            console.log('Estudante excluído com sucesso:', response);
            // Recarrega a lista de estudantes após a exclusão
            carregarEstudantes();
        },
        error: function(err) {
            console.error('Erro ao excluir estudante:', err);
        }
    });
}

// Carregar todos os estudantes ao carregar a página
$(document).ready(function() {
    carregarEstudantes();
});

// Função para carregar os estudantes
function carregarEstudantes() {
    $.ajax({
        url: 'http://localhost:333/api/estudantes',
        method: 'GET',
        success: function(estudantes) {
            $('#tabelaEstudantes tbody').empty();
            estudantes.forEach(function(estudante) {
                $('#tabelaEstudantes tbody').append(`
                    <tr>
                        <td>${estudante.id}</td>
                        <td>${estudante.nome}</td>
                        <td>${estudante.turma ? estudante.turma.nome : ''}</td> <!-- Verifica se há uma turma associada -->
                        <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#adicionarEstudanteModal" onclick='editarEstudante(${estudante.id})'>Editar </button>
                            <button class="btn btn-primary btn-excluir-estudante" data-id="${estudante.id}">Excluir</button>
                        </td>
                    </tr>
                `);
            });
            
            // Adiciona o evento de clique para o botão de excluir estudante
            $('.btn-excluir-estudante').click(function() {
                const estudanteId = $(this).data('id');
                const confirmation = confirm(`Tem certeza que deseja excluir o estudante com o ID ${estudanteId}?`);
                if (confirmation) {
                    excluirEstudante(estudanteId);
                }
            });
        },
        error: function(err) {
            console.error('Erro ao carregar estudantes:', err);
        }
    });
}

// Função para cadastrar um novo estudante
function cadastrarEstudante() {
    var nome = $('#nome').val(); // Obtém o nome do estudante do campo de entrada
    var turmaId = $('#turma').val(); // Obtém o ID da turma do campo de seleção

    // Envia uma requisição AJAX para a rota de cadastro de estudante
    $.ajax({
        type: 'POST',
        url: 'http://localhost:333/api/estudantes/add',
        data: { nome: nome, turmaId: turmaId },
        success: function(response) {
            console.log('Estudante cadastrado com sucesso:', response);
             // Limpa os dados dos campos de entrada
            limparCampos();
              // Fecha o modal após o envio do formulário
            $('#adicionarEstudanteModal').modal('hide');
            
               Toastify({
                text: "Estudante cadastrado com sucesso!",
                duration: 3000, // 3 segundos
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
            }).showToast();
            // Após o cadastro, recarrega a lista de estudantes na tabela
             // Ativa o elemento com o id "success" quando o cadastro é bem-sucedido
            // Após o cadastro, recarrega a lista de estudantes na tabela
            carregarEstudantes();
        },
        error: function(err) {
            console.error('Erro ao cadastrar estudante:', err);
             // Limpa os dados dos campos de entrada
            limparCampos();
            exibirNotificacao('error', 'Erro ao cadastrar estudante. Tente novamente mais tarde.');
        }
    });
}

// Função para limpar os dados dos campos de entrada
function limparCampos() {
    $('#estudanteId').val(''); // Limpa o campo de nome
    $('#nome').val(''); // Limpa o campo de nome
    $('#turma').val(''); // Limpa o campo de turma
}

// Quando o botão de salvar é clicado
$('#success').click(function() {
    var id = $('#estudanteId').val(); // Obtém o ID do estudante do campo de entrada
    var nome = $('#nome').val(); // Obtém o nome do estudante do campo de entrada
    var turmaId = $('#turma').val(); // Obtém o ID da turma do campo de seleção

    // Verifica se o ID está presente para decidir se é uma adição ou atualização
    if (!id) {
        cadastrarEstudante();
    } else {
       // Envia uma requisição AJAX para a rota de edição de estudante
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:333/api/estudantes/editar/' + id,
            data: { nome: nome, turmaId: turmaId },
            success: function(response) {
                console.log('Estudante atualizado com sucesso:', response);
                 // Limpa os dados dos campos de entrada
            limparCampos();
                  // Fecha o modal após o envio do formulário
                $('#adicionarEstudanteModal').modal('hide');
                
                   // Exibe uma notificação de "toast" de sucesso
            Toastify({
                text: "Estudante cadastrado com sucesso!",
                duration: 3000, // 3 segundos
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
            }).showToast();
                // Após a atualização, recarrega a lista de estudantes na tabela
                carregarEstudantes();
            },
            error: function(err) {
                console.error('Erro ao atualizar estudante:', err);
                 // Limpa os dados dos campos de entrada
                limparCampos();
                            // Exibe uma notificação de "toast" de erro
            exibirNotificacao('error', 'Erro ao cadastrar estudante. Tente novamente mais tarde.');

            }
        });
    }
    
// Função para exibir uma notificação de "toast"
function exibirNotificacao(tipo, mensagem) {
    Toastify({
        text: mensagem,
        duration: 3000, // 3 segundos
        backgroundColor: tipo === 'success' ? 'linear-gradient(to right, #00b09b, #96c93d)' : 'linear-gradient(to right, #ff0000, #ff6347)'
    }).showToast();
}
});
        