class GetDro3 {
    constructor(dao) {
        this.dao = dao;
    }

createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS dro3s (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      path VARCHAR(255))`;
        return this.dao.run(sql);
};

create(data) {
	if (typeof data == 'object') {
		return this.dao.run("INSERT INTO dro3s (path) VALUES (?)", [data['path']]);
	};
};

deleted(data) {
	if(data){
		return this.dao.run(`DELETE FROM dro3s WHERE path = ?`, [data]);
	};
};

getAll() {
	return this.dao.all(`SELECT path FROM dro3s`);
};

}

module.exports = GetDro3;
