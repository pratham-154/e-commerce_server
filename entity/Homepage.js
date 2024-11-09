module.exports = (dbConnection, { Schema }) => {
  let { ObjectId } = Schema;

  let HomepageSchema = new Schema({
    author: {
      type: ObjectId,
    },
    title: {
      type: String,
      required: true,
    },
    text_image_1: {
      type: String,
      required: false,
    },
    text_image_2: {
      type: String,
      required: false,
    },
    text_image_3: {
      type: String,
      required: false,
    },
    text_1: {
      type: String,
      required: false,
    },
    text_2: {
      type: String,
      required: false,
    },
    text_3: {
      type: String,
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

  let homepage = dbConnection.model("homepage", HomepageSchema);

  return homepage;
};
