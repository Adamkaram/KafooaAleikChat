class GetLogs {
    constructor(dao) {
        this.dao = dao
    }
	
createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      state VARCHAR(255),
      topic VARCHAR(255),
      username VARCHAR(255),
      ip VARCHAR(255),
      country VARCHAR(255),
      device VARCHAR(255),
      isin VARCHAR(255),
      date VARCHAR(255))`;
        return this.dao.run(sql)
};

create(data) {
	if(typeof data == 'object'){
		return this.dao.run(
		'INSERT INTO logs (state,topic,username,ip,country,device,isin,date) VALUES (?,?,?,?,?,?,?,?)',
		[data['state'],data['topic'],data['username'],data['ip'],data['country'],data['device'],data['isin'],data['date']]);
	};
};
	
deleteall() {
	return this.dao.run(`DELETE FROM logs`)
};
	
	
deleted(id) {
	if(id){
        return this.dao.run(`DELETE FROM logs WHERE id = ?`, [id]);
	};
};

updateById(data) {
	if (typeof data == 'object') {
		return this.dao.run(`UPDATE logs SET date = ?,device = ? WHERE id = ?`, [data['date'],data['device'],data['id']]);
	};
};

getBy(data){
	if (typeof data == 'object') {
		if(data['state'] == 'getAll'){
			return this.dao.all(`SELECT * FROM logs ORDER BY date DESC LIMIT 0, ?`,[data['limit']]);
		}else if(data['state'] == 'getAllIn'){
			return this.dao.all(`SELECT * FROM logs`);
		}else if(data['state'] == 'chekedBy'){
			return this.dao.get(`SELECT * FROM logs WHERE ip = ? AND state = ? AND topic = ? AND username = ?`,[data['ip'],data['log'],data['topic'],data['username']]);
		};
	};	
};

}

module.exports = GetLogs;