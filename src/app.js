const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/nikitadb",{useNewUrlParser:true}).then(()=>{
     console.log("connection successfull");
}).catch((error)=>{
    console.log("error not connected",error);
});


const playlistSchema=new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
    date: {
        type:Date,
        default: Date.now
    }

})


const playlist = new mongoose.model("playlist",playlistSchema)


const createDocument=async()=>{
try{
    const reactPlaylist=new playlist({
        name: "react js",
        ctype: "front end",
        videos: 80,
        author: "thapa",
        active:  true,
    })
    
    console.log("huii");
    const result= await reactPlaylist.save()
    console.log(result);
}catch(err){
    console.log(err);
}

}


createDocument();