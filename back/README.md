# case2-backend
Case 2 - Site do EstudoApp (Backend)


## 1. Estruturação do projeto e dependências

Iniciar projeto dentro da pasta desejada com:
```sh
npm init -y
```

Instalar dependências do projeto
```sh
npm install nodemon --save-dev
npm install bcrypt cors express sqlite sqlite3
```

- `bcrypt`: Armazena e compara senhas de forma segura
- `cors`: Permite que aplicativos em outros domínios acessem nosso servidor
- `express`: Servidor HTTP
- `nodemon`: Monitora os o projeto e reinicia o servidor quando salvamos um arquivo (hot reload)
- `sqlite`: Biblioteca auxiliar para utilizar o `sqlite3` com Promises
- `sqlite3`: Driver do banco de dados que iremos utilizar

Agora, atualize o nome do projeto no campo `"name"` e crie o campo `"type": "module"` no final do `package.json` para usar a sintaxe de import no lugar de require.

Para finalizar, remova o script de `"test"`, crie o script `"start": "nodemon server.js"`. Seu `package.json` deverá ficar parecido com este:

```json
{
  "name": "case2-back-teste",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.20"
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "sqlite": "^4.1.2",
    "sqlite3": "^5.1.4"
  },
  "type": "module"
}
```


## 2. Hello world

Como configuramos acima, o nosso script para executar o projeto tem como ponto de entrada o `server.js`. Vamos criar os nossos 2 primeiros arquivos em JavaScript:
- `src/app.js`: Cria o app express e configura suas funcionalidades
- `server.js`: Inicia o servidor do express

Em `src/app.js`, vamos criar um novo app, configuramos os pedidos de outros domínios com CORS e permitimos que o projeto receba dados em formato JSON (para usar em requisições POST, PUT e PATCH)
```js
import cors from "cors";
import express from "express";

const app = express()
app.use(cors())
app.use(express.json())

export default app
```

No `server.js`, importamos a aplicação, definimos uma porta de rede para trafegar dados e mandamos o aplicativo iniciar o servidor:
```js
import app from "./src/app.js";

const port = 3000

app.listen(port, () => {
    console.log(`Aplicação escutando na porta ${port}`)
})
```

Se você executar `npm start`, você verá que o projeto estará funcionando e respondendo às atualizações de arquivos!


## 3. Controllers e validação de dados

Precisamos separar no nosso projeto nos endereços nos quais vamos buscar os dados e como nós vamos lidar com esses pedidos. Para isso, vamos criar uma camada no nosso projeto: as controllers. Elas vão orquestrar as responsabilidades de outras camadas do nosso projeto: vão receber o pedido, repassar as informações para validadores, pedir informações para fábricas e modelos de dados e devolver as informações para o usuário.

Vamos criar os seguintes arquivos:
- `src/controller/PageController.js`: Vai cuidar dos pedidos de criação, leitura, atualização e exclusão de informações de uma página específica
- `src/controller/ProductController.js`: Vai cuidar dos pedidos de criação, leitura, atualização e exclusão de informações de uma funcionalidade específica
- `src/controller/UserController.js`: Vai cuidar dos pedidos de login na plataforma

Vamos começar pela `src/controller/UserController.js` e montar um pseudocódigo para nos auxiliar a montar a estrutura do arquivo:

```js
export default class UserController {
    static routes(app) {
        // Aqui informaremos qual método responderá à rota de login
    }

    static async login(req, res) {
        // Recebemos os campos da requisição
        // Se algum campo obrigatório não foi informado:
        //   - Devolvemos uma mensagem de erro e saímos da função
        // Buscamos um usuário no banco de dados
        // Se o usuário não existe:
        //   - Devolvemos uma mensagem de erro e saímos da função
        // Se a senha informada não é a mesma senha armazenada:
        //   - Devolvemos uma mensagem de erro e saímos da função
        // Criamos um novo token para o usuário e armazenamos no banco de dados
        // Enviamos o token criado na resposta
    }
}
```

> Dica: Utilizaremos métodos `async` toda vez que trabalharmos com Promises para utilizarmos `await` em vez de encadear várias chamadas `.then` seguidas umas das outras. Métodos `async` sempre aparecerão quando precisarmos mexer no banco de dados.

Com esse pseudocódigo podemos implementar um código que **finge** fazer a busca no banco de dados. Desta forma, podemos implementar todas as outras funcionalidades e não precisaremos nos preocupar por enquanto em como estamos buscando essas informações.

`src/controller/UserController.js`:
```js
export default class UserController {
    static routes(app) {
        // Aqui informaremos qual método responderá à rota de login
        app.post('/login', UserController.login)
    }

    static async login(req, res) {
        // Recebemos os campos da requisição
        const { email, password } = req.body
        // Se algum campo obrigatório não foi informado:
        if (!email || !password) {
            // Devolvemos uma mensagem de erro e saímos da função
            return res.status(400).send({
                message: 'Os campos "email" e "password" são obrigatórios'
            })
        }
        // Buscamos um usuário no banco de dados
        const user = {
            authToken: 'abcdef',
            password: '123'
        }
        // Se o usuário não existe:
        if (!user) {
            // Devolvemos uma mensagem de erro e saímos da função
            return res.status(404).send({
                message: 'Usuário não encontrado'
            })
        }
        // Se a senha informada não é a mesma senha armazenada:
        const passwordsMatch = password === user.password
        if (!passwordsMatch) {
            // Devolvemos uma mensagem de erro e saímos da função
            return res.status(401).send({
                message: 'Senha incorreta'
            })
        }
        // Criamos um novo token para o usuário e armazenamos no banco de dados
        user.authToken = 'fedcba'
        // Enviamos o token criado na resposta
        res.status(200).send({
            token: user.authToken
        })
    }
}
```

