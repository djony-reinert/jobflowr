# README

**Trabalho - BAN2**

Um banco de dados referente ao esquema relacional apresentado deverá ser produzido. O mesmo deverá conter dados previamente inseridos.

Uma aplicação deverá ser desenvolvida que faça uso e manipulação do banco de dados relacional. Tal aplicação não necessita apresentar uma interface gráfica, portanto, se a equipe preferir poderá usar a interface do próprio console da IDE escolhida (Não usar interface REST). Não será exigida uma linguagem de programação específica, entretanto, a solução exemplo e suporte da professora será apenas na linguagem Java. Esta aplicação deverá prover interfaces e respectivo funcionamento para as seguintes operações:

- Operações CRUD para todas as tabelas de entidade do banco de dados (CRUD: cadastro, recuperação (consulta), atualização (update) e remoção (delete)
- Operações de Processos de negócio para todas as tabelas associativas do banco de dados - são tabelas que relacionam mais de uma entidade (Exemplo: Efetuar consulta de um Animal da clínica - o que deve relacionar um veterinário, o animal, seu dono e contendo informações do que foi tratado na consulta como doença e medicamentos prescritos)
- Mínimo de 3 Relatórios do sistema. Cada relatório deve envolver a associação de mais de uma tabela (Exemplo: Relatório dos animais atendidos em um dado período por um dado veterinário)

# Observações
- Isto é apenas um projeto com fins educacionais, fiz mais do que o solicitado no enunciado apenas para aprimoramento pessoal e profissional.
- ActiveRecord do Rails não foi utilizado pois isso afetaria o propósito do trabalho. Após o término do trabalho reescreverei todos os métodos com ActiveRecord.
- Após a conclusão do trabalho ainda trabalharei neste projeto até desenvolver alguns recursos, são eles: Controle de sessão (incluso SSO google, facebook, etc), Upload de arquivos, Página para o candidato aplicar-se.

# Projeto

JobFlowr é um software de recrutamento desenvolvido como trabalho da matéria BAN2 sobre banco relacional. Ele permite criar usuários, candidatos, vagas de trabalho,  aplicar vagas e consultar alguns relatórios.

# Sobre a marca

"JobFlowr" é um nome para um software de recrutamento (ATS) que reproduz a palavra "flower". Como uma flor que floresce e cresce, um bom processo de contratação pode ajudar uma empresa a crescer e ter sucesso. O uso de "flow" no nome também sugere um processo de contratação tranquilo e eficiente que mantém os candidatos em movimento, desde a aplicação até a contratação.

O "r" no final do nome é uma brincadeira com a última letra de "flower" e destina-se a adicionar um pouco de singularidade e memorabilidade ao nome. Também cria uma simetria visual com o "f" no início de "flowr". No geral, "JobFlowr" é um nome cativante e memorável que sugere uma abordagem simplificada e eficiente para rastreamento e contratação de candidatos.

Sugestão de slogans:
- Bloom your business
- Bloom your business with us
- Bloom your business with JobFlowr

Sugestão de logos:

![logo2](https://user-images.githubusercontent.com/82746456/235018398-b3a624f3-22da-4467-95c0-48518f2ad43f.png)

<img width="300" src="https://user-images.githubusercontent.com/82746456/235018359-92060c01-f8f0-41a6-893a-bf29987410db.png">

<img width="300" src="https://user-images.githubusercontent.com/82746456/235018264-ff21e335-382a-4130-80e7-962bde9db8b3.png">

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- PostgreSQL
- Ruby on Rails
- React
- Material UI
- Docker

## Instalação

Para instalar o JobFlowr, siga estas etapas:

1. Certifique-se de ter o Docker instalado e em execução em seu computador.
2. Clone este repositório em seu computador.
3. Navegue até a pasta do projeto.
4. Execute o seguinte comando para construir as imagens Docker:

    ```
    docker compose build
    ```

5. Depois que as imagens forem construídas, execute o seguinte comando para iniciar os containers Docker:

    ```
    docker compose up
    ```

6. Aguarde até que todas as dependências sejam instaladas e o aplicativo esteja em execução.
7. Abra o seu navegador e acesse `http://localhost:8000` para visualizar o aplicativo JobFlowr.

## Como usar

Para usar o JobFlowr, siga estas etapas:

1. Acesse o aplicativo em seu navegador em `http://localhost:8000`.
2. Navegue pelas opções e suas operações.

Observação: Não é necessário registrar ou logar para usar a aplicação pois o controle de sessão ainda não foi implementado.

## Licença

Este projeto é licenciado sob a Licença MIT. Leia o arquivo [LICENSE](./LICENSE) para mais informações.
