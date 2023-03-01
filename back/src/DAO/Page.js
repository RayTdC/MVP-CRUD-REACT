import ApplicationModel from "./ApplicationModel.js";

export default class Page extends ApplicationModel {
    id; title; text;

    static configurar() {
        Page.associar('id', 'ID')
        Page.associar('title', 'TITLE')
        Page.associar('text', 'TEXT')
    }
}
