class GetNames {
    constructor(dao) {
        this.dao = dao
    }
	

createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS names (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      device VARCHAR(255),
      ip VARCHAR(255),
      topic VARCHAR(255),
      username VARCHAR(255))`;
        return this.dao.run(sql)
}

create(data) {
	if(typeof data == 'object'){
        return this.dao.run(
		'INSERT INTO names (device,ip,topic,username) VALUES (?,?,?,?)',
		[data['device'],data['ip'],data['topic'],data['username']]);
	};
};

   
deleted(id) {
	if(data){
		return this.dao.run(`DELETE FROM names WHERE id = ?`,[id]);
	};
};
	
getBy(data){
	if(typeof data == 'object'){
		if(data['state'] == 'getByDevice'){
			   return this.dao.all(`SELECT device,ip,topic,username FROM names WHERE device = ?`,[data['device']]);
		}else if(data['state'] == 'getByInfo'){
			   return this.dao.all(`SELECT * FROM names WHERE ip = ? AND device = ? AND topic = ? AND username = ? ORDER BY device DESC LIMIT 10`,[data['ip'],data['device'],data['topic'],data['username']]);
    	}else if(data['state'] == 'getByIp'){
			   return this.dao.all(`SELECT * FROM names WHERE ip = ?`,[data['ip']]);			
		};
	};
};
}

module.exports = GetNames;