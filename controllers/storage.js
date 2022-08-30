const fs = require("fs");
const { storageModel } = require("../models")
const { handleHttpError } = require("../utils/handleError")
const { matchedData } = require('express-validator');


const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
/**
 * Obtener lista de la bd
 * @param {*} req
 * @param {*} res
 * 
 * */
const getItems = async (req, res) => {

    try {
        const data = await storageModel.findAll();
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_LIST_ITEMS')
    }
};
/**
 * Obtener detalle de la bd
 * @param {*} req
 * @param {*} res
 * 
 * */
const getItem = async (req, res) => {

   try {
        const { id } = matchedData(req);
        const data = await storageModel.findOne({where:{id}});
        res.send({ data });
    } catch (error) {
       handleHttpError(res, 'ERROR_DETAIL_ITEM') 
    }
};
/**
 * Crear item de la bd
 * @param {*} req
 * @param {*} res
 * 
 * */
const createItem = async (req, res) => {


   try {
        const { file } = req;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_ITEM')
    } 
};

/**
 * Eliminar elemento de la lista de la bd
 * @param {*} req
 * @param {*} res
 * 
 * */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const dataFile = await storageModel.findOne({where:{id}});
        await storageModel.destroy({where:{ id }})
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`
        //fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: 1
        }
        res.send({ data });
    } catch (error) { 
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
};

module.exports = { getItems, getItem, createItem, deleteItem };