const Clarifai = require ('clarifai');
const app= new Clarifai.App({
    apiKey: "3261344fb3494d9f922a24576b5d1c4f"
  })

const handleAPICall = async (req, res) => {
    const { input } = req.body;
    try{
      const response=  await (app.models.predict(Clarifai.FACE_DETECT_MODEL, input));
      const data= await response;
      res.json(data);
    }
    catch (err){
        res.status(400).json("Error connecting to API")
  }
}

module.exports= {
    handleAPICall: handleAPICall
}