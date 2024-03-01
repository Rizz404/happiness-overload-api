import mongoose from "mongoose";

export interface IComment {
  parentId?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  content: string;
  image?: string;
  upvotes: mongoose.Types.ObjectId[];
  downvotes: mongoose.Types.ObjectId[];
  repliesCounts: number;
  isEdited: boolean;
}

export interface CommentDocument extends IComment, mongoose.Document {}

interface ICommentModel extends mongoose.Model<CommentDocument> {
  createComment: (data: Partial<IComment>) => Promise<CommentDocument>;
}

const CommentSchema = new mongoose.Schema<CommentDocument>(
  {
    parentId: { type: mongoose.SchemaTypes.ObjectId, ref: "Comment" },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    postId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
      required: [true, "postId is required"],
    },
    content: { type: String, required: [true, "content is required"] },
    image: { type: String },
    upvotes: { type: [mongoose.SchemaTypes.ObjectId], ref: "User", default: [] },
    downvotes: { type: [mongoose.SchemaTypes.ObjectId], ref: "User", default: [] },
    repliesCounts: { type: Number, default: 0 },
    isEdited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CommentSchema.statics.createComment = async function (data: Partial<IComment>) {
  return await new this(data).save();
};

const Comment = mongoose.model<CommentDocument, ICommentModel>("Comment", CommentSchema);

export default Comment;
