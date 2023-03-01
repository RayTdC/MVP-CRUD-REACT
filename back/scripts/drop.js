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