# Trabalho Prático - Sistemas Operacionais (DCC062)

#### Alunos: 
- Marcos Mateus     - 201835019
- Giovane Nilmer    - 201835012
- Giovane Machado   - 201876019
- Matheus Rubio     - 201876036

## Executando a aplicação

O algoritmo foi desenvolvido em javascript, mas para podermos representar seu funcionamento de uma forma mais clara, decidimos montar uma pequena pagina web utilizando React.<br>
Para podermos executar a aplicação, antes é necessário instalar as dependências do projeto, pra isso é necessário que você tenha instalado o Node na sua máquina (Aconselhamos a v16.17.1) e utilize um dos gerenciadores de pacotes do node para instalar tais dependências, npm ou yarn.
> Caso tenha dificuldades em instalar o node em seu ambiente, sugerimos este tutorial que pode te ajudar:
>   - [Como instalar o Node.js no Windows, Linux e macOS](https://www.alura.com.br/artigos/como-instalar-node-js-windows-linux-macos?gclid=Cj0KCQiAzeSdBhC4ARIsACj36uESblTYQq2EGQBMkhM9iRSpcxIudm4kW8_El_LUE1NJBx9SFfmi25kaAlnLEALw_wcB)

Tendo o Node e seu gerenciador de dependências instalado, para instalar as dependências bastar dar na pasta raíz do projeto o seguinte comando no seu terminal:

<p align=center>
  <b>npm install</b>
	ou
 <b>yarn install</b>
</p>

Com as dependências instaladas, para executar a aplicação basta ir na pasta raiz do projeto digitar o seguinte comando no seu terminal:

<p align=center>
  <b>npm run dev</b>
	ou 
 <b>yarn dev</b>
</p>

## Como utilizar a aplicação

A decisão de utilizarmos uma página web para o funcionamento do algoritmo foi tomada com a intenção de que através da página interativa seja mais fácil de entender o funcionamento do algoritmo de substituição de página que desenvolvemos, portanto, fizemos uma página bem simples.

### Input de Entrada
Este é o local da aplicação onde você irá preencher com a entrada necessária para o funcionamento da aplicação.<br>
Este input aceita qualquer somente string como conteúdo de uma página a ser carregada em memória, cada conteúdo deve ser separado por um espaço para que a aplicação identifique que são conteudos diferentes a serem carregados.<br><br>
Após preencher o input com a entrada de sua preferência, basta clicar no botão iniciar que o código irá iniciar sua execução.

<div align="center">
  <h3>Exemplos de entrada</h3>
  <img src="https://i.imgur.com/ZNjZgdF.png" alt="Input de Entrada">
  <img src="https://i.imgur.com/F2bMtQL.png" alt="Input de Entrada">
</div>

### Relógio (Clock)
Essa é a representação visual do nosso buffer, no meio se encontra o ponteiro, que representa o ponteiro presente no algoritmo de substituição de página, alterando sua posição de acordo com a necessidade do próprio algoritmo, ao seu redor temos os índices do relógio, onde cada índice do relógio representa um indice do buffer, próximo a cada índice existe um valor que representa o valor do bit de referência do espaço do buffer, na foto utilizada de exemplo o buffer se encontra vazio.<br>
No nosso projeto fixamos o tamanho do buffer da aplicação em 12, para que pudesse ser possível ter no front-end a representação de um relógio de fato.

<div align="center">
  <img src="https://i.imgur.com/1tbd6AY.png" alt="Relógio (Clock)">
</div>

### Tabela de informações sobre o buffer
Ao lado do relógio temos essa tabela com todas as informações sobre o buffer, permitindo acompanhar em tempo real a execução do código.

<div align="center">
  <img src="https://i.imgur.com/y0CuCq7.png" alt="Tabela de informações sobre o buffer">
</div>

## Algoritmo

Como implementamos um front-end React para a aplicação, o projeto possui diversos arquivos em sua estrutura, porém, o algoritmo de substituição de página está presente somente no arquivo principal do projeto, o __App.jsx__, localizado na pasta __src__.<br>
Neste arquivo, somente 3 funções são utilizadas para simular o comportamento da troca de página:
#### Iniciar
Função responsável por validar o conteúdo da entrada digitada e iniciar a execução da função principal do projeto.
<div align="center">
  <img src="https://i.imgur.com/EzijumW.png" alt="Função iniciar">
</div>

#### SearchPages
Função que inicia a simulação da paginação na aplicação, ela percorre as paginas solicitadas e pra cada página solicitada é feita a verificação se já existe no buffer, caso não exista é somado o contador __pageFaultCount__ e a função ClockPageChange é acionada, ao final de sua execução, no console é printado a quantidade de eventos page fault ocorreram. 
<div align="center">
  <img src="https://i.imgur.com/YhFXI6G.png" alt="Função iniciar">
</div>

#### ClockPageChange
Função que replica o algoritmo de substituição de página, quando acionada, verifica se o buffer possui algum espaço vazio, caso possua insere a página no espaço vazio e atualiza o bit de referência pra 1, caso não possua nenhum espaço vazio ele verifica qual a pagina mais antiga no buffer e a substitui pela atual que foi solicitada.
> Para mais informações sobre o funcionamento desse algoritmo de substituição de página:
>   - [Algoritmo de Substituição de Página(Clock)](https://en.wikipedia.org/wiki/Page_replacement_algorithm#Clock)
<div align="center">
  <img src="https://i.imgur.com/ivy7Nkx.png" alt="Função iniciar">
</div>
