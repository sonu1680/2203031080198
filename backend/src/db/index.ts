import mongoose from "mongoose"

export const db=async()=>{
    const URI=process.env.DB_URL||"";
    try {
        await mongoose.connect(URI);

    } catch (error) {
        
    }
}