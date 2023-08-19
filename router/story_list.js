class GetStory {
    constructor(dao) {
        this.dao = dao
    }
	
createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS story (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      owner VARCHAR(255),
      topic VARCHAR(255),
      pic VARCHAR(255),
      views TEXT DEFAULT (''),
	  type VARCHAR(255),
	  time INTEGER,
	  url VARCHAR(255),
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        return this.dao.run(sql)
};

create(data) {
	if(typeof data == 'object'){
		return this.dao.run(
		'INSERT INTO story (owner,topic,pic,type,time,url) VALUES (?,?,?,?,?,?)',
		[data['owner'],data['topic'],data['pic'],data['type'],data['time'],data['url']]);
	};
};
	
deleteall() {
	return this.dao.run(`DELETE FROM story`)
};
	
	
deleted(data) {
	if(data){
        return this.dao.run(`DELETE FROM story WHERE id = ? AND owner = ?`, [data['id'],data['owner']]);
	};
};

deletedBy(data) {
	if(data){
        return this.dao.run(`DELETE FROM story WHERE id = ?`, [data]);
	};
};

updateById(data) {
	if (typeof data == 'object') {
		return this.dao.run(`UPDATE story SET views = ? WHERE id = ?`, [data['views'],data['id']]);
	};
};

getBy(data){
	if (typeof data == 'object') {
		if(data['state'] == 'getAll'){
			return this.dao.all(`SELECT * FROM story ORDER BY date DESC LIMIT 0, ?`,[data['limit']]);
		}else if(data['state'] == 'getAllIn'){
			return this.dao.all(`SELECT * FROM story`);
		}else if(data['state'] == 'getByID'){
			return this.dao.get(`SELECT * FROM story WHERE id = ?`,[data['id']]);
		}else if(data['state'] == 'getOwner'){
			return this.dao.all("SELECT owner FROM story WHERE owner = ?",[data['owner']]);
		};
	};	
};

}

module.exports = GetStory;