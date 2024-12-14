import mongoose from 'mongoose'

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://viveknew:7tlBpf5sdZqkGmZ0@cluster0.6uyey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {console.log('db connected')})
}