/**
 * @author : Shalitha Anuradha <shalithaanuradha123@gmail.com>
 * @since : 2021-05-18
 **/
import {router} from './api/main-dispatcher';
import express = require("express");

const app = express();
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json());
app.use(router);

app.listen(8080, ()=>console.log("Server has started"));

