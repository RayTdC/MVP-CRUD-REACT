import ApplicationModel from "./ApplicationModel.js";

export default class Product extends ApplicationModel {
    id; title; description;

    static configurar() {
        Product.associar('id', 'ID')
        Product.associar('title', 'TITLE')
        Product.associar('description', 'DESCRIPTION')
    }
}
