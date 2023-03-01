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