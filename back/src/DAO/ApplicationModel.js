import { getConnection } from "../infra/connection.js";

export default class ApplicationModel {
    // =============================================== Campos estáticos internos do construtor ===============================================
    static _propertyToColumn = new Map()
    static _columnToProperty = new Map()

    // =============================================== Métodos estáticos internos do construtor ===============================================
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

    static async _seed(models) {
        for ( const model of models ) {
            await model.save()
        }
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

    // =============================================== Métodos estáticos públicosdo construtor ===============================================
    static getTableName() {
        return this.name.toLowerCase()
    }

    static configurar() {
        throw new Error('Você deve criar sua própria versão de SuaModel.configurar! Dentro dela chame o método "SuaModel.associar" para relacionar as propriedades da model com as colunas do banco!')
    }

    static associar( property, column ) {
        this._propertyToColumn.set(property, column)
        this._columnToProperty.set(column, property)
    }

    static async findAll() {
        const connection = await getConnection()
        const all = await connection.all(
            `SELECT * FROM ${this.getTableName()}`
        )
        await connection.close()
        return all.map( result => this._toModel(result) )
    }

    static async findByProperty(property, value) {
        const connection = await getConnection()
        const column = this._propertyToColumn.get(property)
        const result = await connection.get(
            `SELECT * FROM ${this.getTableName()} WHERE ${column} = ?`,
            value
        )
        await connection.close()
        return this._toModel(result)
    }

    // =============================================== Campos públicos da instância ===============================================
    id;

    // =============================================== Métodos públicos da instância ===============================================
    async save() {
        const table = this.constructor.getTableName()
        const propToCol = this.constructor._propertyToColumn

        const dbObj = this.constructor._toDatabase(this)
        const columns = Object.keys(dbObj)
        const values = Object.values(dbObj)

        const connection = await getConnection()
        if (this.id) {
            const updates = columns.map(column => `${column}=?`)
            await connection.run(
                `UPDATE ${table} SET ${updates} WHERE ${propToCol.get('id')} = ?;`,
                ...values,
                this.id
            )
        } else {
            const { lastID } = await connection.run(
                `INSERT INTO ${table} (${columns}) VALUES (${values.map(_ => '?').join(',')});`,
                ...values
            )
            this.id = lastID
        }
        await connection.close()
    }

    async delete() {
        const table = this.constructor.getTableName()
        const propToCol = this.constructor._propertyToColumn

        const connection = await getConnection()
        await connection.run(
            `DELETE FROM ${table} WHERE ${propToCol.get('id')} = ?;`,
            this.id
        )
        await connection.close()
    }
}