class GetNoName {
    constructor(dao) {
        this.dao = dao;
    }

createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS nonames (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255))`;
        return this.dao.run(sql);
};

create(data) {
	if (typeof data == 'object') {
		return this.dao.run("INSERT INTO nonames (name) VALUES (?)", [data['name']]);
	};
};

deleted(id) {
	if(data){
		return this.dao.run(`DELETE FROM nonames WHERE id = ?`, [id]);
	};
};

getAll() {
	return this.dao.all(`SELECT name FROM nonames`);
};

}

module.exports = GetNoName;
