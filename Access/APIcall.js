const Clarifai = require ('clarifai');
const app= new Clarifai.App({
    apiKey: process.env.API_KEY
  })

const handleAPICall = async (req, res) => {
    const { input } = req.body;
    try{
      const response=  await (app.models.predict("face-detection", input));
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
