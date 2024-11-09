module.exports = (dbConnection, { Schema }) => {
  let { ObjectId } = Schema;

  let ContactUsSchema = new Schema({
    author: {
      type: ObjectId,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    message: {
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

  let contactUs = dbConnection.model("contactUs", ContactUsSchema);

  return contactUs;
};
