import mongoose, { Document, Schema, Model } from "mongoose";

interface IImagesAndVideo extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  image: string;
  imageType:string
}

const imagesStoreSchema: Schema<IImagesAndVideo> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageType:{
    type:String,
    required:true
  }
});

const ImagesStoreModel: Model<IImagesAndVideo> =
  mongoose.model<IImagesAndVideo>("photos", imagesStoreSchema);

export default ImagesStoreModel;