Vamos remover os comentários desse arquivo já que estruturamos o nosso código! Agora vamos aplicar o mesmo processo para os outros dois arquivos: Montaremos um pseudocódigo nos comentários para entender qual a lógica seguir e depois escreveremos o código nos guiando pelos comentários! Os outros arquivos ficarão assim:

`src/controller/PageController.js`:
```js
export default class PageController {
    static routes(app) {
        app.get('/paginas/:id', PageController.listar)
        app.patch('/paginas/:id', PageController.atualizar)
    }

    static async listar(req, res) {
        const {id} = req.params

        const page = {
            title: `Página ${id}`,
            text: 'Lorem ipsum dor sit amet'
        }
        if (!page) {
            return res.status(404).send({
                message: 'Página não encontrada'
            })
        }

        res.status(200).send({
            message: 'Sucesso ao buscar página',
            data: page
        })
    }

    static async atualizar(req, res) {
        const {id} = req.params
        const {title, text} = req.body

        const page = {
            title: 'Título antigo',
            text: 'Texto antigo'
        }
        if (!page) {
            return res.status(404).send({
                message: 'Página não encontrada'
            })
        }

        if (title) {
            page.title = title
        }
        if (text) {
            page.text = text
        }

        res.status(200).send({
            message: 'Sucesso ao alterar dados da página',
            data: page
        })
    }
}
```

`src/controller/ProductController.js`:
```js
export default class ProductController {
    static routes(app) {
        app.post('/produtos', ProductController.inserir)
        app.get('/produtos', ProductController.listarTodos)
        app.patch('/produtos/:id', ProductController.atualizar)
        app.delete('/produtos/:id', ProductController.deletar)
    }

    static async inserir(req, res) {
        const { title, description } = req.body
        if (!title || !description) {
            return res.status(400).send({
                message: 'Os campos "title" e "description" são obrigatórios'
            })
        }

        const product = { title, description }

        res.status(200).send({
            message: 'Produto criado com sucesso!',
            data: product
        })
    }

    static async listarTodos(req, res) {
        const products = [
            {
                title: 'Produto 1',
                description: 'Descrição produto 1'
            },
            {
                title: 'Produto 2',
                description: 'Descrição produto 2'
            }
        ]
        res.status(200).send({
            message: 'Produtos listados com sucesso!',
            data: products
        })
    }

    static async atualizar(req, res) {
        const {id} = req.params

        const product = {
            title: `Produto ${id}`,
            description: `Descrição produto ${id}`
        }
        if (!product) {
            return res.status(404).send({
                message: `O produto de id ${id} não existe`
            })
        }

        const {title, description} = req.body
        if (title) {
            product.title = title
        }
        if (description) {
            product.description = description
        }

        res.status(200).send({
            message: 'Produto alterado com sucesso!',
            data: product
        })
    }

    static async deletar(req, res) {
        const {id} = req.params

        const product = {
            title: `Produto ${id}`,
            description: `Descrição produto ${id}`
        }
        if (!product) {
            return res.status(404).send({
                message: `O produto de id ${id} não existe`
            })
        }

        res.status(200).send({
            message: 'Produto deletado com sucesso!'
        })
    }
}
```

Para finalizar, atualize o seu `src/app.js` importando a lista de controllers. O seu arquivo ficará assim:

```js
import cors from "cors";
import express from "express";

import UserController from './controller/UserController.js'
import ProductController from './controller/ProductController.js'
import PageController from './controller/PageController.js'

const app = express()
app.use(cors())
app.use(express.json())

UserController.rotas(app)
ProductController.rotas(app)
PageController.rotas(app)

export default app
```

Desta forma, todas as controllers conseguem configurar suas rotas! Faça o teste das rotas pelo Postman, Insomnia ou alguma outra ferramenta para testar APIs (não se esqueça de iniciar o projeto com `npm start`). Exemplos:

