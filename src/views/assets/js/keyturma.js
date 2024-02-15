  $(document).ready(function () {
    $.ajax({
      url: '/api/listarTurmas',
      method: 'GET',
      success: function (data) {
        // Verifica se existe a propriedade 'turmas' no objeto de resposta
        if (data && data.turmas && Array.isArray(data.turmas)) {
          // Itera sobre cada objeto turma dentro do array turmas
          data.turmas.forEach(function (turma) {
            // Adiciona uma opção ao select para cada turma
            $('#turma').append(`<option value="${turma.id}">${turma.nome}</option>`);
          });
        } else {
          console.error('Os dados recebidos não contêm um array de turmas:', data);
        }
      },
      error: function (err) {
        console.error('Erro ao carregar turmas:', err);
      }
    });
  });
