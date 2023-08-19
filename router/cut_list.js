class GetCuts {
    constructor(dao) {
        this.dao = dao;
    }

createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS cuts (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      msg VARCHAR(255),
      reponse VARCHAR(255))`;
        return this.dao.run(sql);
};

create(data) {
	if (typeof data == 'object') {
		return this.dao.run("INSERT INTO cuts (msg,reponse) VALUES (?,?)", [data['msg'], data['reponse']]);
	};
};

deleted(id) {
	if(id){
		return this.dao.run(`DELETE FROM cuts WHERE id = ?`, [id]);
	};
};

getAll() {
	return this.dao.all(`SELECT * FROM cuts`);
};

getBy(data) {
	if(typeof data == 'object'){
		if(data['state'] == 'getByID'){
			return this.dao.get(`SELECT * FROM cuts WHERE id = ?`, [data['id']]);
		};
	};
};

getAllBy(data) {
	return this.dao.all(`SELECT * FROM cuts`);
};

}

module.exports = GetCuts;
