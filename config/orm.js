var connection = require("../config/connection.js");


//helper function sql syntax

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++){
        arr.push("?");
}

return arr.toString();
}

//Helper function/converts key/value pairs into SQL syntax
function objToSql(ob) {
  let arr = [];

    for (let key in ob){
       let value = ob[key];
       if (Object.hasOwnProperty.call(ob, key)) {
           if (typeof value === "string" && value.indexOf("") >= 0) {
            value = "'" + value + "'";
        }

        arr.push(key + "=" + value);
        }
    }
return arr.toString();
}


var orm = {
    all: function (tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
    });
},
create:function (table, cols, vals, cb) {
    var queryString = "INSERT INTO" + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb (result);
    });
},

update: function (table, objColVals, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result){
      if (err) throw err;
      cb (result);
    });
 }
};

module.exports = orm;
