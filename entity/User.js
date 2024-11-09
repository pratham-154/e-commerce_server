module.exports = (dbConnection, { Schema }) => {
  let { ObjectId } = Schema;

  let UserSchema = new Schema({
    author: {
      type: ObjectId,
    },
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    phone_number: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    email_verified: {
      type: Boolean,
      required: false,
    },
    email_verified_at: {
      type: Date,
      required: false,
    },
    otp: {
      type: Number,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    token: {
      type: String,
      required: false,
    },
    token_expiry_at: {
      type: Date,
      required: false,
    },
    login_token: {
      type: String,
      required: false,
    },
    last_login_at: {
      type: Date,
      required: false,
    },
    login_expiry_at: {
      type: Date,
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
      required: false,
    },
    updated_at: {
      type: Date,
      required: false,
    },
  });

  let user = dbConnection.model("user", UserSchema);

  return user;
};
