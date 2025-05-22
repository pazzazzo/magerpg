const path = require("node:path")
const fs = require("node:fs")

class Database {
    constructor() {
        this.path = path.join(__dirname, "database.json")
        this.data = {}
        this.fetch()
    }
    fetch() {
        fs.readFile(this.path, (e, data) => {
            this.data = JSON.parse(data)
        })
    }
    save() {
        fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2))
    }

    /**
     * Recherche des utilisateurs selon des critères de recherche.
     *
     * Les utilisateurs sont stockés sous la forme :
     * {
     *   [id: string]: { username: string, password: string }
     * }
     *
     * @param {Object} search - Critères de recherche.
     * @param {string} [search.id]       - Identifiant exact de l’utilisateur à récupérer.
     * @param {string} [search.username] - Nom d’utilisateur à filtrer.
     * @param {string} [search.password] - Mot de passe à filtrer.
     * @returns {Array.<{id: string, username: string, password: string}>}
     */
    getUser(search) {
        if (search.id) {
            return [{id: search.id, ...this.data.users[search.id]}]
        } else {
            return Object.entries(this.data.users).filter(([id, item]) =>
                Object.entries(search).every(([key, value]) =>
                    item[key] === value
                )
            ).map(([id, item]) => ({ id, ...item }));
        }
    }
    setUser(id, data) {
        this.data.users[id] = data
        this.save()
    }
}

module.exports = Database