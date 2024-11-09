module.exports = (dbConnection, { Schema }) => {
  let { ObjectId } = Schema;

  let AboutUsSchema = new Schema({
    author: {
      type: ObjectId,
    },
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    vision: {
      type: String,
      required: false,
    },
    ethics: {
      type: String,
      required: false,
    },
    users: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
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

  let aboutUs = dbConnection.model("aboutUs", AboutUsSchema);

  return aboutUs;
};
