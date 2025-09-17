Guia para Executar o Projeto com Docker
---------------------------------------

Para rodar este projeto, você precisará ter o **Docker** e o **Docker Compose** instalados em sua máquina. A execução é feita de forma simples, orquestrando todas as instâncias necessárias.

### 1\. Apresentação do Projeto
Esse é um projeto pessoal que usei para praticar ferramentas de mensagaeria e bancos como o Redis


A aplicação foi projetada para processar transações de forma assíncrona. A lógica do projeto funciona da seguinte forma:

1.  **Registro Inicial (Status "Pendente"):** Ao receber uma requisição POST com dados de transação, a aplicação salva o registro no banco de dados **MySQL** com um status inicial de "pending" (pendente).
    
2.  **Serviço de Mensagens:** Simultaneamente, a transação é enviada para uma fila de mensagens no **Redis**. Para este projeto, foi utilizada a biblioteca **BullMQ**, mas a mesma lógica poderia ser implementada com outras ferramentas de filas, como o **RabbitMQ** ou similares.
    
3.  **Processamento Assíncrono:** Um serviço "consumidor" lê a transação da fila do Redis. Para simular um processamento externo, como uma confirmação de transação bancária, ele aguarda por cerca de 20 segundos.
    
4.  **Atualização de Status:** Após a espera, o serviço atualiza o status do registro no MySQL, alterando-o para "success" (sucesso) ou "rejected" (reprovado), finalizando o ciclo da transação.
    
5. *   As portas padrão em que os serviços estarão rodando são: **App na 3000**, **MySQL na 3306** e **Redis na 6379**.

6. * Como não há interface, podem ser usadas as GUI do Redis e do DBeaver para ver os dados passando pelas suas inntâncias  
### 2\. Guia para Executar com Docker

Para começar, clone o repositório para sua máquina local e navegue para a pasta baixada. Todos os comandos seguintes devem ser executados em um terminal dentro desta pasta.

#### **Setup Inicial**

Clonar o repositório e entrar na pasta baixada



```bash
git clone https://github.com/Jean-Carlo89/transactions-MQ-Redis.git

```


```bash
cd  transactions-MQ-Redis
```


#### **Executando com Docker Compose**

O arquivo docker-compose.yml do projeto foi configurado para iniciar as instâncias necessárias. Para subir os serviços, basta executar o comando:

```Bash

  docker compose up
 ```

*   Este comando irá subir o banco de dados **MySQL**, a instância do **Redis** e a aplicação backend.
    
*   As portas padrão em que os serviços estarão rodando são: **App na 3000**, **MySQL na 3306** e **Redis na 6379**.
    

> **Importante:** Essas portas precisam estar livres em sua máquina local.

### 3\. Testando os Endpoints

Você pode testar as rotas da aplicação de forma rápida usando o arquivo api.http ou ferramentas de requisição HTTP.

#### **Usando o arquivo api.http no VS Code**

Para utilizar este arquivo, é recomendado ter a extensão [**Rest Client**](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) instalada no VS Code.

**Exemplo de Requisições:**

```
POST
 http://localhost:3000/api/recharge
Content-Type: application/json
body: {    "user_id": "1",    "phone_number": "+17551234587",    "amount": 12.78  } 
```

```
   GET
 http://localhost:3000/api/recharge/status?user_id=1&phone_number=+17551234587

Content-Type: application/json   
```


Você também pode copiar as informações dos exemplos acima e utilizá-las em ferramentas como **Postman**, **Insomnia** ou qualquer outro cliente de requisições HTTP para testar a aplicação.
