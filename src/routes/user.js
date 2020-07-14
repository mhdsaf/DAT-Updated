const express = require('express');

const clients = require('../models/client');

const router = new express.Router();

router.post('/user', async(req,res)=>{
    try {
        const user = new clients({name: req.body.name, email: req.body.email, title: req.body.title, company: req.body.company, Organization: req.body.organization, ContactAgreement: req.body.ContactAgreement});
        await user.save();

        res.status(200).send({success: "Successfully inserted"})
    } catch (error) {
        console.log(error);
        res.status(400).send({error: "Something went wrong"});
    }
})
router.get('/questionnaire', async(req,res)=>{
    res.render('questionnaire');
})
router.get('/dashboard', async(req,res)=>{
    res.render('dashboard');
});
router.post('/dashboard/print', async(req,res)=>{
})
router.patch('/results', async(req,res)=>{
    try {
        console.log(req.body.time);
    const user = await clients.findOne({email: req.body.email});
    const obj = {
        Business_Strategy: req.body.BS,
        Internal_Digitalization: req.body.ID,
        Digital_Products: req.body.DP,
        Data_Management: req.body.DM,
        Content_Production: req.body.CP,
        Total: req.body.BS + req.body.ID + req.body.DP + req.body.DM + req.body.CP,
        SubmittedAt: req.body.time
    };
    await user.results.push(obj);
    await user.save();
    res.send({msg:"all good"});
    } catch (error) {
        console.log("wtf");
        console.log(error);
    }
    
});
router.post('/userresults', async(req,res)=>{
    const email = req.body.email;
    try {
        const results = await clients.findOne({email:email});
        const length = results.results.length;
        res.status(200).send(results.results[length-1]);
    } catch (error) {
        res.status(400).send({error: "Email doesn't exist"});
    }
});
router.post('/profile', async(req,res)=>{
    const email = req.body.email;
    try {
        const results = await clients.findOne({email:email});
        res.status(200).send({
            name: results.name,
            email: results.email,
            title: results.title,
            company: results.company
        });
    } catch (error) {
        res.status(400).send({error: "Email doesn't exist"});
    }
});
router.get('/try', async (req, res)=>{
    res.render('table');
})
module.exports = router