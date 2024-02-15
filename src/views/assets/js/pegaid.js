 function editarEstudante(estudanteId) {
      $.ajax({
        url: `http://localhost:333/api/getid/${estudanteId}`,
        method: 'GET',
        success: function (data) {
          // Preenche o formulário com os detalhes do estudante
          $('#nome').val(data.nome);
          // Aqui você pode preencher o seletor de turmas com os detalhes da turma, se necessário
          $('#estudanteId').val(estudanteId);
          // Exibe o formulário
          $('#estudanteForm').show();
        },
        error: function (err) {
          console.error('Erro ao carregar detalhes do estudante:', err);
        }
      });
      
    }