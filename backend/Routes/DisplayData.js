const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res)=>{
    try{
        // console.log(global.FoodList)
        res.send([global.FoodList, global.Category]);
    }
    catch(err){
        console.log(err);
        res.send("Server Error");
    }
})

module.exports = router;