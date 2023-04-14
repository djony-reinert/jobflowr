# README

**Trabalho - BAN2**

Um banco de dados referente ao esquema relacional apresentado deverá ser produzido. O mesmo deverá conter dados previamente inseridos.

Uma aplicação deverá ser desenvolvida que faça uso e manipulação do banco de dados relacional. Tal aplicação não necessita apresentar uma interface gráfica, portanto, se a equipe preferir poderá usar a interface do próprio console da IDE escolhida (Não usar interface REST). Não será exigida uma linguagem de programação específica, entretanto, a solução exemplo e suporte da professora será apenas na linguagem Java. Esta aplicação deverá prover interfaces e respectivo funcionamento para as seguintes operações:

- Operações CRUD para todas as tabelas de entidade do banco de dados (Exemplo de um CRUD: cadastro, recuperação (consulta), atualização (update) e remoção (delete) de Animais de uma clínica veterinária)
- Operações de Processos de negócio para todas as tabelas associativas do banco de dados - são tabelas que relacionam mais de uma entidade (Exemplo: Efetuar consulta de um Animal da clínica - o que deve relacionar um veterinário, o animal, seu dono e contendo informações do que foi tratado na consulta como doença e medicamentos prescritos)
- Mínimo de 3 Relatórios do sistema. Cada relatório deve envolver a associação de mais de uma tabela (Exemplo: Relatório dos animais atendidos em um dado período por um dado veterinário)

# JobFlowr

JobFlowr é um software de recrutamento desenvolvido como trabalho da matéria BAN2 sobre banco relacional. Ele permite criar usuários, candidatos, vagas de trabalho,  aplicar vagas e consultar alguns relatórios.

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- PostgreSQL
- Ruby on Rails
- React
- Material UI
- Docker

## Instalação

Para instalar o JobFlowr, siga estas etapas:

1. Certifique-se de ter o Docker instalado em seu computador.
2. Clone este repositório em seu computador.
3. Navegue até a pasta do projeto e execute o seguinte comando: `docker ...`
4. Aguarde até que todas as dependências sejam instaladas e o aplicativo esteja em execução.

## Como usar

Para usar o JobFlowr, siga estas etapas:

1. Acesse o aplicativo em seu navegador em `http://localhost:3000`.
2. Crie uma conta de usuário.
3. Navegue pelas opções e suas operações.

## Licença

Este projeto é licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.
