module.exports = (dbConnection, { Schema }) => {
  let { ObjectId } = Schema;

  let ProductSchema = new Schema({
    author: {
      type: ObjectId,
    },
    image: {
      type: [String],
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    category_id: {
      type: ObjectId,
      required: false,
      ref: "productCategory",
    },
    price: {
      type: Number,
      required: false,
    },
    discount: {
      type: Number,
      required: false,
    },
    stock: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    sale: {
      type: String,
      required: false,
    },
    short_description: {
      type: String,
      required: false,
    },
    description: {
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

  let product = dbConnection.model("product", ProductSchema);

  return product;
};
