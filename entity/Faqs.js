module.exports = (dbConnection, {Schema}) => {
    let {ObjectId} = Schema;

    let FaqsSchema = new Schema({
        author: {
            type:ObjectId
        },
        title: {
            type:String,
            required:true
        },
        description:  {
            type:String,
            required:false
        },
        status:  {
            type:Number,
            default:1
        },
        slug: {
            type:String,
            required:false
        },
        deleted_at: {
            type:Date
        },
        created_at: {
            type:Date
        },
        updated_at: {
            type:Date
        },
    });

    let faqs = dbConnection.model('faqs',FaqsSchema);

    return faqs;
}