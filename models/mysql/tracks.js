const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");
const Track = sequelize.define(
    "tracks",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        album: {
            type: DataTypes.STRING,
        },
        cover: {
            type: DataTypes.STRING,
        },
        artist_name: {
            type: DataTypes.STRING
        },
        artist_nickname: {
            type: DataTypes.STRING,
        },
        artist_nationality: {
            type: DataTypes.STRING,
        },
        duration_start: {
            type: DataTypes.INTEGER, 
        },
        duration_end: {
            type: DataTypes.INTEGER,
        },
        mediaId: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: true
    }
);

Track.findAllData=function (){
    Track.belongsTo(Storage,{
        foreignKey: "mediaId",
        as: "audio"
    });

    return Track.findAll({include:"audio"});

};

Track.findOneData=function (id){
    Track.belongsTo(Storage,{
        foreignKey: "mediaId", 
        as: "audio"
    });

    return Track.findOne({where:{id}},{include:"audio"}); 

}; 
  
module.exports= Track;