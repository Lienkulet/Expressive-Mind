const { Schema, model, models, default: mongoose } = require("mongoose");

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    summary: {
        type: String,
        required: true,
        min:3
    },
    caption:{
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: true,
        min: 4
    },
    imgUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Tech',
            'Nature',
            'Food',
            'Gym',
            'Health',
        ]
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'useri'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'useri'
    }],
    
}, {timestamps: true});

export const Blog = models?.Blog || model('Blog', BlogSchema);