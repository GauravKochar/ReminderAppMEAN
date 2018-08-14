
const Reminder = require('../models/remainder');
const User =require('../models/user');

const check_time= require('../Auth/check_time');
const UserController=require('../controllers/user');


exports.addReminder = (req,res,next) => {
    const reminder = new Reminder({
      title : req.body.title,
      description :req.body.description,
      startDate:req.body.startDate,
      remainderType:req.body.remainderType,
      endDate: req.body.endDate,
      userId: req.userData.user
    });
    console.log(reminder);
    reminder.save().then(result => {
      res.status(201).json({
        message:"Reminder Created",
        result:result
      })
    }).catch(err => {
      res.status(500).json({
        message:"Invalid error"
      })
    })


  }
  exports.updateReminder=(req,res,next) => {
    const reminder = new Reminder({
      ...req.body,
      userId: req.userData.user
    })

    Reminder.updateOne({_id:req.params.id,userId:req.userData.user},reminder).then(result => {
      if(result.n >0)
      {
        res.status(200).json({ message: "Update successful!" });
      } else
      {
        res.status(401).json({ message: "Not Authorised!" });
      }
     })
     .catch(error => {
      res.status(500).json({
        message: 'Couldn\'t Update post!'
      })
    });

  }

  exports.checkReminder = function() {
    const now=new Date();

     Reminder.find({}).then(results => {

        results.forEach(element => {


          switch (element.remainderType) {

            case 'Repeat':
            if(element.startDate.getHours() === now.getHours()&&
            element.startDate.getMinutes() === now.getMinutes()&&check_time.checkTime(element, now)  ) {

              UserController.findUser(element);
         }
            case 'notRepeat':
                    if(element.startDate.getDate()=== now.getDate() &&
                       element.startDate.getMonth() ===now.getMonth() &&
                      now.getFullYear() === element.startDate.getFullYear()&&
                       element.startDate.getHours() === now.getHours()&&
                       element.startDate.getMinutes() === now.getMinutes()  ) {

                       UserController.findUser(element);

                    }

                    break;

              case 'Weekly':
              if( element.startDate.getDay() === now.getDay() &&
                  element.startDate.getHours() === now.getHours()&&
                  element.startDate.getMinutes() === now.getMinutes()&&check_time.checkTime(element, now)) {


              UserController.findUser(element);
         }

         break;

        }
         });
     });

  }
  exports.getReminders = function(req,res,next) {
    Reminder.find({'userId': req.userData.user}).then(reminderList => {
      res.status(200).json({
       reminderList: reminderList
      })

    }).catch(err => {
      res.status(500).json({
        message:"Invalid error"
      })
    });


  }
  exports.getReminder = function(req,res,next) {
    Reminder.findOne({'_id': req.params.id , 'userId': req.userData.user}).then(reminder => {
      res.status(200).json({
        reminder: reminder
      })

    }).catch(err => {
      res.status(500).json({
        message:"Invalid error"
      })
    });


  }

  exports.deleteReminder = function(req,res,next) {
    console.log(req.body);
    Reminder.deleteOne({_id:req.params.id,userId:req.userData.user}).then(result => {
      console.log(result);

        if(result.n>0)
      {
        res.status(200).json({ message: "Delete successful!" });
      } else
      {
        res.status(401).json({ message: "Not Authorised!" });
      }

    }).catch(error => {
      res.status(500).json({
        message: 'Deleting  Reminder Failed!'
      });
    });



  }


