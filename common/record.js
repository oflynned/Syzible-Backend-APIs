let config = require("../config/db");
let ObjectId = require("mongodb").ObjectId;
let db = require('monk')(config.mongoUrl);

module.exports = {
    createRecord: (collection, data) => {
        return new Promise((res, rej) => {
            if (!collection) rej(new Error("empty_collection"));
            if (!data) rej(new Error("empty_data"));

            db.get(collection)
                .insert(data)
                .then((record) => res(record))
                .catch((err) => rej(err))
        })
    },

    getRecords: (collection, filter = {}) => {
        return new Promise((res, rej) => {
            db.get(collection)
                .find(filter)
                .then((records) => res(records))
                .catch((err) => rej(err))
        })
    },

    modifyRecord: (collection, data, id) => {
        return new Promise((res, rej) => {
            db.get(collection)
                .update({_id: ObjectId(id)}, {"$set": data})
                .then(() => res(data))
                .catch((err) => rej(err));
        })
    },

    deleteRecord: (collection, id) => {
        return new Promise((res, rej) => {
            db.get(collection)
                .remove({_id: ObjectId(id)})
                .then((record) => res(record))
                .catch((err) => rej(err))
        })
    },

    dropCollection: (collection) => {
        return new Promise((res, rej) => {
            db.get(collection)
                .drop()
                .then(() => res())
                .catch((err) => rej(err))
        })
    }
};
