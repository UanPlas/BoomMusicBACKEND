const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const StorageScheme = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamps:true, //TODO: createdAt, updateAt
        versionKey:false
    }
);


StorageScheme.statics.findAllData= function () {
    /////////////// TODO: este this hace referencia al propio model
return this.find({});
};

StorageScheme.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("storage",StorageScheme); 