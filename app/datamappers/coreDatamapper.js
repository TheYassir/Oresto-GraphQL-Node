const debug = require('debug')('app:coredatamapper');

class CoreDatamapper {
  tableName;

  constructor(db) {
    this.db = db;
  }

  createCoreLoaders() {
    this.idLoader = this.db.query
      .from(this.tableName)
      .batch(async (query, ids) => {
        const rows = await query.whereIn('id', ids);
        const orderedRows = ids.map(
          (id) => rows?.find(
            (row) => row.id === id,
          ),
        );
        return orderedRows;
      });
  }

  /**
     * Récupération par identifiant
     * @param {number|number[]} id identifiant ou liste d'identifiants
     * @returns un enregistrement ou une liste d'enregistrement
     */
  findByPk(id) {
    return this.idLoader.load(id);
  }

  async findAll(params) {
    debug(`findAll() sur la table ${this.tableName}`);
    const query = this.db.query.from(this.tableName);
    if (params) {
      if (params.where) {
        query.where(params.where);
      }
    }
    // A partir du moment ou on execute la promesse, knex va fabriquer la requête SQL et va
    // l'envoyer à la base de données
    // SELECT * FROM <this.tableName> [WHERE ...]
    const rows = await query.cache(process.env.CACHE_TTL);
    return rows;
  }

  async create(inputData) {
    debug(`create() sur la table ${this.tableName}`);
    const query = this.db.query
      .insert(inputData)
      .into(this.tableName)
      .returning('*')
      .first();
    const row = await query;

    return row;
  }

  async update(id, inputData) {
    debug(`update(${id}) sur la table ${this.tableName}`);
    const query = this.db.query
      .insert(inputData)
      .from(this.tableName)
      .where({ id })
      .returning('*')
      .first();
    const row = await query;

    return row;
  }

  async delete(id) {
    debug(`delete(${id}) sur la table ${this.tableName}`);
    const query = this.db.query
      .from(this.tableName)
      .where({ id })
      .delete();
    return !!await query;
  }
}

module.exports = CoreDatamapper;
