/**
 * @author : Shalitha Anuradha <shalithaanuradha123@gmail.com>
 * @since : 2021-05-18
 **/
import express = require("express");
import mysql = require("mysql");
import {Question} from "../model/question";


export const router = express.Router();

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'ceylon_solutions',
    connectionLimit: 5,
    connectTimeout: 0
});
let count = 0;
let page = 0;

// Time you need to close the pool (Just say servers are normally close for the weekends and server starts in monday)
// Then it take 5 days of time = "1000*60*60*24*5 ms" to execute the code.
// If you want your pool to never end then no need of having this below setTimeout.
setTimeout(() => {
    pool.end(function (err) {
        if (err) {
            return console.log(err.message);
        }
        // close all connections
    });
}, 1000 * 60 * 60 * 24 * 5);

// count stands for no of pages required and page is stands for the starting point
function pagination(count:number,page:number,questions): Array<Question>{
    return questions.slice(page, page+count);
}

router.get('/api/v1/questions/search', ((req, res) => {

    pool.getConnection(function (err, connection) {

        if (err) {
            console.log("Failed to establish the database connection");
            throw err;
        }

        count = parseInt(req.query.count as any,10);
        page = parseInt(req.query.page as any,10);

        let question = req.query.question;
        let category = req.query.category;
        let state = req.query.state;
        let questionGroup = req.query.questionGroup;
        let license = req.query.license;
        let status = req.query.status;
        let display = req.query.display;

        connection.query('SELECT * FROM question WHERE question LIKE ? OR category = ? OR state = ? OR ' +
            'question_group = ? OR license = ? OR status = ? OR display = ? ORDER BY category, state, question_group, ' +
            'license, status,id ASC' ,[`%${question}%`, category, state, questionGroup,license,status,display],
            (err, result) => {
            if (err) {
                console.log("Failed to read the customers", err);
            } else {
                if(page && count){
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

router.get('/api/v1/questions', ((req, res) => {

    pool.getConnection(function (err, connection) {

        if (err) {
            console.log("Failed to establish the database connection");
            throw err;
        }

        count = parseInt(req.query.count as any,10);
        page = parseInt(req.query.page as any,10);

        connection.query('SELECT * FROM question', (err, result) => {
            if (err) {
                console.log("Failed to read the customers", err);
            } else {
                if(page && count){
                    result = pagination(count, page, JSON.parse(JSON.stringify(result)));
                }
                res.status(200).json(result)
            }
        });
        // console.log(connection.beginTransaction());
        connection.release();
        // connection.end();
    });
}));

router.post('/api/v1/questions', (req, res) => {

    pool.getConnection(function (err, connection) {

        if (err) {
            console.log("Failed to establish the database connection");
            throw err;
        }

        let id = req.body.id;
        let question = req.body.question;
        let category = req.body.category;
        let state = req.body.state;
        let questionGroup = req.body.questionGroup;
        let license = req.body.license;
        let status = req.body.status;
        let display = req.body.display;

        connection.beginTransaction(function(err) {
            if (err) {throw err;}
            connection.query('INSERT INTO question VALUES (?,?,?,?,?,?,?,?)',
                [id, question, category, state, questionGroup, license, status, display], (err, result) => {
                    if (err) {
                        res.status(400).json(false);
                        connection.rollback(function() {
                            throw err;
                        });
                        // console.error("Failed to insert the Customer", err);
                    }else {
                        if (result.affectedRows > 0) {
                            res.status(201).json(true);
                            connection.commit(function(err) {
                                if (err) {
                                    connection.rollback(function() {
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

router.put('/api/v1/questions', (req, res) => {

    pool.getConnection(function (err, connection) {

        if (err) {
            console.log("Failed to establish the database connection");
            throw err;
        }

        let id = req.body.id;
        let question = req.body.question;
        let category = req.body.category;
        let state = req.body.state;
        let questionGroup = req.body.questionGroup;
        let license = req.body.license;
        let status = req.body.status;
        let display = req.body.display;

        connection.beginTransaction(function(err) {
            if (err) {throw err;}
            connection.query('UPDATE question SET question = ?, category = ?, state = ?, question_group = ?,' +
                'license = ?, status = ?, display = ? WHERE id = ?',[question, category, state,
                questionGroup, license, status, display, id], (err, result) => {
                    if (err) {
                        res.status(400).json(false);
                        connection.rollback(function() {
                            throw err;
                        });
                        // console.error("Failed to insert the Customer", err);
                    }else {
                        if (result.affectedRows > 0) {
                            res.status(204).json(true);
                            connection.commit(function(err) {
                                if (err) {
                                    connection.rollback(function() {
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

router.delete('/api/v1/questions', (req, res) => {

    pool.getConnection(function (err, connection) {

        if (err) {
            console.log("Failed to establish the database connection");
            throw err;
        }

        let id = req.query.id;


        connection.beginTransaction(function(err) {
            if (err) {throw err;}
            connection.query('DELETE FROM question WHERE id = ?',[id], (err, result) => {
                if (err) {
                    res.status(400).json(false);
                    connection.rollback(function() {
                        throw err;
                    });
                    // console.error("Failed to insert the Customer", err);
                }else {
                    if (result.affectedRows > 0) {
                        res.status(204).json(true);
                        connection.commit(function(err) {
                            if (err) {
                                connection.rollback(function() {
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

