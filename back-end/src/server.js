import express from "express";
import { MongoClient, ReturnDocument, ServerApiVersion} from "mongodb";


const app = express();
app.use(express.json());


let db;

async function connectToDB(){
  const uri = " mongodb://127.0.0.1:27017 ";  //mongodb://locahost:27017/
  const cilent = new MongoClient(uri,{
    serverApi:{
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await cilent.connect();
   
  const db = client.db('full-stack-reactdb');
}

app.get("/api/articles/:name", (req,res) => {
  const{ name }=req.params;



  const article = await db.collection("articles").findOne({name});

  res.json(article);

});

app.post("/api/articles/:name/upvote", (req, res) => {
  const {name}=req.params;
  const updateArticle = await db.collection('article').findOneAndUpdate(
    {name},
    {
      $inc: { upvotes:1},
    },
    {ReturnDocument:"after"}
  );
  res.json(updateArticle);
});

app.post("/api/articles/:name/comments", (req,res) =>{
    const {name}=req.params;
    const{postedBy,text}=req.body;
    const newComment = {postedBy,text}


    const updateArticle = await db.collection('articles').findOneAndUpdate({name},
      {
        $push:{ comments: newComment }
      },
      {ReturnDocument:"after"}
    );
    res.json(updateArticle);
});


async function start() {
  await connectToDB();
  
  app.listen(8000, function () {
    console.log("sever is listening on port 8000");
  });
};

start();

