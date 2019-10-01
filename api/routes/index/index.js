var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Member = require('../../../models/member');
var Event = require('../../../models/event');
var Paper = require('../../../models/paper');
var Research = require('../../../models/research');
var Resource = require('../../../models/resource');
var User = require('../../../models/user');
var Contact = require('../../../models/contact');
var Data = require('../../../models/data');
var Year = require('../../../models/year');
router.get("/people",(req,res,next)=>{
    Member.find().select("name position email image").exec().then((docs)=>{
        res.json(docs);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
});
router.get('/people/shortlist',(req,res,next)=>{
    Member.find().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
});
router.get('/people/alumna',(req,res,next)=>{
    Member.find({position:'Alumna'}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
})
router.get('/people/undergraduate',(req,res,next)=>{
    Member.find({position:'Undergraduate'}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
})
router.get('/people/faculty',(req,res,next)=>{
    Member.find({position:'Faculty'}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
})
router.get('/people/msc',(req,res,next)=>{
    Member.find({position:"Masters Student"}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
})
router.get('/people/phd',(req,res,next)=>{
    Member.find({position:'Phd Student'}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
})
router.get("/event",(req,res,next)=>{
    Event.find().sort({_id:-1}).exec().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
});
router.get('/event/shortlist',(req,res,next)=>{
    Event.find().sort({_id:-1}).limit(3).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
})
router.get('/paper',(req,res,next)=>{
    Paper.find().sort({_id:-1}).exec().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err})
    });
});
router.get('/research',(req,res,next)=>{
    Research.find().sort({_id:-1}).exec().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
});
router.get('/research/shortlist',(req,res,next)=>{
    Research.find().sort({_id:-1}).limit(3).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
})
router.get('/paper/shortlist',(req,res,next)=>{
    Paper.find().sort({_id:-1}).limit(3).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    });
})
router.get('/resource',(req,res,next)=>{
    Resource.find().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    })
})
router.get('/paper/:id',(req,res,next)=>{
    _year = req.params.id;
    Paper.find({year:_year}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json({error:err});
    })
})
router.post('/auth',(req,res,next)=>{
    var email = req.body.email;
    User.findOne({email:email}).then((user)=>{
        res.json({
            success:true,
            user_id:user._id,
            message:'successful!',
            token:token
        })
    }).catch((error)=>{
        console.log(error);
    })
})
router.patch('/reset',(req,res,next)=>{
    var id = req.body.params;
    var password = req.body.password;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,(err,hash)=>{
            password=hash;
            saltSecret=salt;
            User.updateOne({_id:id},{$set:{password:password}}).then((result)=>{
                res.json({
                    success:true,
                })
            }).catch((err)=>{
                console.log(err);
            })
        })
    })
})
router.post('/contactus',(req,res,next)=>{
    console.log(req.body.email);
    var contact = new Contact();
    if(isValidEmail){
        contact.email = req.body.email;
    }
    contact.name = req.body.name;
    contact.number = req.body.number;
    contact.message = req.body.msg;
    contact.save().then((response)=>{
        res.status(200).json({message:'Successful'});
    }).catch((err)=>{
        res.status(500).json(err);
    })
})
router.get('/data',(req,res,next)=>{
    Data.find().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json(err);
    })
})
 router.get('/controldata/year',(req,res,next)=>{
        Year.find().sort({year:1}).then((response)=>{
            res.json(response);
        }).catch((err)=>{
            res.status(500).json(err);
        })
 })
module.exports = router 