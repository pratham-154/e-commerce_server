module.exports = (dbConnection, { Schema }) => {
  let { ObjectId } = Schema;

  let CartSchema = new Schema({
    author: {
      type: ObjectId,
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

  let cart = dbConnection.model("cart", CartSchema);

  return cart;
};
