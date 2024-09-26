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
        created_by: {
            type:String,
            ref:'admins'
        },
        deleted_at: {
            type:Date,
            default: null
        },
        created_at: {
            type:Date,
            default: new Date()
        },
        updated_at: {
            type:Date,
            default: new Date()
        },
    },
    {
        versionKey: false
    });
    
    let faqs = dbConnection.model('faqs',FaqsSchema);

    return faqs;
}