/**
 * @author : Shalitha Anuradha <shalithaanuradha123@gmail.com>
 * @since : 2021-05-19
 **/
import {router as questionDispatcher} from './question-dispatcher';
import express = require("express");

export const router = express.Router();

router.use(questionDispatcher);
