const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User , Course} = require("../db");
const jwt=require("jsonwebtoken")
//const JWT_KEY = require("../index");
//not able to import jwt key due to circular dependency admin.js and index.js both import something from one another
//hence we make a seperate file to store the secret key
const {JWT_KEY}=require("../config")
const   router = Router();

// Admin Routes

router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    
    await Admin.create({
        username:username,
        password:password
    })
//control flow wont reach res.json of user isnt created
//ideally we should use zod at all these places
    res.json({
        msg: "Admin Created Successfully!"
    })

});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic

    const username=req.body.username
    const password=req.body.password
    //console.log(JWT_KEY)
    let user=await Admin.find({
        username:username,
        password:password
    })
    //console.log(user)
    if(user.length>0){
        let token=jwt.sign({username,},JWT_KEY)
        res.json({
            token: token
        })
    }else{
        res.json({
            msg:"Email & pass doesnt match!"
        })
    }

   
   
});

router.post('/courses', adminMiddleware, async(req, res) => {
    
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;

   const new_course=await Course.create({
        title : title,
        description : description,
        price : price,
        imageLink : imageLink
    })

    res.json({
        msg: "Course created!",
        course_ID: new_course._id
    })
});


router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic

    const courseList = await Course.find({})
    res.json({
        courses: courseList
    })
})


// {
//     "title":"Full Stack Web Development",
//     "description":"app.100xdevs.com course",
//     "price":3600,
//     "imageLink":"https://google.com/cat.png"
// }
module.exports = router;