// service.js
const dbDriver = require('./dbdriver');

class Service {
    constructor(connection) {
        this.tab_people = "people";
        this.tab_types = "types";
        this.dbdrv = new dbDriver(connection);
    }

    getPeopleList() {
        return this.dbdrv.select(this.tab_people, "*");
    }

    getTypesList() {
        return this.dbdrv.select(this.tab_types, "*");
    }

    saveDrinks(drinks) {
        let res = 0;
        const userID = drinks.user[0];

        for (let i = 0; i < drinks.type.length; i++) {
            if (drinks.type[i] === 0) continue;

            const row = [
                new Date().toISOString().slice(0, 10), // Get current date in YYYY-MM-DD format
                userID,
                i + 1
            ];

            res += this.dbdrv.insertRow(row);
        }

        return res === 0 ? -1 : 1;
    }

    getSummaryOfDrinks(data) {
        const month = data.month ? data.month : 0;
        let sql = `
            SELECT types.typ, COUNT(drinks.ID) as pocet, people.name as personName 
            FROM drinks 
            JOIN people ON drinks.id_people = people.ID 
            JOIN types ON drinks.id_types = types.ID
        `;

        if (month > 0 && month < 13) {
            sql += ` WHERE MONTH(date) = ${month}`;
        }

        sql += ` GROUP BY types.typ`;
        return this.dbdrv.selectQ(sql);
    }
}

module.exports = Service;
