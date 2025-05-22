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
    getUser(search) {
        if (search.id) {
            return [this.data.users[search.id]]
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