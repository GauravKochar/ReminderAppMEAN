const jwt =require('jsonwebtoken');

module.exports=(req,res,next) => {
    try {
        const token=req.headers.authorization.split(" ")[1];
       const decodedToken = jwt.verify(token,"secret_this_should_be_longer");

       req.userData= {emailId : decodedToken.emailId, user: decodedToken.user};
        next();
    } catch ({error}) {
      console.log(error);
        res.status(401).json({message:" You are not Authenticated"});
    }

}