![image](https://user-images.githubusercontent.com/28551993/217337507-899cb46a-4def-42ed-b431-2652ff28407a.png)
![image](https://user-images.githubusercontent.com/28551993/217338587-af8575bc-1608-4336-a814-c15c5b7ca887.png)

## 4. Relacionando tabelas e classes

O nosso próximo passo é conectar o nosso servidor a um banco de dados. Afinal, queremos que nossas informações sejam mantidas mesmo que a aplicação lance algum erro ou seja reiniciada.

Vamos trabalhar com uma nova camada, as **models**. Neste projeto elas fazem o trabalho dos DAOs (Data Access Objects) já que elas também vão acessar o banco de dados e nos devolver models criadas. Vamos trazer uma visão mais parecida com a de algumas bibliotecas de back-end que facilitam o relacionamento de modelos de dados com o banco em si. Essas bibliotecas usam a técnica ORM (Object Relational Mapping), que aproveita as vantagens da programação orientação a objetos para mapear objetos de uma determinada linguagem de programação para uma tabela no banco com suas respectivas colunas. A model nesse formato possui métodos de fabricação, busca, deleção e atualização de dados e envolve todas essas funcionalidades em suas classes. Um exemplo de biblioteca famosa de ORM para JavaScript é o Sequelize.

Até o final deste passo 4 você terá duas opções:
1. Tomar a liberdade de instalar uma biblioteca e criar as models a partir de sua documentação, ou
2. Reproduzirmos do zero um comportamento de ORM e entender como funciona por baixo dos panos algumas bibliotecas que implementam essa técnica

Caso escolha a opção 1, você deve ignorar o restante deste passo 4 todo e usar as models de acordo com a documentação da biblioteca escolhida. Atualize os métodos de criação, leitura, atualização e deleção nas controllers e pule para o passo 5.

Caso escolha a opção 2, continue seguindo este passo 4!

### 4.1. Model genérica

Uma das vantagens de usar ORMs é que eles deixam a maior parte da carga pesada em uma classe geral, a qual será herdada por outras classes que poderão usar seus métodos de forma customizada. O primeiro exemplo que vamos montar é de como encontrar, de acordo com a model que estamos usando, qual o nome da tabela em que guardaremos seus dados.

> Dica: Utilizaremos tanto métodos **estáticos** quanto métodos **de instância**. Em ambos contextos a palavra chave *this* significará **coisas diferentes**. Revisaremos isso abaixo, mas é importante que você se atente a qual tipo de método estaremos usando e por quê.

Como métodos estáticos não pertencem a uma instância em específico, elas não dependem da existência de uma instância para serem executados. No fundo, elas são funções como quaisquer outras, mas organizadas em um contexto diferente. Geralmente métodos estáticos são usados para criar instâncias daquela classe (agem como uma função *factory*), fazem buscas ou processam algum tipo de dado relacionado àquela classe. Alguns exemplos de métodos estáticos:
```js
const milliseconds = Date.now() // Devolve o número de milissegundos passados a partir do início dos relógios dos computadores (não precisa que uma data exista para ser chamado)
const letter = String.fromCharCode(65) // Cria uma string a partir de um código UTF8 (não precisa que uma string exista para ser chamado)
const number = Math.random() // Devolve um número aleatório entre 0 e 1. Não existem objetos do tipo Math, mas as funções matemáticas são organizadas dentro deste contexto
```

Alguns exemplos de métodos de instância:
```js
const yelling = 'hello'.toUpperCase() // Devolve a string em letras maiúsculas (precisa que uma string exista para ser chamado)
const today = new Date()
const year = today.getFullYear() // Devolve o ano de uma data (precisa que um objeto do tipo Date exista para ser chamado)
```

Com essa revisão rápida de métodos estáticos, vamos criar nossa model genérica: Ela representará uma entidade (tabela) no nosso banco de dados. Crie o arquivo `src/DAO/ApplicationModel.js` com o conteúdo abaixo:
```js
export default class ApplicationModel {
    static getTableName() {
        return this.name.toLowerCase()
    }
}
```

> Dica: No exemplo acima, a palavra chave *this* referencia a classe construtora pois estamos em um método estático e não uma instância dessa classe. Desta forma, como classes são do tipo "function", elas possuem a propriedade "name" que permite acessar o nome da classe

Agora, crie as outras 3 models do nosso projeto (página, produto e usuário) nos seguintes arquivos:
`src/DAO/Page.js`
```js
import ApplicationModel from "./ApplicationModel.js"

export default class Page extends ApplicationModel {

}
```

`src/DAO/Product.js`
```js
import ApplicationModel from "./ApplicationModel.js"

export default class Product extends ApplicationModel {

}
```

`src/DAO/User.js`
```js
import ApplicationModel from "./ApplicationModel.js"

export default class User extends ApplicationModel {

}
```

Desta forma, cada model terá um nome diferente para sua tabela!
```js
Page.getTableName() // "page"
Product.getTableName() // "product"
User.getTableName() // "user"
```

> Por que `User.getTableName()` retorna `"user"` e não `"applicationmodel"` já que o método foi declarado na classe `ApplicationModel`? É porque estamos tirando vantagem do **polimorfismo**: uma classe filha pode sobrescrever os comportamentos de uma classe mãe. No JavaScript isso também significa que se uma classe filha chama métodos de uma classe mãe, as chamadas para *this* vão referenciar a classe filha, pois é ela que está executando os métodos! Desta forma, o método `.getTableName()` está sendo executado por `User` e o código acaba sendo traduzido para `return User.name.toLowerCase()` naquela linha de código. Esse é a base fundamental para os comportamentos que montaremos na nossa model.

### 4.2. Tradução de dados

Como vimos anteriormente, ORM significa *Object Relational Mapping*. Isto significa que relacionaremos propriedades das nossas classes para colunas no banco de dados. Isso é muito importante porque às vezes os nomes das colunas nos bancos de dados são diferentes das propriedades na nossa linguagem de programação. Por isso, precisamos criar uma tabela de tradução para saber qual coluna do banco referencia qual propriedade da classe e vice versa. Por exemplo, imagine o seguinte cenário de uma tabela `user` e uma classe `User` e no passo a passo para traduzir os dados:

Nome da propriedade na classe | Nome da coluna no BD
--- | ---
id | ID
email | EMAIL
encryptedPassword | ENCRYPTED_PASSWORD
authToken | AUTH_TOKEN

Ao fazer uma busca de um objeto no banco, informaremos qual o campo da classe gostaríamos de pesquisar. Queremos buscar um usuário pelo seu token de autorização, então o passo a passo seria:
- Informar que queremos buscá-lo pela propriedade `authToken` e fornecer seu valor
- A classe realizará uma tradução **propriedade -> coluna** e essa propriedade será traduzida para `AUTH_TOKEN` para iniciar a busca no banco
- Os dados serão devolvidos com a nomenclatura de colunas (`ID`, `EMAIL`, `ENCRYPTED_PASSWORD` e `AUTH_TOKEN`) e cada propriedade precisará de uma tradução **coluna -> propriedade**
- Uma instância vazia da model será criada e seus campos serão populados com as informações traduzidas
- A instância preenchida será devolvida para uso

Para poder realizar as traduções precisaremos guardar a tabela de tradução. Para isso, vou utilizar duas estruturas de dados do tipo `Map`: uma para traduzir nomes de propriedades para colunas e o outro para guardar o sentido contrário da tradução. Além disso, criaremos um método para associar essas duas informações de uma vez só e um método obrigatório para configurar todas as models:

`src/DAO/ApplicationModel.js`
```js
export default class ApplicationModel {
    static _propertyToColumn = new Map()
    static _columnToProperty = new Map()

    static configurar() {
        throw new Error('Você deve criar sua própria versão de SuaModel.configurar! Dentro dela chame o método "SuaModel.associar" para relacionar as propriedades da model com as colunas do banco!')
    }

    static associar( property, column ) {
        this._propertyToColumn.set(property, column)
        this._columnToProperty.set(column, property)
    }

    static getTableName() {
        return this.name.toLowerCase()
    }
}
```

Desta forma, podemos criar as propriedades nas nossas models e associar com as colunas do banco em cada uma das classes:

`src/DAO/Page.js`
```js
import ApplicationModel from "./ApplicationModel.js"

export default class Page extends ApplicationModel {
    id; title; text;

    static configurar() {
        Page.associar('id', 'ID')
        Page.associar('title', 'TITLE')
        Page.associar('text', 'TEXT')
    }
}
```

`src/DAO/Product.js`
```js
import ApplicationModel from "./ApplicationModel.js"

export default class Product extends ApplicationModel {
    id; title; description;

    static configurar() {
        Product.associar('id', 'ID')
        Product.associar('title', 'TITLE')
        Product.associar('description', 'DESCRIPTION')
    }
}
```

`src/DAO/User.js`
```js
import ApplicationModel from "./ApplicationModel.js"

export default class User extends ApplicationModel {
    id; email; encryptedPassword; authToken;

    static configurar() {
        User.associar('id', 'ID')
        User.associar('email', 'EMAIL')
        User.associar('encryptedPassword', 'ENCRYPTED_PASSWORD')
        User.associar('authToken', 'AUTH_TOKEN')
    }
}
```

Agora que temos uma tabela de tradução funcional, vamos criar dois métodos bem parecidos para nos auxiliar:
- Traduzir uma model para uma linha do banco de dados: `_toDatabase`
    ```js
        static _toDatabase(model) {
            // Se o modelo não foi informado
            if (!model) {
                // Devolvemos nulo
                return null
            }
            // Buscamos todos os nomes de propriedades da model
            const properties = Object.keys(model)
            // Criamos uma linha vazia
            const row = {}
            // Passamos por cada nome de propriedade
            for (const property of properties) {
                // Traduzimos para o nome da coluna
                const column = this._propertyToColumn.get(property)
                // Armazenamos o dado da model caso ele exista, senão armazenamos nulo
                row[column] = model[property] ?? null
            }
            // Devolvemos a linha do banco
            return row
        }
    ```
- Traduzir resultado do banco de dados para uma model: `_toModel`
    ```js
        static _toModel(dbResult) {
            // Se o resultado é vazio ou não informado
            if (!dbResult) {
                // Devolvemos nulo
                return null
            }
            // Buscamos todos os nomes de colunas do resultado
            const columns = Object.keys(dbResult)
            // Criamos uma instância vazia
            const instance = new this()
            // Passamos por cada nome de coluna
            for (const column of columns) {
                // Traduzimos para o nome da propriedade
                const property = this._columnToProperty.get(column)
                // Armazenamos o dado da coluna caso ele exista, senão armazenamos nulo
                instance[property] = dbResult[column] ?? null
            }
            // Devolvemos a instância preenchida
            return instance
        }
    ```

> OBS: Percebeu que ali em cima executamos um `new this()`? Esse código pode parecer estranho, mas se lembra que a palavra *this* em um método estático referencia a classe construtora e não uma instância existente? Isso significa que se esse trecho de código for executado pela classe `User`, seria o equivalente a executar um `new User()`; se esse trecho de código for executado pela classe `Page`, seria o equivalente a executar um `new Page()` e assim por diante! **Mas lembre-se que esse comportamento só acontece em métodos estáticos!** Fazer isso em um método de instância geraria um erro: `Uncaught TypeError: this is not a constructor`!

Nossa model genérica ficará assim:
```js
export default class ApplicationModel {
    static _propertyToColumn = new Map()
    static _columnToProperty = new Map()

    static configurar() {
        throw new Error('Você deve criar sua própria versão de SuaModel.configurar! Dentro dela chame o método "SuaModel.associar" para relacionar as propriedades da model com as colunas do banco!')
    }

    static associar( property, column ) {
        this._propertyToColumn.set(property, column)
        this._columnToProperty.set(column, property)
    }

    static getTableName() {
        return this.name.toLowerCase()
    }

    static _toModel(dbResult) {
        if (!dbResult) {
            return null
        }
        const columns = Object.keys(dbResult)
        const instance = new this()
        for (const column of columns) {
            const property = this._columnToProperty.get(column)
            instance[property] = dbResult[column] ?? null
        }
        return instance
    }

    static _toDatabase(model) {
        if (!model) {
            return null
        }
        const properties = Object.keys(model)
        const row = {}
        for (const property of properties) {
            const column = this._propertyToColumn.get(property)
            row[column] = model[property] ?? null
        }
        return row
    }
}
```

Se você colocar temporariamente esse trecho de código no final do seu arquivo `src/DAO/User.js` para testar as configurações, verá que nossa tradução está funcionando!

```js
User.configurar()

const usr = new User()
usr.email = "salve@com.br"

console.log( User._toDatabase(usr) )
// { ID: null, EMAIL: 'salve@com.br', ENCRYPTED_PASSWORD: null, AUTH_TOKEN: null }

console.log( User._toModel({
    ID: 3,
    EMAIL: 'salve@com',
    AUTH_TOKEN: 'eita',
    ENCRYPTED_PASSWORD: 'jooj'
}) )
// User { id: 3, email: 'salve@com', encryptedPassword: 'jooj', authToken: 'eita' }
```

Por último, importe as models no seu `src/app.js` e, para todas as models, execute o comando `.configurar()`. Seu arquivo ficará assim:

```js
import cors from "cors";
import express from "express";

import UserController from './controller/UserController.js'
import ProductController from './controller/ProductController.js'
import PageController from './controller/PageController.js'

import PageDAO from './DAO/Page.js'
import ProductDAO from './DAO/Product.js'
import UserDAO from './DAO/User.js'

const app = express()
app.use(cors())
app.use(express.json())

PageDAO.configurar()
ProductDAO.configurar()
UserDAO.configurar()

UserController.rotas(app)
ProductController.rotas(app)
PageController.rotas(app)

export default app
```

### 4.3. Acesso ao banco de dados

Até agora vimos como descobrir qual o nome da tabela da nossa model e qual a tradução dos seus campos para colunas do banco, mas ainda não fizemos nenhuma conexão com ele! Vamos criar um arquivo `src/infra/connection.js` para poder criar conexões com o banco e realizar consultas:

```js
import sqlite3 from "sqlite3"
import { open } from "sqlite"

export const getConnection = () => open({
    filename: './db.sqlite',
    driver: sqlite3.verbose().Database
})
```

Esse código abrirá uma conexão com um banco sqlite3 no arquivo raiz `db.sqlite`. Não se preocupe, se o arquivo não existir ele será criado automaticamente.

### 4.3.1. Scripts auxiliares

Geralmente quando iniciamos um projeto queremos pelo menos alguns dados populados para a gente. Nem sempre queremos limpar as linhas de uma tabela ou apagar completamente o banco de dados. Por isso criaremos alguns scripts para executar alguns comandos auxiliares em momentos necessários:
- `clear`: Limpa os dados das tabelas mas as mantém. Útil antes de executar um `seed`.
- `drop`: Deleta todas as tabelas com todos os dados dentro. Útil quando a tabela mudou de formato (ganhou/perdeu colunas ou um tipo de dado foi alterado).
- `migrate`: Cria todas as tabelas do banco de dados, sem nenhuma linha preenchida. Útil após um `drop` ou da primeira vez subindo seu banco de dados.
- `seed`: Popula linhas de tabelas. Útil antes de executar o seu projeto.

Vamos aproveitar a nossa model genérica e criar os três primeiros métodos (o seed deixaremos para depois):

`src/DAO/ApplicationModel.js`
```js
// Fora da classe...
import { getConnection } from "../database/connection.js"

// Dentro da classe...
    // ...

    static async _clear() {
        const connection = await getConnection()
        await connection.exec(`DELETE FROM ${this.getTableName()};`)
        await connection.close()
    }

    static async _drop() {
        const connection = await getConnection()
        await connection.exec(`DROP TABLE IF EXISTS ${this.getTableName()};`)
        await connection.close()
    }

    static async _migrate(columnsConfig) {
        const connection = await getConnection()
        await connection.exec(`CREATE TABLE IF NOT EXISTS ${this.getTableName()} (${columnsConfig.join(',')});`)
        await connection.close()
    }

    // ...
```

Vamos criar três arquivos em uma nova pasta: `scripts/clear.js`, `scripts/drop.js` e `scripts/migrate.js`:

`scripts/clear.js`
```js
import Page from "../src/DAO/Page.js"
import Product from "../src/DAO/Product.js"
import User from "../src/DAO/User.js"

const models = [
    Page, Product, User
]

const clear = async () => {
    await Promise.all(models.map(model => model._clear()))
}

clear()
```

`scripts/drop.js`
```js
import Page from "../src/DAO/Page.js"
import Product from "../src/DAO/Product.js"
import User from "../src/DAO/User.js"

const models = [
    Page, Product, User
]

const drop = async () => {
    await Promise.all(models.map(model => model._drop()))
}

drop()
```

`scripts/migrate.js`
```js
import Page from "../src/DAO/Page.js"
import Product from "../src/DAO/Product.js"
import User from "../src/DAO/User.js"

const migrate = async () => {
    await Page._migrate([
        '"ID" INTEGER PRIMARY KEY NOT NULL',
        '"TITLE" TEXT NOT NULL',
        '"TEXT" TEXT NOT NULL'
    ])
    await Product._migrate([
        '"ID" INTEGER PRIMARY KEY NOT NULL',
        '"TITLE" TEXT NOT NULL',
        '"DESCRIPTION" TEXT NOT NULL'
    ])
    await User._migrate([
        '"ID" INTEGER PRIMARY KEY NOT NULL',
        '"EMAIL" TEXT NOT NULL',
        '"ENCRYPTED_PASSWORD" TEXT NOT NULL',
        '"AUTH_TOKEN" TEXT'
    ])
}

migrate()
```

Agora, no seu `package.json` adicione os seguintes dados dentro do campo `"scripts"`:

```json
    "clear": "node scripts/clear.js",
    "drop": "node scripts/drop.js",
    "migrate": "node scripts/migrate.js",
```

Pronto! Agora é só rodar
- `npm run drop` para apagar tudo: quando a estrutura das suas tabelas mudarem
- `npm run migrate` primeira vez executando ou após um drop para criar as tabelas
- `npm run clear` para limpar os dados do banco e iniciar com o banco novinho

Recomendo instalar a extensão [SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite) do VSCode para explorar as tabelas criadas. Após executar `npm run migrate`, clique com o botão direito do mouse em cima do arquivo `db.sqlite` e clique em `Open Database`. O VSCode abrirá o `SQLITE EXPLORER` e você poderá verificar que as suas tabelas estão com as colunas configuradas corretamente.

![image](https://user-images.githubusercontent.com/28551993/217203449-f8762b29-b555-4f72-bedc-a678d70de562.png)

### 4.3.2. Métodos de instância

Já que nós temos uma estrutura de tabelas montadas e podemos visualizar esses dados nas tabelas, vamos aprender a criar, atualizar e deletar informações com as nossas models. Cada instância (objeto criado a partir de uma classe) de cada model representará uma e somente uma linha do banco de uma tabela.

A ideia é que a gente consiga realizar esse tipo de operação de uma forma simples:

```js
const about = new Page()
about.title = 'Sobre'
about.text = 'Um site muito maneiro'
await about.save() // Salvaria no banco uma nova linha

const products = /* Busca no banco todos os produtos de algum jeito */
products[0].description = 'Descrição muito boa!'
await products[0].save() // Atualizaria uma linha do banco

await products[1].delete() // Removeria uma linha do banco
```

Perceba que o `save` possui duas funcionalidades: criar um dado e atualizar um dado. Isso se dá porque quando criamos uma nova instância diretamente no nosso código (por exemplo, `new Page()`), não a criamos diretamente no banco. No geral, ela não tem um identificador e precisa ser armazenada no banco para que ganhe um identificador único.

Já a atualização é feita quando essa model foi criada dentro de uma função de busca: Quando fazemos esse pedido para o banco ele traduz os dados das tabelas e cria uma ou mais instâncias na hora com a identificação e os dados das colunas (se lembra do `new this()` lá em cima?) encontradas, depois ele devolve essas instâncias para utilizarmos seus dados.

De uma forma ou de outra, precisamos de pelo menos uma informação que vai diferenciar um dado de outro: uma chave primária! Para não aumentarmos mais ainda a complexidade, vamos assumir que todas as nossas models usam id como chave primária (no banco pode ser qualquer outra coisa, por exemplo `pk_cpf`, desde que faça a associação com o `id` na model depois). Vamos criar esse campo das instâncias e o método `save` para as instâncias também:

`src/DAO/ApplicationModel.js`
```js
    //...

    id;

    async save() {
        if (this.id) {
            // Atualiza linha já que possui identificador único definido
        } else {
            // Cria linha no banco e atualiza o objeto no código com o novo identificador único criado na hora da inserção
        }
    }

    //...
```

> OBS: Não estamos mais trabalhando com métodos estáticos! Agora o *this* está se referindo a uma instância da classe criada com `new`!

Vamos implementar as funcionalidades do método `save` e entender o que está acontecendo:

`src/DAO/ApplicationModel.js`
```js
    //...

    id;

    async save() {
        // Busca o nome da tabela
        const table = this.constructor.getTableName()
        // Busca a tabela de tradução de propriedade para coluna
        const propToCol = this.constructor._propertyToColumn

        // Se transforma em um objeto traduzido para colunas do banco de dados
        const dbObj = this.constructor._toDatabase(this)
        // Guarda o nome das colunas do banco
        const columns = Object.keys(dbObj)
        // Guarda os valores que serão inseridos nas colunas
        const values = Object.values(dbObj)

        const connection = await getConnection()
        // Possui id: atualizar
        if (this.id) {
            // Gera a query no formato do UPDATE
            const updates = columns.map(column => `${column}=?`)
            // Executa um update na tabela, informa quais colunas que serão modificadas, seus valores e qual linha será afetada
            await connection.run(
                `UPDATE ${table} SET ${updates} WHERE ${propToCol.get('id')} = ?;`,
                ...values,
                this.id
            )
        // Não possui id: inserir
        } else {
            // Busca o último id da inserção executada informando o nome das colunas e os valores inseridos
            const { lastID } = await connection.run(
                `INSERT INTO ${table} (${columns}) VALUES (${values.map(_ => '?').join(',')});`,
                ...values
            )
            // Atualiza o objeto do código para refletir as alterações do banco de dados
            this.id = lastID
        }
        // Finaliza a conexão
        await connection.close()
    }

    //...
```

> Perceba que para acessar o método estático `.getTableName()` usei `this.constructor.getTableName()`. Fiz isso pois não estamos mais em um método estático e sim de instância! Para acessar um campo estático em uma instância de `User`, por exemplo, precisaríamos saber qual é a sua própria classe. A classe construtora está disponível em métodos de instância no campo `this.constructor` de qualquer objeto do JavaScript.

Para testar que este método está funcionando, vamos criar o nosso último script auxiliar: `seed`!

Na `src/DAO/ApplicationModel.js`, adicione junto aos outros métodos auxiliares:
```js
    // ...

    static async _seed(models) {
        for ( const model of models ) {
            await model.save()
        }
    }

    // ...
```

Desta forma só precisamos informar um array de instâncias que todas elas serão criadas e inseridas no banco!

Crie um arquivo `scripts/seed.js` e coloque o seguinte conteúdo:

```js
import Page from "../src/DAO/Page.js"
import Product from "../src/DAO/Product.js"
import User from "../src/DAO/User.js"

const models = [
    Page, Product, User
]

const seed = async () => {
    // Precisamos configurar as models antes das inserções para ter acesso à tabela de tradução
    models.forEach(model => model.configurar())

    const page = new Page()
    page.title = 'Sobre'
    page.text = 'Lorem ipsum dolor sit amet.'
    const pages = [page]

    const products = []
    for (let i=1; i<=10; i++) {
        const prod = new Product()
        prod.title = `Produto ${i}`
        prod.description = `Descrição do produto ${i}`
        products.push(prod)
    }

    const admin = new User()
    admin.email = "admin@case2.com"
    admin.encryptedPassword = '12345678'
    const users = [admin]

    await Page._seed(pages)
    await Product._seed(products)
    await User._seed(users)
}

seed()
```

Agora, adicione no campo `"script"` do seu `package.json` mais uma propriedade:
```json
    "seed": "node scripts/seed.js"
```

Pronto! Agora só executar `npm run seed` e ver que os dados foram populados nas tabelas!

![image](https://user-images.githubusercontent.com/28551993/217203700-acfdf78f-5633-430a-8953-51ed3e218217.png)
![image](https://user-images.githubusercontent.com/28551993/217203745-da6e788b-135d-4ea7-b718-7dfaa1a4d68f.png)
![image](https://user-images.githubusercontent.com/28551993/217203795-9889d505-8db5-4009-9786-8f43b071cf18.png)

### 4.3.3. Integração da primeira rota de produtos na controller

Não temos acesso a todas as letras do CRUD, por enquanto só temos o C (create): Não conseguimos realizar leituras porque ainda não temos nenhum método para listar dados, nem conseguimos atualizar ou deletar pois precisaríamos de informações de pesquisa (listagem). Porém, já conseguimos integrar uma rota completamente! Vamos criar e apagar alguns dados e ver as mudanças no explorer!

Vamos alterar o método `inserir` do arquivo `src/controller/ProductController.js`:
```js
    static async inserir(req, res) {
        const { title, description } = req.body
        if (!title || !description) {
            return res.status(400).send({
                message: 'Os campos "title" e "description" são obrigatórios'
            })
        }

        const product = new Product()
        product.title = title
        product.description = description
        await product.save()

        res.status(200).send({
            message: 'Produto criado com sucesso!',
            data: product
        })
    }
```

Vamos executar um `npm run clear` e um `npm run seed` para garantirmos um ambiente inicial de 10 produtos. Depois disso, vamos executar um POST para a rota de criação de produtos:

![image](https://user-images.githubusercontent.com/28551993/217339164-9a9ebdd3-dbd9-4251-ae64-7a4972db8644.png)

E agora no explorer:

![image](https://user-images.githubusercontent.com/28551993/217204165-ea44a697-839e-406d-9811-fc7222adcf3b.png)

Maravilha! Agora vamos ver como podemos buscar os dados com as nossas models!

### 4.3.4. Busca e atualização

Uma das principais funcionalidades de busca é a listagem completa. Geralmente gostaríamos de devolver todos os dados, sem nenhum filtro. Às vezes, gostaríamos de encontrar somente uma linha de uma tabela em específico, buscando por valores exatos. Nós vamos implementar dois métodos, o `findAll` e o `findByProperty` que fazem exatamente o que foi citado acima.

```js
    //...

    static async findAll() {
        const connection = await getConnection()
        const all = await connection.all(
            `SELECT * FROM ${this.getTableName()}`
        )
        await connection.close()
        // Importante traduzir os resultados do banco para as models que podemos usar
        return all.map( result => this._toModel(result) )
    }

    static async findByProperty(property, value) {
        const connection = await getConnection()
        // Traduz o nome da propriedade para o nome da coluna
        const column = this._propertyToColumn.get(property)
        const result = await connection.get(
            `SELECT * FROM ${this.getTableName()} WHERE ${column} = ?`,
            value
        )
        await connection.close()
        // Traduz de volta o resultado para uma model
        return this._toModel(result)
    }

    //...
```

Com estes dois últimos métodos conseguimos implementar todos os métodos que faltavam!

### 4.3.5. Últimas rotas nas controllers

`src/controller/UserController.js`
```js
// Fora da classe...
import User from "../DAO/User.js"

// Dentro da classe...
    //...

    static async login(req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({
                message: 'Os campos "email" e "password" são obrigatórios'
            })
        }

        const user = await User.findByProperty('email', email)
        if (!user) {
            return res.status(404).send({
                message: 'Usuário não encontrado'
            })
        }

        const passwordsMatch = password === user.encryptedPassword
        if (!passwordsMatch) {
            return res.status(401).send({
                message: 'Senha incorreta'
            })
        }

        user.authToken = 'fedcba'
        await user.save()

        res.status(200).send({
            token: user.authToken
        })
    }

    //...
```

`src/controller/PageController.js`
```js
// Fora da classe...
import Page from "../DAO/Page.js"

// Dentro da classe...
    //...

    static async listar(req, res) {
        const {id} = req.params
        const page = await Page.findByProperty('id', id)
        if (!page) {
            return res.status(404).send({
                message: 'Página não encontrada'
            })
        }
        res.status(200).send({
            message: 'Sucesso ao buscar página',
            data: page
        })
    }

    static async atualizar(req, res) {
        const {id} = req.params
        const {title, text} = req.body
        const page = await Page.findByProperty('id', id)
        if (!page) {
            return res.status(404).send({
                message: 'Página não encontrada'
            })
        }
        if (title) {
            page.title = title
        }
        if (text) {
            page.text = text
        }
        await page.save()
        res.status(200).send({
            message: 'Sucesso ao alterar dados da página',
            data: page
        })
    }

    //...
```

`src/controller/ProductController.js`
```js
// Fora da classe...
import Product from "../DAO/Product.js"

// Dentro da classe...
    //...

    static async listarTodos(req, res) {
        const products = await Product.findAll()
        res.status(200).send({
            message: 'Produtos listados com sucesso!',
            data: products
        })
    }

    static async atualizar(req, res) {
        const {id} = req.params

        const product = await Product.findByProperty('id', id)
        if (!product) {
            return res.status(404).send({
                message: `O produto de id ${id} não existe`
            })
        }

        const {title, description} = req.body
        if (title) {
            product.title = title
        }
        if (description) {
            product.description = description
        }

        await product.save()

        res.status(200).send({
            message: 'Produto alterado com sucesso!',
            data: product
        })
    }

    static async deletar(req, res) {
        const {id} = req.params

        const product = await Product.findByProperty('id', id)
        if (!product) {
            return res.status(404).send({
                message: `O produto de id ${id} não existe`
            })
        }

        await product.delete()

        res.status(200).send({
            message: 'Produto deletado com sucesso!'
        })
    }

    //...
```

Teste todas as rotas! Agora todas elas funcionam!

## 5. Autenticação e autorização

Uma parte importantíssima na hora de montar as aplicações é a **restrição de acesso**. Nem sempre gostaríamos que todos tivessem acesso a todas as funcionalidades. Por exemplo, um desconhecido pode entrar no nosso site e apagar todos os produtos! Para isso, precisamos de um sistema de autenticação.

Este sistema será simples, pois teremos dois tipos de rotas:
- Abertas
- Protegidas

As rotas abertas aceitam o pedido de qualquer usuário. Neste exemplo, as nossas rotas abertas serão a de busca de informação de página, listagem de produtos e tentativa de login.

As rotas protegidas só serão liberadas se você possuir um "crachá" te identificando. Você só conseguirá obter este "crachá" se conseguir realizar um login com sucesso na plataforma. Em sistemas web chamamos este "crachá virtual" de *token de autorização*.

### 5.1. Cabeçalhos, tokens e middleware

O token de autorização só será enviado para o servidor em uma parte específica do nosso pedido chamada cabeçalho (servirá como se fosse uma assinatura do usuário, ou um crachá virtual). Ao chegar no servidor, caso a rota seja protegida, o pedido irá procurar essa credencial e verificar no banco se ela existe. Caso ela não exista, não permitiremos o acesso à aplicação.

Para isso, vamos criar uma **middleware**. Uma **middleware** é uma função que executa antes ou depois do código da controller para tratar o pedido de alguma forma. Ela aceita a request atual, o objeto da response e um parâmetro extra: next! Este parâmetro será a próxima função que será executada para esta rota. Ou seja, se quisermos seguir o processamento do pedido na controller executaremos a função `next()` e se quisermos rejeitar o pedido saímos da função e mandamos uma resposta de erro.

Crie o arquivo `src/middleware/authorization.js` e coloque o seguinte:

```js
import User from "../DAO/User.js"

export const verificarToken = async (req, res, next) => {
    const token = req.headers['x-auth-token']
    if (!token) {
        res.status(401).send({
            success: false,
            message: 'Token não informado!'
        })
        return
    }
    const user = await User.findByProperty('authToken', token)
    if (!user) {
        res.status(401).send({
            success: false,
            message: 'Não autorizado!'
        })
        return
    }
    next()
}
```

O código acima faz exatamente o que falamos anteriormente: Se um token não for informado no cabeçalho ou se o token não pertencer a nenhum usuário, rejeitamos o pedido. Caso contrário, continuamos o processamento!

Agora atualize as controllers para usar essa middleware em rotas protegidas:

`src/controller/PageController.js`
```js
// Fora da classe...
import { verificarToken } from "../middleware/authorization.js"

// Dentro da classe...
    // ...
        app.get('/paginas/:id', PageController.listar) // Aberta
        app.patch('/paginas/:id', verificarToken, PageController.atualizar) // Protegida
    // ...
```

`src/controller/ProductController.js`
```js
// Fora da classe...
import { verificarToken } from "../middleware/authorization.js"

// Dentro da classe...
    // ...
        app.post('/produtos', verificarToken, ProductController.create) // Protegida
        app.get('/produtos', ProductController.listarTodos) // Aberta
        app.patch('/produtos/:id', verificarToken, ProductController.atualizar) // Protegida
        app.delete('/produtos/:id', verificarToken, ProductController.deletar) // Protegida
    // ...
```

Pronto! Agora você não conseguirá acessar essas rotas sem informar o token de acesso!

![image](https://user-images.githubusercontent.com/28551993/217339406-13f29f4b-6bc3-4624-adce-ce11e1c1d348.png)
![image](https://user-images.githubusercontent.com/28551993/217339554-3cead6ec-549d-4aea-b0e3-d2718379ff46.png)
![image](https://user-images.githubusercontent.com/28551993/217339908-ce96288d-6de4-40ba-bcaf-4ab8b01a3038.png)


### 5.2. Armazenamento de senhas e criação de tokens

Outra coisa importantíssima quando pensamos na segurança da nossa aplicação, além de restringir acesso, é como armazenamos informações sensíveis. Uma delas é a senha, um dado que se for vazado pode gerar muitos problemas. Por isso vamos fazer um processo de *hashing* com a senha do usuário: Vamos jogá-la em um liquidificador e transformar em um dado que não pode ser revertido à senha original. Em compensação, se quisermos comparar duas senhas, precisaremos também jogar essa senha no liquidificador e ver se o resultado processado é o mesmo. Isso reduz bastante a chance de vazamento de senhas, pois quem tentar descobrir uma senha "liquidificada" precisaria tentar milhões de combinações sem chegar a nenhum resultado.

A versão de "liquidificador" (*hashing*) que vamos usar é a `bcrypt`. Ele fornece funções de encriptação e de comparação de valores de forma segura.

No seed vamos armazenar a senha de usuário de forma processada:

`scripts/seed.js`
```js
// Fora da função...
import { hashSync } from "bcrypt"

// Dentro da função...
    // ...
    admin.email = "admin@case2.com"
    admin.encryptedPassword = hashSync('12345678', 10)
    const users = [admin]
    // ...
```

Isso fará com que a senha do usuário seja transformada de '12345678' para um valor liquidificado 10 vezes para garantir a irreversibilidade da informação.

Se você rodar `npm run clear` e `npm run seed` verá que a senha agora está ilegível

![image](https://user-images.githubusercontent.com/28551993/217205224-83b881d9-5d7c-4046-8e66-55f927c1e7d8.png)

Agora, precisamos fazer essa comparação de senhas no login. Por sorte, a biblioteca fornece uma função para fazer exatamente isso:

`src/controller/UserController.js`
```js
// Fora da classe...
import { compareSync } from "bcrypt"
// ...

// Dentro da classe...
        // ...
        const passwordsMatch = compareSync(password, user.encryptedPassword)
        if (!passwordsMatch) {
        // ...
```

Para finalizar o projeto, não podemos deixar um token tão simples como esse. A ideia do token é criar um crachá único para cada usuário e atualmente todos os usuários teriam o mesmo token cadastrado ('fedcba'). Vamos utilizar uma função do próprio JavaScript que gera um identificador único para o nosso token:

`src/controller/UserController.js`
```js
// Fora da classe...
// ...
import { randomUUID } from "crypto"
// ...

// Dentro da classe...
        // ...
        user.authToken = randomUUID()
        await user.save()
        // ...
```

![image](https://user-images.githubusercontent.com/28551993/217205398-0c0dcf82-b483-429d-9e3a-7cd842ef91f3.png)

Maravilha, agora seu projeto está finalizado 😉! Espero que tenha aprendido algo novo!
