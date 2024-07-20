import mongoose from "mongoose";

const RequestBinSchema = new mongoose.Schema({
        uuid: String,
        userId: String,
        dump: Object,
    },
    {
        timestamps: true, collection: 'request-bin'
    });

RequestBinSchema.index(
    { content: 'text', name: 'text' },
    { name: 'RequestBin_text_content_name_idx' }
);RequestBinSchema.index(
    { content: 1, },
    { name: 'RequestBin_content_idx' }
);RequestBinSchema.index(
    {  name: 1 },
    { name: 'RequestBin_name_idx' }
);
const RequestBin =
    mongoose.models.RequestBin || mongoose.model("RequestBin", RequestBinSchema);

export default RequestBin;