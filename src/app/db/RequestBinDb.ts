import connectDB from "@/app/db/connectDb";
import RequestBin from "@/app/db/model/RequestBinModel";


(async () => {
    await connectDB();
})();

const BooksDb = {
    update: async (data: any = {}) => {
        const {
            uuid,
            dump,
        } = data;

        return RequestBin.updateOne({
            uuid,

        }, {
            $set: {dump,}
        }, {
            upsert: true,
        }).lean();
    },
    getAll: async ({userId, skip, limit}) => {
        const match: any = {userId};
        return RequestBin.find(match).skip(skip).limit(limit).sort({createdAt: -1}).lean();
    },
    getOneBy: async ({userId, uuid}: any = {}) => {
        const match: any = {uuid};

        return await RequestBin.findOne(match).lean();
    },
};

export default BooksDb;