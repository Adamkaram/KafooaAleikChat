class GetBars {
    constructor(dao) {
        this.dao = dao
    }
	
    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS bars (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      bcc TEXT DEFAULT (''),
      likes TEXT DEFAULT (''),
      bg VARCHAR(255),
	  ucol VARCHAR(255),
	  mcol VARCHAR(255),
      bid VARCHAR(255),
      owner VARCHAR(255),
      msg VARCHAR(255),
      pic VARCHAR(255),
      topic VARCHAR(255))`;
        return this.dao.run(sql)
    }

    create(data) {
		if(typeof data == 'object'){
        return this.dao.run(
            'INSERT INTO bars (bg,ucol,mcol,bid,owner,msg,pic,topic) VALUES (?,?,?,?,?,?,?,?)',
            [data['bg'],data['ucol'],data['mcol'],data['bid'],data['owner'],data['msg'],data['pic'],data['topic']]);
		};
    }

   
   	deleted(data) {
		 if(typeof data == 'object'){
			 if(data['state'] == 'deleteByBid'){
				 return this.dao.run(`DELETE FROM bars WHERE bid = ?`,[data['bid']]);
		     }else if(data['state'] == 'deleteByID'){
				 return this.dao.run(`DELETE FROM bars WHERE id = ?`,[data['id']]);
			 }else if(data['state'] == 'deleteAll'){
				 return this.dao.run(`DELETE FROM bars`);
			 };
		};
	};
	
	update(data){
		if(typeof data == 'object'){
			if(data['state'] == 'updateLike'){
            return this.dao.run(`UPDATE bars SET likes = ? WHERE bid = ?`, [data['likes'],data['bid']]);
			}else if(data['state'] == 'updateComment'){
            return this.dao.run(`UPDATE bars SET bcc = ? WHERE bid = ?`, [data['bcc'],data['bid']]);
			};
		};
	};
	
	
getBy(data){
	if(typeof data == 'object'){
		if(data['state'] == 'getByBid'){
        return this.dao.get(`SELECT * FROM bars WHERE bid = ?`, [data['bid']]);
		}else if(data['state'] == 'getAll'){
        return this.dao.all(`SELECT bg,ucol,mcol,bid,owner,msg,pic,topic,likes,bcc FROM bars`)
		};
	};
};

}

module.exports = GetBars;