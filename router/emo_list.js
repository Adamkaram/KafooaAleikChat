class GetEmo {
    constructor(dao) {
        this.dao = dao;
    }

createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS emos (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      type VARCHAR(255),
      path VARCHAR(255))`;
        return this.dao.run(sql);
};

create(data) {
	if (typeof data == 'object') {
		return this.dao.run("INSERT INTO emos (type,path) VALUES (?,?)", [data['type'], data['path']]);
	};
};

deleted(data) {
	if(data){
		return this.dao.run(`DELETE FROM emos WHERE path = ?`, [data]);
	};
};


update(data) {
	if (typeof data == 'object') {
		return this.dao.run(`UPDATE emos SET type = ? WHERE path = ?`, 
		[data['type'],data['path']]);
	};
};

getAll() {
	return this.dao.all(`SELECT type,path FROM emos`);
};

getByL() {
	return this.dao.all(`SELECT id,type,path FROM emos ORDER BY id DESC LIMIT 1`);
};

getBy(data) {
	return this.dao.get(`SELECT * FROM emos WHERE type = ?`,[data]);
};

}

module.exports = GetEmo;
