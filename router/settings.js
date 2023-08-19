class GetSetting {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
	  logo VARCHAR(255) DEFAULT "logo.png",
	  roompic VARCHAR(255) DEFAULT "room.png",
	  sitepic VARCHAR(255) DEFAULT "site.png",
	  userpic VARCHAR(255) DEFAULT "user.png",
	  bg VARCHAR(255) DEFAULT "8f8589",
	  background VARCHAR(255) DEFAULT "FFFFFF",
	  buttons VARCHAR(255) DEFAULT "8f8589",
	  hostname VARCHAR(255),
	  register BOOLEAN DEFAULT false,
	  gust BOOLEAN DEFAULT false,
	  bars BOOLEAN DEFAULT false,
	  replaybc BOOLEAN DEFAULT false,
	  vpn BOOLEAN DEFAULT false,
	  datafinish DATETIME DEFAULT CURRENT_TIMESTAMP,
	  maxrep INTEGER DEFAULT 10,
	  maxlogin INTEGER DEFAULT 3,
	  maxek INTEGER DEFAULT 3,
	  callmic BOOLEAN DEFAULT false,
	  room VARCHAR(255),
	  script VARCHAR(255) DEFAULT 'script.txt',
	  maxdaymsg INTEGER DEFAULT 3,
	  maxlikeroom INTEGER DEFAULT 0,
	  maxlikebc INTEGER DEFAULT 100,
	  maxuploadfile INTEGER DEFAULT 100,
	  bctime INTEGER DEFAULT 0,
	  maxlikename INTEGER DEFAULT 10,
	  maxlikepic INTEGER DEFAULT 10,
	  maxlikecam INTEGER DEFAULT 2000,
	  maxlikemic INTEGER DEFAULT 2000,
	  maxlikestory INTEGER DEFAULT 2000,
	  maxlikepm INTEGER DEFAULT 50,
	  maxlikealert INTEGER DEFAULT 50,
	  maxlikesendpicpm INTEGER DEFAULT 100,
	  lengthroom INTEGER DEFAULT 255,
	  lengthpm INTEGER DEFAULT 255,
	  lengthbc INTEGER DEFAULT 255,
	  registermin INTEGER DEFAULT 5,
	  gustmin INTEGER DEFAULT 5,
	  replay BOOLEAN DEFAULT false,
	  isbanner BOOLEAN DEFAULT false,
	  reconnect BOOLEAN DEFAULT false,
	  offline BOOLEAN DEFAULT false,
	  banner VARCHAR(255) DEFAULT "banner.png")`;
        return this.dao.run(sql);
    }

create(data) {
	if(typeof data == 'object'){
        return this.dao.run('INSERT INTO settings (hostname,room,script,logo,sitepic,roompic,userpic) VALUES (?,?,?,?,?,?,?)',[data['hostname'],data['room'],data['hostname']+'.txt',data['logo'],data['site'],data['roompic'],data['user']]);
	};
};


DeleteDatabase(){
	this.dao.DeleteTable();
};

ExportDb(data){
 this.dao.ExportDatabase(data);
};
	
CreateDatabase(){
	this.dao.DatabaseTable();
};

getBy(data) {
	if (typeof data == 'object') {
		if(data['state'] == 'getByHost'){
			return this.dao.get(`SELECT * FROM settings WHERE hostname = ?`, [data['hostname']]);
		}else if(data['state'] == 'getByID'){
			return this.dao.get(`SELECT * FROM settings WHERE id = ?`, [data['id']]);
		};
	};
};
	
updateBy(data){
	if (typeof data == 'object') {
		if(data['state'] == 'updatelogo'){
			return this.dao.run(`UPDATE settings SET logo = ? WHERE id = ?`, [data['logo'],data['id']]);
		}else if(data['state'] == 'updateroompic'){
			return this.dao.run(`UPDATE settings SET roompic = ? WHERE id = ?`, [data['roompic'],data['id']]);
		}else if(data['state'] == 'updatesitepic'){
			return this.dao.run(`UPDATE settings SET sitepic = ? WHERE id = ?`, [data['sitepic'],data['id']]);
		}else if(data['state'] == 'updatedatafinish'){
			return this.dao.run(`UPDATE settings SET datafinish = ? WHERE id = ?`, [data['datafinish'],data['id']]);
		}else if(data['state'] == 'updatecolor'){
			return this.dao.run(`UPDATE settings SET bg = ?,background = ?,buttons = ? WHERE hostname = ?`, [data['bg'],data['background'],data['buttons'],data['hostname']]);
		}else if(data['state'] == 'updateuserpic'){
			return this.dao.run(`UPDATE settings SET userpic = ? WHERE id = ?`, [data['userpic'],data['id']]);
		}else if(data['state'] == 'updatebanner'){
			return this.dao.run(`UPDATE settings SET banner = ? WHERE id = ?`, [data['banner'],data['id']]);
		}else if(data['state'] == 'updateroom'){
			return this.dao.run(`UPDATE settings SET room = ? WHERE id = ?`, [data['room'],data['id']]);
		}else if(data['state'] == 'Settingdone'){
			return this.dao.run(`UPDATE settings SET register = ?, gust = ?, bars = ?, vpn = ?, maxrep = ?, maxlogin = ?, maxek = ?,callmic = ?, maxdaymsg = ?,
			maxlikeroom = ?, maxlikebc = ?, maxuploadfile = ?, bctime = ?, maxlikename = ?, maxlikepic = ?, maxlikecam = ?,
			maxlikemic = ?,maxlikestory = ?, maxlikepm = ?, maxlikealert = ?, maxlikesendpicpm = ?, lengthroom = ?, lengthpm = ?, lengthbc = ?, registermin = ?,
			gustmin = ?, replay = ?,replaybc = ?, isbanner = ?, reconnect = ?, offline = ? WHERE id = ?`, 
			[data['register'],data['gust'],data['bars'],data['vpn'],data['maxrep'],data['maxlogin'],data['maxek'],data['callmic'],data['maxdaymsg'],data['maxlikeroom'],
			data['maxlikebc'],data['maxuploadfile'],data['bctime'],data['maxlikename'],data['maxlikepic'],data['maxlikecam'],data['maxlikemic'],data['maxlikestory'],data['maxlikepm'],
			data['maxlikealert'],data['maxlikesendpicpm'],data['lengthroom'],data['lengthpm'],data['lengthbc'],data['registermin'],data['gustmin'],data['replay'],data['replaybc'],
			data['isbanner'],data['reconnect'],data['offline'],data['id']]);
		};
	};
};
	
}

module.exports = GetSetting;
