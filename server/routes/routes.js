const express = require('express');
const Model = require('../model/model');
const router = express.Router();


//POST Method
router.post('/post',async(req,res)=>{
    // res.send('Post API.')
    // if (!req.body || !req.body.name) {
    //     return res.status(400).json({ message: 'Missing required name in request body' });
    //   }
    const data =new Model({
         name:req.body.name,
        age:req.body.age,
    })
    try{
        const dataToSave = await data.save();   //<--- we are saving the data using save() method using data.save
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.send(400).json({message:error.message})
    }
})

module.exports = router;



//GET ALL METHOD
router.get('/getAll',async(req,res)=>{
    // res.send('Get All API')
    try{
        const data =await Model.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }


})

//GET BY ID METHOD
router.get('/getOne/:id',async(req,res)=>{
    // res.send(req.params.id);
    try{
        const data = await Model.findById(req.params.id);
        res.json(data);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})
//Updating by ID Method

router.patch('/updating/:id',async(req,res)=>{
    // res.send('Updating By ID API')
    try{
        const id = req.params.id;
        const updateData =req.body;
        const options = {new : true};
        const result = await Model.findByIdAndUpdate(
            id,updateData,options
        )
        res.send(result)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }

})

//DELETE BY ID METHOD

router.delete('/delete/:id',async(req,res)=>{
// res.send('Deleted by ID API')

try{
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted Successfully.....`)
}
catch(error){
    res.status(400).json({message:error.message})
}
})