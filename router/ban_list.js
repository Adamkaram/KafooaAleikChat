class GetBand {
    constructor(dao) {
        this.dao = dao;
    }
	
    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS band (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name_band VARCHAR(255),
      type VARCHAR(255),
      reponse VARCHAR(255),
      device VARCHAR(255),
      ip VARCHAR(255),
      username VARCHAR(255),
      country VARCHAR(2),
      date VARCHAR(255) DEFAULT "دائم",
	  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        return this.dao.run(sql);
    }

    create(data) {
        if (typeof data == 'object') {
            return this.dao.run("INSERT INTO band (name_band,type,reponse,device,ip,username,country,date) VALUES (?,?,?,?,?,?,?,?)", 
			[data['name_band'],data['type'],data['reponse'],data['device'],data['ip'],data['username'],data['country'],data['date']]);
        }
    }
	
    deleted(id) {
		if(id){
        return this.dao.run(`DELETE FROM band WHERE id = ?`, [id]);
    };
    };


    getBy(data) {
        if (typeof data == 'object') {
			if(data['state'] == 'getByID'){
				return this.dao.get(`SELECT * FROM band WHERE id = ?`, [data['id']]);
			}else if(data['state'] == 'getAll'){
				      return this.dao.all(`SELECT * FROM band ORDER BY date DESC LIMIT 0, ?`,[data['limit']]);
			}else if(data['state'] == 'chekedBand'){
				if(data['device'].trim()){
					return this.dao.get(`SELECT * FROM band WHERE device = ?`, [data['devie']]);
				}else if(data['ip'].trim()){
					return this.dao.get(`SELECT * FROM band WHERE ip = ?`, [data['ip']]);
				}else if(data['country'].trim()){
					return this.dao.get(`SELECT * FROM band WHERE country = ?`, [data['country']]);
				}else if(data['username'].trim()){
					return this.dao.get(`SELECT * FROM band WHERE username = ?`, [data['username']]);
				};
			}else if(data['state'] == 'isBand'){
				    return this.dao.get(`SELECT * FROM band WHERE device = ? OR ip = ? OR country = ? OR username = ?`, [data['device'],data['ip'],data['country'],data['username']]);
		};
    };
	};

}

module.exports = GetBand;
