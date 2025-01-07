module.exports = (dbConnection, { Schema }) => {
  let { ObjectId } = Schema;

  let AddressSchema = new Schema({
    author: {
      type: ObjectId,
    },
    user_id: {
      type: ObjectId,
      required: false,
      ref: "user",
    },
    house: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    pincode: {
      type: Number,
      required: false,
    },
    phone_number: {
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

  let address = dbConnection.model("address", AddressSchema);

  return address;
};
