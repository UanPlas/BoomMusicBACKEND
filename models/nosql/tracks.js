const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete"); 
const TrackScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: "ERROR_URL"
            },

        },
        artist: {
            name: {
                type: String
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true, //TODO: createdAt, updateAt
        versionKey: false
    }
)
TrackScheme.statics.findAllData= function () {
    /////////////// TODO: este this hace referencia al propio modelo
    const joinData = this.aggregate([
        {
            $lookup:{
                from: "storage",
                localField: "mediaId",
                foreignField: "_id",
                as: "audio"

            }

        },
        {
            $unwind: "$audio"
        }
    ])
return joinData;
};

TrackScheme.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("tracks", TrackScheme); 