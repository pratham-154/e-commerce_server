module.exports = (dbConnection, { Schema }) => {
  let { ObjectId } = Schema;

  let FeedbackSchema = new Schema({
    author: {
      type: ObjectId,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
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

  let feedback = dbConnection.model("feedback", FeedbackSchema);

  return feedback;
};
