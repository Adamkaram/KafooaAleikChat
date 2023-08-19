class GetIntroMsg {
    constructor(dao) {
        this.dao = dao;
    }

createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS intromsg (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      category VARCHAR(255),
      adresse VARCHAR(255),
      msg VARCHAR(255))`;
        return this.dao.run(sql);
};

create(data) {
	if (typeof data == 'object') {
		return this.dao.run("INSERT INTO intromsg (category,adresse,msg) VALUES (?,?,?)", 
		[data['category'], data['adresse'],data['msg']]);
	};
};

deleteByID(id) {
	if(id){
		return this.dao.run(`DELETE FROM intromsg WHERE id = ?`, [id]);
	};
};

getBy(data) {
	if(typeof data == 'object'){
		if(data['state'] == 'getByID'){
			return this.dao.get(`SELECT * FROM intromsg WHERE id = ?`, [data['id']]);
		}else if(data['state'] == 'getIn'){
			return this.dao.all(`SELECT * FROM intromsg WHERE category = ?`,[data['category']]);
		}else if(data['state'] == 'getAllBy'){
			return this.dao.all(`SELECT * FROM intromsg ORDER BY id DESC LIMIT 0, ?`,[data['limit']]);
		}else if(data['state'] == 'getAll'){
			return this.dao.all(`SELECT * FROM intromsg`);
		};
	};
};
}

module.exports = GetIntroMsg;
