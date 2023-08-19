class GetBsb {
    constructor(dao) {
        this.dao = dao
    }
	
createTable() {
	const sql = `
	CREATE TABLE IF NOT EXISTS bsb (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      browsers TEXT DEFAULT (''),
      systems VARCHAR(255) DEFAULT (''))`
	  return this.dao.run(sql);
};

create(data) {
	if(typeof data == 'object'){
		return this.dao.run('INSERT INTO bsb (systems,browsers) VALUES (?,?)',[data['systems'],data['browsers']]);
	};
};

updateBy(data){
	if(typeof data == 'object'){
		if(data['state'] == 'updateSystem'){
            return this.dao.run(`UPDATE bsb SET systems = ? WHERE id = ?`, [data['systems'],data['id']]);
		}else if(data['state'] == 'updateBrowser'){
            return this.dao.run(`UPDATE bsb SET browsers = ? WHERE id = ?`, [data['browsers'],data['id']]);			
		};
	};	
};

getAll() {
	return this.dao.all(`SELECT * FROM bsb`)
};

}

module.exports = GetBsb;