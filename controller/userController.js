const db = require("../model");
const {Op,QueryTypes} = require("Sequelize");
const User = db.user;
const Contact = db.contact;

const addUser = async (req, res) => {
    const jane = await User.create({ firstName: "gaurav", lastName: "anthwal" });
    console.log(jane instanceof User);
    console.log(jane.firstName);
    // await jane.save();
    console.log('Jane was saved to the database!');

    console.log(jane.toJSON());
    res.status(200).json(jane.toJSON())
}

const getUsers = async (req, res) => {
    const data = await User.findAll({});
    res.status(200).json({ data: data })
}

const getUser = async (req, res) => {
    const data = await User.findOne({
        where: {
            id: req.params.id,
        }
    });

    res.status(200).json({ data: data });
}

const postUsers = async (req, res) => {
    const body = req.body;
    if (body.length > 1) {
        var data = await User.bulkCreate(body);
    } else {
        var data = await User.create(body);
    }
    console.log(data);
    res.status(200).json({ data: data })
}

const deleteUsers = async (req, res) => {
    const data = await User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json(data);
    console.log("deleted successfully", data);
}

const updateUsers = async(req, res) => {
    const body = req.body;
    const data = await User.update(body, {
        where:{
            id: req.params.id,
        }
    })
    res.status(200).json(data);
    console.log("updated successfully", data);
}

const queryUsers =async (req, res)=> {
const data = await User.count({
    where: {
        id:{
            [Op.gt]:2
        }
    }
})
res.status(200).json({data:data});
}

const findUsers = async (req, res) => {
    const data = await User.findAll({
        where: {
            lastName:"anthwal"
        }
    })
    res.status(200).json(data);

}

const getSetVirtualUsers = async (req, res) => {
const data = await User.create({
    firstName: "naresh",
    lastName: "kumar"
})
res.status(200).json(data);
}

const rawQueries = async (req, res) => {
const users =await db.sequelize.query(
    'SELECT * FROM users WHERE id IN(:id)',
    {
      replacements: {id:['7','8']},
      type: QueryTypes.SELECT
    }
  );

res.status(200).json({data:users});
}


const oneToOneUser = async (req, res) => {

//    const data =  await User.create({ firstName:"jeetendra",lastName:"singh"}) 
//    if(data && data.id){
//     await Contact.create({permanent_address:"haldwani",current_address:"dehradun",user_id:data.id})
//    }

    const data =await User.findAll({
        attributes: ["firstName","lastName"],
        include:[{
            model : Contact,
            as:"contactDetails", //change model name contact to ContactDetails
            attributes:["permanent_address","current_address"]
        }]
    })
    res.status(200).json({data:data});
}

const oneToManyUser = async (req,res) =>{
//   const data =  await Contact.create({
//         permanent_address:"haridwar",current_address:"dehradun",user_id:2
//     })

const data = await Contact.findAll({
    attributes: ["id","permanent_address","current_address"],
    include:[{
        model : User,
        as:"userDetails", //change model name user details to UserDetails
        attributes:["id","firstName","lastName"]
    }]
})

    res.status(200).json({data:data})
}


const manyToManyUser = async (req,res)=>{
    // const data = await User.create({firstName:"anu",lastName:"sem"})
    // if(data && data.id){
    //     await Contact.create({permanent_address:"Usa",current_address:"Canada",})
    // }

    const data = await Contact.findAll({
        attributes:['permanent_address','current_address'],
        include:[{
            model:User,
            attributes:['firstName','lastName']
        }]
    })
    res.status(200).json({data:data})
}

const paranoid = async(req,res)=>{
    // const data = await User.create({firstName:"ram",lastName:"singh"})
    
    // const data = await User.destroy({
    //     where:{
    //         id:2
    //     }
    // })

    const data = await User.findAll({
        attributes:["id","firstName","lastName"]
    })

    // const data = await User.restore();

    res.status(200).json({data:data})
}


module.exports = {
    addUser, getUsers, getUser, postUsers, deleteUsers, updateUsers,queryUsers,findUsers,getSetVirtualUsers
,rawQueries,oneToOneUser,oneToManyUser,manyToManyUser,paranoid}