const express= require('express');
const path= require('path');
const port=8000;

const db=require('./config/mongoose')
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList=[
    {
        name:'Kanishka',
        phone:'15443145412'
    },
    {
        name:'Dumbledore',
        phone:'5646135411'
    },
    {
        name:'Gandalf',
        phone:'65451321545'
    }
];

app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }

        return res.render('home',{
            title : 'My Contact List',
            contact_list : contacts
        });

    })
    
    // res.send('It is running');
})

app.get('/practice',function(req,res){
    return res.render('practice',{title:'practice page'});
})

//adding a contact
app.post('/create-contact',function(req,res){
    console.log(req.body);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })

    // contactList.push(req.body);

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }

        console.log(newContact);
        res.redirect('back');
    })

    // return res.redirect('back');
    // return res.redirect('/practice');
})

//deleting a contact
app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    let id=req.query.id;

    Contact.findByIdAndDelete(id,function(error){
        if(error){
            console.log(error);
            return;
        }
        return res.redirect('back');
    })

    // let findContact=contactList.findIndex(contact => contact.phone == phone);

    // if(findContact!=-1){
    //     contactList.splice(findContact,1);
    // }

    // return res.redirect('back');
})

app.listen(port,function(error){
    if(error){
        console.log("error");
        console.log(error);
        return;
    }
    console.log('server is running on port',port);
})