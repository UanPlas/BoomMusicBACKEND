const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Obtener lista de la bd
 * @param {*} req
 * @param {*} res
 * 
 * */
const getItems = async (req, res) => {
    try {
        const user = req.user;
        const data = await tracksModel.findAllData();
        res.send({ data,user });

    } catch (error) {
        console.log(error,"••••••••••••");
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
}; 
/**
 * Obtener detalle de la bd
 * @param {*} req
 * @param {*} res
 * 
 * */
const getItem =async  (req, res) => {
    //try {
        req = matchedData(req);
        const {id}=req;
        const data=  await tracksModel.findOneData(id);
        res.send({data}); 

    //} catch (error) {
      //  handleHttpError(res, "ERROR_GET_ITEM");
    //}
 };
/**
 * Crear item de la bd
 * @param {*} req
 * @param {*} res
 * 
 * */
const createItem = async (req, res) => {


    try {

        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send({ body });
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_ITEM');
        console.log(error);
    }



};
/**
 * Actualizar elemento de la lista de la bd
 * @param {*} req
 * @param {*} res
 * 
 * */
const updateItem =async  (req, res) => { 

    try {

        
        const {id,...body}=matchedData(req);
        const data = await tracksModel.update(body,
            {where:{id}}
        );
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM')
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
        req = matchedData(req);
        const {id}=req;
        const data=  await tracksModel.destroy({where:{id}});
        res.send({data}); 

    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }





};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };