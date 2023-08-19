class GetRooms {
    constructor(dao) {
        this.dao = dao
    }

createTable() {
	const sql = `
	  CREATE TABLE IF NOT EXISTS rooms (
      idroom INTEGER PRIMARY KEY AUTO_INCREMENT,
      about VARCHAR(255),
      user VARCHAR(255),
      pass VARCHAR(255),
      id VARCHAR(255),
      owner VARCHAR(255),
      topic VARCHAR(255),
      color VARCHAR(255),
	  pic VARCHAR(255),
	  rmli INTEGER DEFAULT 0,
      welcome VARCHAR(255),
      broadcast BOOLEAN DEFAULT false,
      camera BOOLEAN DEFAULT false,
      deleted BOOLEAN DEFAULT false,
      needpass BOOLEAN DEFAULT false,
	  max INTEGER DEFAULT 0,
	  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        return this.dao.run(sql)
};

create(data) {
	if(typeof data == 'object'){
		return this.dao.run(
		'INSERT INTO rooms (about,user,pass,id,owner,topic,color,pic,rmli,welcome,broadcast,camera,deleted,needpass,max) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
		[data['about'],data['user'],data['pass'],data['id'],data['owner'],data['topic'],data['color'],data['pic'],data['rmli'],data['welcome'],data['broadcast'],
		data['camera'],data['deleted'],data['needpass'],data['max']]);
	};
};


getBy(data){
	if(data){
		if(data['state'] == 'getAllWith'){
			return this.dao.all(`SELECT about,deleted,user,id,max,color,needpass,owner,pic,topic,welcome,broadcast,camera,rmli FROM rooms`);
		}else if(data['state'] == 'getByName'){
			return this.dao.get(`SELECT * FROM rooms WHERE topic = ?`,[data['topic']]);
		}else if(data['state'] == 'getAllLimit'){
			return this.dao.all(`SELECT pic,user,id,owner,topic,needpass FROM rooms ORDER BY id DESC LIMIT 0, ?`,[data['limit']]);
		}else if(data['state'] == 'getAll'){
			return this.dao.all(`SELECT * FROM rooms`);
		}else if(data['state'] == 'getByID'){
			return this.dao.get(`SELECT * FROM rooms WHERE id = ?`,[data['id']]);
		};
	};
};


updateBy(data){
	if(data){
		if(data['state'] == 'updateRoom'){
			return this.dao.run(`UPDATE rooms SET color = ? , topic = ? , broadcast = ?, camera = ?, about = ? , welcome = ? , pass = ? ,  needpass = ? , max = ?, rmli = ?, pic = ? WHERE id = ?`, 
			[data['color'],data['topic'],data['broadcast'],data['camera'],data['about'],data['welcome'],data['pass'],data['needpass'],data['max'],data['rmli'],data['pic'],data['id']]
			);
		}else if(data['state'] == 'updatePass'){
			return this.dao.run(`UPDATE rooms SET pass = ?,needpass = ? WHERE id = ?`, ['',false,data['id']]);
		}else if(data['state'] == 'updatePic'){
			return this.dao.run(`UPDATE rooms SET pic = ? WHERE id = ?`, [data['pic'],data['id']]);
		};
	};
};

deleted(id) {
	if(id){
        return this.dao.run(`DELETE FROM rooms WHERE id = ?`,[id]);
    };
};
	
}

module.exports = GetRooms;