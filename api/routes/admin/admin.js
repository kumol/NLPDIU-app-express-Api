var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Member = require('../../../models/member');
var Event = require('../../../models/event');
var Paper = require('../../../models/paper');
var User  = require('../../../models/user');
var Resource = require('../../../models/resource');
var Research = require('../../../models/research');
var Im = require('../../../models/img');
var multer = require('multer');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var checkAuth = require('../../../config/jwthelper');
var cntlr= require('./controller');
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname);
    }
});
i=1
var sstorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads/car');
    },
    filename:(req,file,cb)=>{
            cb(null,i+'.jpg');
    }
});
var fup = multer({storage: sstorage});
var upload = multer({storage:storage });
var fileUpload = multer({storage : storage });
router.post("/uploadimage",fup.single('image'),(req,res,next)=>{
    i++;
    if(i==4){
        i=1;
    }
    var image = new Im({
        image : req.file.path,
    })
    image.save().then((result)=>{
        Im.find().sort({_id:-1}).limit(3).exec().then((docs)=>{
            res.json(docs);
        }).catch((err)=>{
            res.status(400).json({error:err});
        });
    }).catch((err)=>{
        res.status(500).json({
            error:err
        });
    })
});
router.get("/uploadimage",(req,res,next)=>{
    Im.find().sort({_id:-1}).limit(3).exec().then((docs)=>{
        res.json(docs);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
})
router.get('/paper/:id',checkAuth.verifyJwtToken,cntlr.selectedPaper);
router.get('/event/:id',checkAuth.verifyJwtToken,cntlr.selectedEvent);
router.get('/research/:id',checkAuth.verifyJwtToken,cntlr.selectedResearch);
 router.patch('/research/:id',checkAuth.verifyJwtToken,cntlr.updateResearch);
 router.patch('/paper/:id',checkAuth.verifyJwtToken,cntlr.updatePaper);
 router.patch('/event/:id',checkAuth.verifyJwtToken,cntlr.updateEvent);
 router.get('/contact',checkAuth.verifyJwtToken,cntlr.getMsg);
 router.delete('/message/delete/:id',checkAuth.verifyJwtToken,cntlr.deleteMsg);
 router.post('/controldata',checkAuth.verifyJwtToken,cntlr.setData);
 router.post('/controldata/year',checkAuth.verifyJwtToken,cntlr.addYear);
 router.get('/controldata/year',checkAuth.verifyJwtToken,cntlr.getYear);
 router.delete('/controldata/year/:id',checkAuth.verifyJwtToken,cntlr.deleteYear);
 router.patch('/updatecontroldata/:id',checkAuth.verifyJwtToken,cntlr.updateData);
//router.get('/research/:id',checkAuth.verifyJwtToken,cntlr.getResearch);
//router.get('/paper/:id',checkAuth.verifyJwtToken,cntlr.getPaper);
//router.get('/event/:id',checkAuth.verifyJwtToken,cntlr.getEvent);
//router.post('/forget',cntlr.sendMail);
router.post('/addmember',checkAuth.verifyJwtToken,upload.single('image'),(req,res,next)=>{
    var member = new Member({
        _id : mongoose.Types.ObjectId(),
        image : req.file.path,
        name : req.body.name,
        email : req.body.email,
        position : req.body.position,
        web : req.body.web, 
    });
    member.save().then((result)=>{
        console.log("Successful");
        res.status(200).json({result:result});
    }).catch((err)=>{
        res.status(500).json({
            error:err
        });
    })
});
router.get("/member",checkAuth.verifyJwtToken,(req,res,next)=>{
    Member.find().exec().then((docs)=>{
        res.json(docs);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
});
router.get("/member/shortlist",checkAuth.verifyJwtToken,(req,res,next)=>{
    Member.find().limit(2).sort({_id:-1}).exec().then((docs)=>{
        res.json(docs);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
});
router.delete("/member/delete/:id",checkAuth.verifyJwtToken,(req,res,next)=>{
    var id = req.params.id;
    Member.deleteOne({_id:id}).then((response)=>{
        Member.find().exec().then((docs)=>{
            res.json(docs);
        }).catch((err)=>{
            res.status(400).json({error:err});
        });
    }).catch((err)=>{
        console.log(err);
    })
});
router.post('/addresearch',checkAuth.verifyJwtToken,(req,res,next)=>{
    var research = new Research({
        research:req.body.research,
    });
    console.log(research);
    research.save().then((response)=>{
        res.status(200).json(response);
    }).catch((err)=>{
        res.status(500).json(err);
    })
})
router.get('/research',checkAuth.verifyJwtToken,(req,res,next)=>{
    Research.find().exec().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
});
router.get('/research/shortlist',checkAuth.verifyJwtToken,(req,res,next)=>{
    Research.find().limit(2).sort({_id:-1}).exec().then((result)=>{
        console.log("success")
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
});
router.delete("/research/delete/:id",checkAuth.verifyJwtToken,(req,res,next)=>{
    var id = req.params.id;
    Research.deleteOne({_id:id}).then((response)=>{
        Research.find().exec().then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(400).json({error:err});
        });
    }).catch((err)=>{
        console.log(err);
    })
});
router.post('/addevent',checkAuth.verifyJwtToken,(req,res,next)=>{
    console.log(req.body);
    var event = new Event({
        event:req.body.event,
        date:req.body.date,
    });
    console.log(event);
    event.save().then((result)=>{
        res.status(200).json({message:"successfull"})
    }).catch((err)=>{
        res.status(500).json({error:err});
    })
});
router.delete("/event/delete/:id",checkAuth.verifyJwtToken,(req,res,next)=>{
    var id = req.params.id;
    Event.deleteOne({_id:id}).then((response)=>{
        Event.find().exec().then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(400).json({error:err});
        });
    }).catch((err)=>{
        console.log(err);
    })
});
router.delete('/delete/event',(req,res,next)=>{
    Event.remove({date:{$lte:Date.now()}}).then((response)=>{
        console.log(response);
        res.json(response);
    })
})
router.get("/addevent",(req,res,next)=>{

});
router.get("/event",checkAuth.verifyJwtToken,(req,res,next)=>{
    Event.find().exec().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
});
router.get('/shortlistevent',checkAuth.verifyJwtToken,(req,res,next)=>{
    Event.find().sort({_id:-1}).limit(2).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json(err);
    })
}) 
router.get('/papershortlist',checkAuth.verifyJwtToken,(req,res,next)=>{
    Paper.find().sort({_id:-1}).limit(2).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json(err);
    })
})
router.get('/resourceshortlist',checkAuth.verifyJwtToken,(req,res,next)=>{
    console.log("found");
    Resource.find().then((response)=>{
        res.status(200).json(response);
    }).catch((err)=>{
        res.json(err);
    })
})
router.get('/researchshortlist',checkAuth.verifyJwtToken,(req,res,next)=>{
    Research.find().sort({_id:-1}).limit(2).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json(err);
    })
})
router.get("/event/shortlist",checkAuth.verifyJwtToken,(req,res,next)=>{
    Event.find().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json(err);
    })
});
router.post("/addpaper",fileUpload.single('file'),(req,res,next)=>{
    console.log(req.body);
    console.log("NOt Found");
    var paper = new Paper({
        paper:req.body.paper,
        year:req.body.year
        // title : req.body.title,
        // fauther : req.body.fauther,
        // sauther: req.body.sauther,
        // tauther : req.body.tauther,
        // published : req.body.published,
        // journal : req.body.journal,
        // paper : req.file.path
    });
    console.log(paper);
    paper.save().then((result)=>{
        res.status(200).json({message:"successfull"});
    }).catch((err)=>{
        res.status(500).json({error:err});
    })
})
router.get('/paper',checkAuth.verifyJwtToken,(req,res,next)=>{
    console.log(req.header);
    Paper.find().exec().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err})
    });
});
router.get('/paper/shortlist',checkAuth.verifyJwtToken,(req,res,next)=>{
    console.log(req.header);
    Paper.find().sort({_id:-1}).limit(2).exec().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err})
    });
});
router.delete("/paper/delete/:id",checkAuth.verifyJwtToken,(req,res,next)=>{
    var id = req.params.id;
    Paper.deleteOne({_id:id}).then((response)=>{
        Paper.find().exec().then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            res.status(400).json({error:err})
        });
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/adduser',checkAuth.verifyJwtToken,(req,res,next)=>{
    var user = new User();
    console.log(req.header);
    console.log(req.body);
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password=hash;
            user.saltSecret=salt;
            user.save().then((response)=>{console.log("successful");res.status(200).json(response)}).catch((err)=>{
                console.log(err);
                if (err.code == 11000)
                    res.status(422).send(['Duplicate email adrress found.']);
                else
                    return next(err);
            })
        })
    })
})
router.post('/diunlpkumol',(req,res,next)=>{
    var user = new User();
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password=hash;
            user.saltSecret=salt;
            user.save().then((response)=>{res.status(200).json(response)}).catch((err)=>{
                if (err.code == 11000)
                    res.status(422).send(['Duplicate email adrress found.']);
                else
                    return next(err);
            })
        })
    })
})
router.get('/user',checkAuth.verifyJwtToken,(req,res,next)=>{
    User.find().then((response)=>{
        res.status(200).json(response);
    })
})
router.post('/auth',(req,res,next)=>{
    console.log(req.body);
    var userName = req.body.userName;
    var password = req.body.password;
    User.findOne({userName:userName}).then((user)=>{
        console.log(user);
        bcrypt.compare(password,user.password).then((response)=>{
            var token = jwt.sign({userName:user.username},process.env.JWT_SECRET,{expiresIn: '1h'});
            console.log(user);
            res.json({
                success:true,
                user:user.userName,
                message:'Authentication successful!',
                token:token
            })
        }).catch((err)=>{
            console.log(err)
            res.status(422).json({error:err});
        })
    }).catch((error)=>{
        console.log(error);
    })
})

