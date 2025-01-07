module.exports = (dbConnection, { Schema }) => {
  let { ObjectId } = Schema;

  let OrderSchema = new Schema({
    author: {
      type: ObjectId,
    },
    user_id: {
      type: ObjectId,
      required: false,
      ref: "user",
    },
    product_id: {
      type: ObjectId,
      required: false,
      ref: "product",
    },
    item: {
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
      type: String,
      required: false,
    },
    created_at: {
      type: String,
      required: false,
    },
    delivered_at: {
      type: String,
      required: false,
    },
  });

  let order = dbConnection.model("order", OrderSchema);

  return order;
};
