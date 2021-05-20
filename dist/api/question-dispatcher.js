"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/**
 * @author : Shalitha Anuradha <shalithaanuradha123@gmail.com>
 * @since : 2021-05-18
 **/
var express = require("express");
var mysql = require("mysql");
exports.router = express.Router();
// Use connection pool to enhance the performance of the database.
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
// Unit test example for pagination
var paginationTest = {
    pagination: function (count, page, questions) {
        return questions.slice(page, page + count);
    }
};
// When testing enable the below comment to export the paginationTest object
// module.exports = paginationTest;
//Validation as a separate method
function validateQuestion(id, question, category, state, questionGroup, license, status, display, connection) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (id == undefined || question == undefined || category == undefined || state == undefined || questionGroup == undefined
                || license == undefined || status == undefined || display == undefined) {
                return [2 /*return*/, false];
            }
            if (status.toString == 'Inactive' || status.toString() == 'Active') {
                console.log(status);
                return [2 /*return*/, false];
            }
            connection.query('SELECT id FROM question', function (err, result) {
                if (err) {
                    console.log("Failed to read the customers", err);
                }
                else {
                    var idArray = JSON.parse(JSON.stringify(result));
                    for (var i = 0; i < idArray.length; i++) {
                        console.log(idArray[i].id, id);
                        if (idArray[i].id == id) {
                            console.log("hiiii");
                            return false;
                        }
                    }
                    console.log("babe");
                    return true;
                }
            });
            return [2 /*return*/];
        });
    });
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
    var validated = true;
    pool.getConnection(function (err, connection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err) {
                    console.log("Failed to establish the database connection");
                    // throw err;
                }
                // Check whether fields are not assigned
                if (id == undefined || question == undefined || category == undefined || state == undefined || questionGroup == undefined
                    || license == undefined || status == undefined || display == undefined) {
                    validated = false;
                }
                // Limit status to the declared values (This can be done with enum too)
                if (status.toString == 'Inactive' || status.toString() == 'Active') {
                    console.log(status);
                    validated = false;
                }
                // Check whether the given id is in the system. If it exists not allowed to enter.
                connection.query('SELECT id FROM question', function (err, result) {
                    if (err) {
                        console.log("Failed to read the customers", err);
                    }
                    else {
                        var idArray = JSON.parse(JSON.stringify(result));
                        for (var i = 0; i < idArray.length; i++) {
                            if (idArray[i].id == id) {
                                validated = false;
                                break;
                            }
                        }
                    }
                });
                // Start the transaction scope to insert the data into the database
                connection.beginTransaction(function (err) {
                    if (!validated) {
                        res.status(400).json(false);
                        return;
                    }
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
                return [2 /*return*/];
            });
        });
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