import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error('Username must contain only letters');
        }
      },
    },

    address: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isBtcAddress(value)) {
          throw new Error('Invalid account address');
        }
      },
    },
  },

  {
    timestamps: true,
  }
);

userSchema.statics.isUsernameTaken = async (username) => {
  const user = await this.findOne({ username });

  return !!user;
};

const User = mongoose.model('User', userSchema);

export default User;
