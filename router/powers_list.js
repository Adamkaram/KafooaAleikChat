class GetPowers {
    constructor(dao) {
        this.dao = dao;
    }

createTable() {
        const sql = `
		CREATE TABLE IF NOT EXISTS powers (
		id INTEGER PRIMARY KEY AUTO_INCREMENT,
		name VARCHAR(255),
		powers TEXT
		)`;
		return this.dao.run(sql);
};

create(data) {
	if (typeof data == 'object') {
		return this.dao.run("INSERT INTO powers (name,powers) VALUES (?,?)", [data['name'],data['powers']]);
	};
};
	
	
updatePower(data) {
	if (typeof data == 'object') {
		return this.dao.run(`UPDATE powers SET powers = ? WHERE name = ?`, [data['power'],data['name']]);
	};
};

deleted(name) {
	if(name){
		return this.dao.run(`DELETE FROM powers WHERE name = ?`, [name]);
	};
};

getBy(data){
	if(typeof data == 'object'){
		if(data['state'] == 'getAll'){
			return this.dao.all(`SELECT * FROM powers`);
		}else if(data['state'] == 'getByID'){
			return this.dao.get(`SELECT * FROM powers WHERE id = ?`,[data['id']]);
		};
	};
};

}

module.exports = GetPowers;
