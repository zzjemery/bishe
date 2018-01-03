var UserSQL = {
    insert: 'INSERT INTO user(userName,passWord) VALUES(?,?)',
    update: 'update users set passWord=? where userName=?',
    getUserById: 'SELECT * FROM user WHERE phone=?',
    queryQuestion: 'SELECT * FROM testbase WHERE id in (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    querylous: 'select * from brow where idCard =?',
    queryrepay: 'select * from brow where idCard=? and browStatus=?',
    querymessage: 'select * from user where idCard =?',
    updateMsg: 'update user set passWord=? where phone=?',
    updatebrow: 'UPDATE brow SET repayline =?, browStatus=? WHERE lous =?',
    updatebrows: 'UPDATE brow SET repayline =? WHERE lous =?'
};
module.exports = UserSQL;