const {Router} = require('express');
const router = Router()
const Task = require('../models/task')
const User = require('../models/user')
const verify = require("../middleware/verifyAccess")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


// Nos regresaria las tareas guardadas en la BD con el método find(). Una vez obtenidas las tareas las regresamos a la pagina principal.
router.get('/',verify, async function(req,res){

 var tasks  = await Task.find({user_id: req.userId})
 console.log(tasks) 
res.render('index', {tasks})
});

router.get('/login', (req,res) => {
  res.render('login')
})

router.post('/login', async function(req,res){

  console.log(req.body)
  var {email,password} = req.body

  /*var email = req.body.email
  var password = req.body.password*/

  //* Validar si el usuario existe
 const user = await User.findOne({email: email})

 if (!user){
   return res.status(404).send("The user does not exist")
  
 }
 // Si el usuario existe, vamos a generar un token de JWT
 else {
  const valid = await bcrypt.compare(password,user.password) 

// Si la contraseña es correcta generamos un JWT
  if (valid) {

    const token = jwt.sign({id:user.email, permission: true}, process.env.SECRET, {expiresIn: "1h"})
    console.log(token)
    res.cookie("token", token, {httpOnly:true})
    res.redirect("/")

  }

  else {
    console.log("Password is invalid")
    res.redirect('/login')
  }

 }
  
})
  

router.get('/register', (req,res) => {
  res.render('register')
})


router.post('/register', async function(req,res){
  
console.log(req.body)

var user = new User(req.body)
user.password = await bcrypt.hashSync(user.password,10)
await user.save()
res.redirect("/")

});






// Ruta que nos permita agregar nuevas tareas que vienen desde un metodo post. Una vez enviada la tarea podemos redireccionar a la pagina principal con res.redirect('/')
router.post('/add',verify, async (req,res) =>{

  var task = new Task(req.body)
  task.user_id = req.userId
  console.log(task)
  await task.save()
  res.redirect('/')

});

// Ruta para editar los datos. Primero necesitamos buscarlos en base a un id que ya me llega desde la ruta. Metodo de busqueda findById(). 
// Los editaremos en una pagina aparte llamada 'edit'
router.get('/edit/:id',   async(req,res) =>{

var id = req.params.id
var task = await Task.findById(id)
res.render('edit', {task})

})


// Ruta para efectuar la actualizacion de los datos utilizando el metodo update()
router.post('/edit/:id',   async(req,res) =>{

  console.log(req.body)
  var id = req.params.id
  await Task.updateOne({_id: id},req.body)
  res.redirect('/')

    })

// Esta ruta permita modificar el estatus de una tarea por medio de su propiedad status. 
// Necesitamos buscar el task en la BD por medio de findById, una vez encontrado el registro hay que modificar el status y guardar con save(). 
router.get('/turn/:id', async (req, res, next) => {

  var id  = req.params.id
  var task = await Task.findById(id)
  task.status = !task.status
  await task.save()
  res.redirect('/')

  });

// Ruta que nos permita eliminar tareas con el método "deleteOne"
router.get('/delete/:id',  async (req,res) =>{
  
  var id  = req.params.id
  await Task.remove({_id: id})
  res.redirect('/')

})

router.get('/logoff', (req,res)=> {

res.clearCookie("token")
res.redirect("/")
})

module.exports = router; 