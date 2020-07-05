const sqlite3               = require('sqlite3').verbose();
const dbmanager             = require('../../_helpers/db-manager');
require('dotenv').config();

exports.findOne = async(req, res) => {
  let result = await dbmanager.get(req.params.table, req.body, 1)
  return res.status(result.status == true ? 200 : 400).json(result)
}

exports.findMany = async(req, res) => {
  let result = await dbmanager.get(req.params.table, req.body, -1)
  return res.status(result.status == true ? 200 : 400).json(result)
}

exports.insertOne = async(req, res) => {
    let result = await dbmanager.insertOne(req.params.table, req.body)
    return res.status(result.status == true ? 200 : 400).json(result)
}

exports.findAllOrderBy = async(req, res) => {
    let result = await dbmanager.getAll(req.params.table, req.params.orderby)
    return res.status(result.status == true ? 200 : 400).json(result)
}

exports.findAll = async(req, res) => {
  let result = await dbmanager.getAll(req.params.table, null)
  return res.status(result.status == true ? 200 : 400).json(result)
}

exports.update = async(req, res) => {
    let result = await dbmanager.update(req.params.table, req.body.query, req.body.data)
    return res.status(result.status == true ? 200 : 400).json(result)
}

exports.deleteRow = async(req, res) => {
    let result = await dbmanager.deleteRow(req.params.table, req.body)
    return res.status(result.status == true ? 200 : 400).json(result)
}