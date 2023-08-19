class GetSub {
    constructor(dao) {
        this.dao = dao
    }

createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS sub (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      sub VARCHAR(255),
      topic VARCHAR(255),
      username VARCHAR(255),
      timestart VARCHAR(255),
      timefinish VARCHAR(255),
      timeis INTEGER)`;
        return this.dao.run(sql);
};

create(data) {
	if(typeof data == 'object'){
        return this.dao.run('INSERT INTO sub (sub,topic,username,timestart,timefinish,timeis) VALUES (?,?,?,?,?,?)',[
		data['sub'],data['topic'],data['username'],data['timestart'],data['timefinish'],data['timeis']]);
	};
};

deleted(id) {
	if(id){
		return this.dao.run(`DELETE FROM sub WHERE username = ?`,[id]);
	};
};

	
update(data) {
	if (typeof data == 'object') {
		return this.dao.run(`UPDATE sub SET sub = ?, timestart = ?, timefinish = ?, timeis = ?  WHERE username = ?`, 
		[data['sub'],data['timestart'],data['timefinish'],data['timeis'],data['username']]);
	};
};
	

getBy(data){
	if(typeof data == 'object'){
		if(data['state'] == 'getAll'){
			return this.dao.all(`SELECT * FROM sub ORDER BY timestart DESC LIMIT 0, ?`,[data['limit']]);
		}else if(data['state'] == 'getByusername'){
			return this.dao.get(`SELECT * FROM sub WHERE username = ?`,[data['username']]);
		}else if(data['state'] == 'getByID'){
			return this.dao.get(`SELECT * FROM sub WHERE id = ?`,[data['id']]);
		};
	};
};

}

module.exports = GetSub;