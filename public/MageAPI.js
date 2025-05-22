/**
 * @class PathAPI
 * @description
 * Client HTTP minimal pour un endpoint donné.  
 * Fournit des méthodes GET et POST et gère automatiquement la  
 * conversion en JSON et la gestion d’erreur de parsing.
 */
class PathAPI {
    /**
    * Crée une instance de PathAPI.
    * @param {string} path — Le chemin relatif de l’API (ex. "/users").
    * @param {string} [URL="http://localhost:8080"] — L’URL de base.
    */
    constructor(path, URL = "http://localhost:8080") {
        /** @private @type {string} */
        this.URL = (URL || "http://localhost:8080") + "/api"
        /** @private @type {string} */
        this.path = path
    }

    /**
    * Exécute une requête GET sur l’endpoint.
    * @param {function(Object):void} [cb] — Fonction de rappel facultative, appelée avec la réponse JSON.
    * @returns {Promise<Object>} — La réponse parsée en JSON (ou un objet d’erreur).
    */
    async get(cb) {
        let req = await fetch(this.URL + this.path, {
            method: "GET"
        })
        let res = await (await req.blob()).text()
        let json
        try {
            json = JSON.parse(res)
        } catch {
            json = { "error": "Unable to parse response", "response": res }
        }
        if (typeof cb == "function") {
            cb(json)
        }
        return json
    }

    /**
    * Exécute une requête POST sur l’endpoint.
    * @param {object} payload — Les données à envoyer dans le corps de la requête.
    * @param {function(object):void} [cb] — Fonction de rappel facultative, appelée avec la réponse JSON.
    * @returns {Promise<object>} — La réponse parsée en JSON (ou un objet d’erreur).
    */
    async post(payload, cb) {
        let req = await fetch(this.URL + this.path, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
        let res = await (await req.blob()).text()
        let json
        try {
            json = JSON.parse(res)
        } catch {
            json = { "error": "Unable to parse response", "response": res }
        }
        if (typeof cb == "function") {
            cb(json)
        }
        return json
    }
}

/**
* @class MageAPI
* @description
* API permettant de discuter avec le serveur plus facilement
*
* @property {PathAPI} login — Appel au "/login".
* @property {PathAPI} register — Appel au "/register".
*/
class MageAPI {
   /**
   * Crée une instance de MageAPI.
   *
   * @param {string} [URL="http://localhost:8080"] — L’URL de base pour toutes les requêtes.
   */
    constructor() {
        /** @type {PathAPI} */
        this.register = new PathAPI("/register")
        /** @type {PathAPI} */
        this.login = new PathAPI("/login")
    }
}

export default MageAPI