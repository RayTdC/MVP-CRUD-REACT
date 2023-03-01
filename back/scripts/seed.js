import { hashSync } from "bcrypt"

import Page from "../src/DAO/Page.js"
import Product from "../src/DAO/Product.js"
import User from "../src/DAO/User.js"

const models = [
    Page, Product, User
]

const seed = async () => {
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
    admin.encryptedPassword = hashSync('12345678', 10)
    const users = [admin]
    
    await Page._seed(pages)
    await Product._seed(products)
    await User._seed(users)
}

seed()