router.delete("/user/delete/:id",checkAuth.verifyJwtToken,(req,res,next)=>{
    var id = req.params.id;
    console.log(id);
    User.deleteOne({_id:id}).then((response)=>{
         User.find().then((response)=>{
             res.status(200).json(response);
         }).catch((err)=>{
             res.status(400).json(err);
         })
    }).catch((err)=>{
        console.log(err);
    })
});

router.post('/addresource',checkAuth.verifyJwtToken,(req,res,next)=>{
     var resource = new Resource();
     resource.title = req.body.title;
     resource.detail = req.body.detail;
     resource.date = req.body.date;
     resource.location = req.body.location;
     resource.name = req.body.name;
     console.log(resource);
     resource.save().then((result)=>{
        Resource.find().then((response)=>{
            res.status(200).json(response);
        }).catch((err)=>{
            res.json(err);
        })
    }).catch((err)=>{
        res.status(500).json({error:err});
    })
})
router.get('/resource',checkAuth.verifyJwtToken,(req,res,next)=>{
    Resource.find().then((response)=>{
        res.status(200).json(response);
    }).catch((err)=>{
        res.json(err);
    })
});
router.delete("/resource/delete/:id",checkAuth.verifyJwtToken,(req,res,next)=>{
    var id = req.params.id;
    console.log(id);
    Resource.deleteOne({_id:id}).then((response)=>{
         Resource.find().then((response)=>{
             res.status(200).json(response);
         }).catch((err)=>{
             res.status(400).json(err);
         })
    }).catch((err)=>{
        console.log(err);
    })
});


module.exports = router