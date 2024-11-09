module.exports = (dbConnection, { Schema }) => {
    let { ObjectId } = Schema;
  
    let PartnerSchema = new Schema({
      author: {
        type: ObjectId,
      },
      image: {
        type: String,
        required: true,
      },
      status: {
        type: Number,
        default: 1,
      },
      slug: {
        type: String,
        required: false,
      },
      deleted_at: {
        type: Date,
        required: false,
      },
      created_at: {
        type: Date,
        required: true,
      },
      updated_at: {
        type: Date,
        required: false,
      },
    });
  
    let partner = dbConnection.model("partner", PartnerSchema);
  
    return partner;
  };
  