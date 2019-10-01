var mongoose = require("mongoose");
var Member = require('../../../models/member');
var Event = require('../../../models/event');
var Paper = require('../../../models/paper');
var User  = require('../../../models/user');
var Resource = require('../../../models/resource');
var Research = require('../../../models/research');
const nodemailer = require('nodemailer');
var Contact = require('../../../models/contact');
var Data = require('../../../models/data');
var Year = require('../../../models/year');
module.exports.selectedEvent=(req,res,next)=>{
    var id = req.params.id;
    Event.findById({_id:id}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json(err);
    })
}
module.exports.updateData=(req,res,next)=>{
    id = req.params.id;
    Data.updateOne({_id:id},{$set:{"title" : req.body.title,
        "about_us" : req.body.about_us,
        "event" : req.body.event,
        "publication" : req.body.publication,
        "apublication" : req.body.apublication,
        "copyright" : req.body.copyright,
        "member" : req.body.member,
        "faculty" : req.body.faculty,
        "phd" : req.body.phd,
        "master"  : req.body.master,
        "undergraduate" : req.body.undergraduate,
        "alumna" : req.body.alumna,
        "ctitle" : req.body.ctitle,
        "jtitle" : req.body.jtitle,
        "jlink" : req.body.jlink
    }}).exec().then((result)=>{
        console.log("successful");
        res.status(200).json({
            message:"updated",
            data : result
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err,
        })
    })
}
module.exports.deleteYear = (req,res,next)=>{
    id = req.params.id;
    Year.deleteOne({_id:id}).then((response)=>{
        Year.find().then((response)=>{
            res.json(response);
        }).catch((err)=>{
            res.status(500).json(err);
        })
    }).catch((err)=>{
        res.status(500).json(err);
    })
}
module.exports.getYear = (req,res,next)=>{
    Year.find().then((response)=>{
        res.json(response);
    }).catch((err)=>{
        res.status(500).json(err);
    })
}
module.exports.addYear=(req,res,next)=>{
    var year = new Year();
    year.year = req.body.year;
    year.save().then((response)=>{
        Year.find().then((response)=>{
            res.json(response);
        }).catch((err)=>{
            res.status(500).json(err);
        })
    }).catch((err)=>{
        res.status(500).json(err);
    })
}
module.exports.setData=(req,res,next)=>{
    var data = new Data();
    data.title = req.body.title;
    data.about_us = req.body.about_us;
    data.event=req.body.event;
    data.publication=req.body.publication;
    data.apublication=req.body.apublication;
    data.copyright=req.body.copyright;
    data.member=req.body.member;
    data.faculty=req.body.faculty;
    data.phd=req.body.phd;
    data.master=req.body.master;
    data.undergraduate=req.body.undergraduate;
    data.alumna=req.body.alumna;
    data.ctitle=req.body.ctitle;
    data.jlink=req.body.jlink;
    data.jtitle=req.body.jtitle;
    data.save().then((response)=>{
        res.status(200).json({message:'Successful'});
    }).catch((err)=>{
        res.status(500).json(err);
    })
}
module.exports.deleteMsg=(req,res,next)=>{
    var id = req.params.id;
    Contact.deleteOne({_id:id}).then((result)=>{
        Contact.find().exec().then((docs)=>{
            res.json(docs);
        }).catch((err)=>{
            res.status(400).json({error:err});
        });
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports.getMsg=(req,res,next)=>{
    Contact.find().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json(err);
    })
}
module.exports.selectedPaper=(req,res,next)=>{
    var id = req.params.id;
    Paper.findById({_id:id}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json(err);
    })
}
module.exports.selectedResearch=(req,res,next)=>{
    var id = req.params.id;
    Research.findById({_id:id}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json(err);
    })
}
module.exports.editResearch=(req,res,next)=>{
    var id=req.params.id;
    Research.findById({_id:id}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({
            error:err,
        })
    })
}
module.exports.editEvent=(req,res,next)=>{
    var id=req.params.id;
    
    Event.findById({_id:id}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({
            error:err,
        })
    })
}
module.exports.editPaper=(req,res,next)=>{
    var id=req.params.id;
    Paper.findById({_id:id}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({
            error:err,
        })
    })
}
module.exports.updatePaper=(req,res,next)=>{
    var id=req.params.id;
    Paper.updateOne({_id:id},{$set:{'paper':req.body.paper,'year':req.body.year}}).exec().then((result)=>{
        console.log('updated successfully');
        res.status(200).json({
            message:"updated",
            paper : result
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err,
        })
    })
}

module.exports.updateResearch=(req,res,next)=>{
    var id=req.params.id;
    Research.updateOne({_id:id},{$set:{'research':req.body.research}}).exec().then((result)=>{
        console.log("successful");
        res.status(200).json({
            message:"updated",
            research : result
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err,
        })
    })
}
module.exports.updateEvent=(req,res,next)=>{
    var id=req.params.id;
    console.log(id);
    Event.updateOne({_id:id},{$set:{'event':req.body.event,"date":req.body.date}}).exec().then((result)=>{
        console.log('successful');
        res.status(200).json({
            message:"updated",
            event : result
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err,
        })
    })
}
module.exports.forget=(req,res,next)=>{

}
module.exports.sendMail=(req,res,next)=>{
    // var mail = req.body.email;
    // //User.findOne({email:mail}).then((user)=>{
    //     let testAccount = await nodemailer.createTestAccount();
    //     let transporter = nodemailer.createTransport({
    //         host: 'localhost',
    //         port: 3000,
    //         secure: false,
    //     });
    //     let info = await transporter.sendMail({
    //         from: 'sharifrezq@gmail.com',
    //         to: 'kumol01763@gmail.com',
    //         subject: 'Hello ✔', 
    //         text: 'Hello world?', 
    //         html: '<b>Hello world?</b>' 
    //     });
    //})
}