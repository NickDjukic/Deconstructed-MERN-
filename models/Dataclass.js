const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataclassSchema = new Schema({
    class: {
        type: String,
            required: true
    },
    companiesCollecting: [{ type: Schema.Types.ObjectId, ref: 'questions' }],
});


const Dataclass = mongoose.model('dataclasses', DataclassSchema)
module.exports = Dataclass