const { Schema, models, model, default: mongoose } = require("mongoose");

const CommentSchema = new Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Useri',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {timestamps: true});

// export default mongoose?.models?.Comment || model('Comment', CommentSchema);
export const Comment = models?.Comment || model('Comment', CommentSchema);