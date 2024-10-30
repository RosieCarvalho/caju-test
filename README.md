# Caju Front End Teste

- Teste realizado para seletivo de front-end para a empresa caju beneficios

# ITENS COMTEMPLADOS

### Tela Dashboard

- Implementar `GET` ao carregar a pagina e ao fazer pequisa por `CPF`
- Filtrar os cards por coluna, usando o status.
- Implementar `PUT` ao clicar em Reprovar e alterar o status para `REPROVED`
- Implementar `PUT` ao clicar em Aprovar e alterar o status para `APPROVED`
- Implementar `PUT` ao clicar em Revisar novamente e alterar o status para `REVIEW`
- Implementar `DELETE` ao clicar no lixeira no card.
- O botão de `Reprovar` e `Aprovar` só deve aparecer em admissões com o status `REVIEW`
- O botão `Revisar novamente` só deve aparecer em admissões com o status `REPROVED` ou `APPROVED`
- Implementar um loading na tela ao realizar requisições.
- Todas as ações devem ter modal de confirmação e uma notificação de sucesso ou erro
- Na pesquisa por CPF realizar a requisição automaticamente ao preencher um CPF válido
- Adicionar máscara de CPF no campo de pesquisa.
- Atualizar os dados (refetch) ao clicar no ícone de atualizar

### Tela Cadastro

- Implementar validação no campo de `email` para que aceite apenas emails válidos
- Implementar validação no campo `nome completo` para que aceite pelo menos um espaço, no mínimo duas letras, e que a primeira letra não seja um número.
- Implementar validação no campo CPF para aceitar apenas CPFs válidos e adicionar uma máscara de CPF ao campo.
- Implementar `POST` ao preencher todos os campos corretamentes.
- Redirecionar ao `/dashboard` ao criar uma nova admissão.

## API

- Para visualizar os loaddings, usar o a opção de desempenho par 3g no navegador
