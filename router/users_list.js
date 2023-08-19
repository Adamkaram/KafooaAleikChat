class GetUsers {
    constructor(dao) {
        this.dao = dao;
    }

createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS users (
      idreg INTEGER PRIMARY KEY AUTO_INCREMENT,
      bg VARCHAR(255) DEFAULT "#FFFFFF",
      mscol VARCHAR(255) DEFAULT "#000000",
      mcol VARCHAR(255) DEFAULT "#000000",
      ucol VARCHAR(255) DEFAULT "#000000",
      evaluation INT DEFAULT 0,
      ico VARCHAR(255) DEFAULT "",
      ip VARCHAR(255) DEFAULT "",
      device VARCHAR(255) DEFAULT "",
      id VARCHAR(255),
      lid VARCHAR(255),
	  uid VARCHAR(255),
      msg VARCHAR(255) DEFAULT "(عضو جديد)",
      pic VARCHAR(255) DEFAULT "site/pic.png",
      power VARCHAR(255) DEFAULT "",
      rep BIGINT DEFAULT 0,
      topic VARCHAR(255) NOT NULL,
      username TEXT,
      password VARCHAR(255) NOT NULL,
      token VARCHAR(255) NOT NULL,
      loginG BOOLEAN DEFAULT false,
      muted BOOLEAN DEFAULT false,
      verification INTEGER DEFAULT 0,
	  lastssen TEXT,
	  joinuser TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        return this.dao.run(sql);
};
	

create(data) {
	if (typeof data == 'object') {
		return this.dao.run("INSERT INTO users (pic,verification,ip,device,power,id,lid,uid,topic,username,password,token) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
		[data['pic'],data['verification'],data['ip'],data['device'],data['power'],data['id'], data['lid'],data['uid'], data['topic'], data['username'], data['password'], data['token']]);
	};
};

updateBy(data){
	if(typeof data == 'object'){
		if(data['state'] == 'updateIp'){
            return this.dao.run(`UPDATE users SET ip = ? , id = ?,lastssen = ?, device = ? WHERE uid = ?`, [data['ip'],data['id'],'',data['device'], data['uid']]);			
		}else if(data['state'] == 'updatePic'){
            return this.dao.run(`UPDATE users SET pic = ? WHERE uid = ?`, [data['pic'], data['uid']]);
		}else if(data['state'] == 'updateMsg'){
            return this.dao.run(`UPDATE users SET msg = ? WHERE uid = ?`, [data['msg'], data['uid']]);
		}else if(data['state'] == 'updateIco'){
            return this.dao.run(`UPDATE users SET ico = ? WHERE uid = ?`, [data['ico'], data['uid']]);
		}else if(data['state'] == 'updateName'){
            return this.dao.run(`UPDATE users SET topic = ? WHERE uid = ?`, [data['topic'], data['uid']]);
		}else if(data['state'] == 'updateLike'){
            return this.dao.run(`UPDATE users SET evaluation = ? WHERE uid = ?`, [data['evaluation'], data['uid']]);
		}else if(data['state'] == 'updateRep'){
            return this.dao.run(`UPDATE users SET rep = ? WHERE uid = ?`, [data['rep'], data['uid']]);
		}else if(data['state'] == 'updatePass'){
            return this.dao.run(`UPDATE users SET password = ? WHERE idreg = ?`, [data['password'], data['idreg']]);
		}else if(data['state'] == 'updateMute'){
            return this.dao.run(`UPDATE users SET muted = ? WHERE uid = ?`, [data['muted'], data['uid']]);
		}else if(data['state'] == 'updatePower'){
            return this.dao.run(`UPDATE users SET power = ? WHERE uid = ?`, [data['power'], data['uid']]);
		}else if(data['state'] == 'updatePoint'){
            return this.dao.run(`UPDATE users SET evaluation = 0`);
		}else if(data['state'] == 'updateVer'){
            return this.dao.run(`UPDATE users SET verification = ? WHERE username = ?`, [data['verification'], data['username']]);
		}else if(data['state'] == 'updateVerLogin'){
            return this.dao.run(`UPDATE users SET verification = ?, loginG = ? WHERE idreg = ?`, [data['verification'],data['loginG'], data['idreg']]);
		}else if(data['state'] == 'updateProfile'){
            return this.dao.run(`UPDATE users SET bg = ? , ucol = ? , topic = ? , mcol = ?, mscol = ? , msg = ? WHERE uid = ?`, 
			[data['bg'],data['ucol'],data['topic'],data['mcol'],data['mscol'],data['msg'],data['uid']]
			);		}else if(data['state'] == 'updateSeen'){
            return this.dao.run(`UPDATE users SET token = ? , lastssen = ? , ip = ? , device = ? WHERE uid = ?`, 
			[data['token'],data['lastssen'],data['ip'],data['device'],data['uid']]);
		};
	};
};

	
getBy(data){
	if(typeof data == 'object'){
		if(data['state'] == 'getByID'){
        return this.dao.get(`SELECT * FROM users WHERE idreg = ?`, [data['idreg']]);
		}else if(data['state'] == 'getByToken'){
        return this.dao.get(`SELECT * FROM users WHERE token = ?`, [data['token']]);
		}else if(data['state'] == 'getByLid'){
        return this.dao.get(`SELECT * FROM users WHERE lid = ?`, [data['lid']]);
		}else if(data['state'] == 'getLogin'){
        return this.dao.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [data['username'], data['password']]);
   		}else if(data['state'] == 'getByUsername'){
        return this.dao.get(`SELECT * FROM users WHERE username = ?`, [data['username']]);   		
		}else if(data['state'] == 'getByTopic'){
        return this.dao.get(`SELECT * FROM users WHERE topic = ?`, [data['topic']]);
		}else if(data['state'] == 'getByDevice'){
        return this.dao.get(`SELECT * FROM users WHERE device = ?`, [data['device']]);
		}else if(data['state'] == 'getByIp'){
        return this.dao.get(`SELECT * FROM users WHERE ip = ?`, [data['ip']]);
		}else if(data['state'] == 'getTop'){
        return this.dao.all(`SELECT evaluation,topic,pic FROM users ORDER BY evaluation DESC LIMIT 10`);
		}else if(data['state'] == 'getByAllSearch'){
        return this.dao.all(`SELECT muted,lastssen,verification,evaluation,joinuser,loginG,username,topic,rep,power,device,ip,idreg FROM users WHERE ip LIKE ? OR device LIKE ? OR username LIKE ? OR topic lIKE ? ORDER BY joinuser DESC LIMIT 5`,['%'+data.value+'%','%'+data.value+'%','%'+data.value+'%','%'+data.value+'%']);
		}else if(data['state'] == 'getByAll'){
        return this.dao.all(`SELECT muted,lastssen,verification,evaluation,joinuser,loginG,username,topic,rep,power,device,ip,idreg FROM users ORDER BY joinuser DESC LIMIT 0, ?`,[data['limit']]);
		}else if(data['state'] == 'getAllByDevice'){
        return this.dao.all(`SELECT * FROM users where device = ?`,[data['device']]);
		}else if(data['state'] == 'getAllBy'){
        return this.dao.all(`SELECT lastssen,verification,joinuser,loginG,username,topic,pic,rep,power,device,id,ip,uid,idreg FROM users`);
		};
	};
};
							

deleted(id) {
	if(id){
        return this.dao.run(`DELETE FROM users WHERE idreg = ?`, [id]);
	};
};
}

module.exports = GetUsers;
