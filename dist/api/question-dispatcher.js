"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/**
 * @author : Shalitha Anuradha <shalithaanuradha123@gmail.com>
 * @since : 2021-05-18
 **/
var express = require("express");
var mysql = require("mysql");
exports.router = express.Router();
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'ceylon_solutions',
    connectionLimit: 5,
    connectTimeout: 0
});
var count = 0;
var page = 0;
// Time you need to close the pool (Just say servers are normally close for the weekends and server starts in monday)
// Then it take 5 days of time = "1000*60*60*24*5 ms" to execute the code.
// If you want your pool to never end then no need of having this below setTimeout.
setTimeout(function () {
    pool.end(function (err) {
        if (err) {
            return console.log(err.message);
        }
        // close all connections
    });
}, 1000 * 60 * 60 * 24 * 5);
// count stands for no of pages required and page is stands for the starting point
function pagination(count, page, questions) {
    return questions.slice(page, page + count);
}
function validateQuestion(id, question, category, state, questionGroup, license, status, display) {
    return true;
}
exports.router.get('/api/v1/questions/search', (function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("Failed to establish the database connection");
            throw err;
        }
        count = parseInt(req.query.count, 10);
        page = parseInt(req.query.page, 10);
        var question = req.query.question;
        var category = req.query.category;
        var state = req.query.state;
        var questionGroup = req.query.questionGroup;
        var license = req.query.license;
        var status = req.query.status;
        var display = req.query.display;
        connection.query('SELECT * FROM question WHERE question LIKE ? OR category = ? OR state = ? OR ' +
            'question_group = ? OR license = ? OR status = ? OR display = ? ORDER BY category, state, question_group, ' +
            'license, status,id ASC', ["%" + question + "%", category, state, questionGroup, license, status, display], function (err, result) {
            if (err) {
                console.log("Failed to read the customers", err);
            }
            else {
                if (page && count) {
                    result = pagination(count, page, JSON.parse(JSON.stringify(result)));
                }
                res.status(200).json(result);
            }
        });
        // console.log(connection.beginTransaction());
        connection.release();
        // connection.end();
    });
}));
exports.router.get('/api/v1/questions', (function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("Failed to establish the database connection");
            throw err;
        }
        count = parseInt(req.query.count, 10);
        page = parseInt(req.query.page, 10);
        connection.query('SELECT * FROM question', function (err, result) {
            if (err) {
                console.log("Failed to read the customers", err);
            }
            else {
                if (page && count) {
                    result = pagination(count, page, JSON.parse(JSON.stringify(result)));
                }
                res.status(200).json(result);
            }
        });
        // console.log(connection.beginTransaction());
        connection.release();
        // connection.end();
    });
}));
exports.router.post('/api/v1/questions', function (req, res) {
    var id = req.body.id;
    var question = req.body.question;
    var category = req.body.category;
    var state = req.body.state;
    var questionGroup = req.body.questionGroup;
    var license = req.body.license;
    var status = req.body.status;
    var display = req.body.display;
    if (!validateQuestion(id, question, category, state, questionGroup, license, status, display)) {
        res.status(400).json(false);
        return;
    }
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("Failed to establish the database connection");
            throw err;
        }
        connection.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            connection.query('INSERT INTO question VALUES (?,?,?,?,?,?,?,?)', [id, question, category, state, questionGroup, license, status, display], function (err, result) {
                if (err) {
                    res.status(400).json(false);
                    connection.rollback(function () {
                        throw err;
                    });
                    // console.error("Failed to insert the Customer", err);
                }
                else {
                    if (result.affectedRows > 0) {
                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    res.status(500).json(false);
                                    throw err;
                                });
                            }
                            res.status(201).json(true);
                            // console.log('Transaction Complete.');
                        });
                    }
                }
            });
        });
        connection.release();
    });
});
exports.router.put('/api/v1/questions', function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("Failed to establish the database connection");
            throw err;
        }
        var id = req.body.id;
        var question = req.body.question;
        var category = req.body.category;
        var state = req.body.state;
        var questionGroup = req.body.questionGroup;
        var license = req.body.license;
        var status = req.body.status;
        var display = req.body.display;
        connection.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            connection.query('UPDATE question SET question = ?, category = ?, state = ?, question_group = ?,' +
                'license = ?, status = ?, display = ? WHERE id = ?', [question, category, state,
                questionGroup, license, status, display, id], function (err, result) {
                if (err) {
                    res.status(400).json(false);
                    connection.rollback(function () {
                        throw err;
                    });
                    // console.error("Failed to insert the Customer", err);
                }
                else {
                    if (result.affectedRows > 0) {
                        res.status(204).json(true);
                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    throw err;
                                });
                            }
                            // console.log('Transaction Complete.');
                        });
                    }
                }
            });
        });
        connection.release();
    });
});
exports.router.delete('/api/v1/questions', function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("Failed to establish the database connection");
            throw err;
        }
        var id = req.query.id;
        connection.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            connection.query('DELETE FROM question WHERE id = ?', [id], function (err, result) {
                if (err) {
                    res.status(400).json(false);
                    connection.rollback(function () {
                        throw err;
                    });
                    // console.error("Failed to insert the Customer", err);
                }
                else {
                    if (result.affectedRows > 0) {
                        res.status(204).json(true);
                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    throw err;
                                });
                            }
                            // console.log('Transaction Complete.');
                        });
                    }
                }
            });
        });
        connection.release();
    });
});
//# sourceMappingURL=question-dispatcher.js.map