const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
const salt_rounds = 10;
