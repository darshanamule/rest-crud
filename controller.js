const User = require('./model')

function controller() {
    return {
        async read(req, res) {

            const users = await User.find()
            return res.send(users)
            
        },

        async create(req, res) {
            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
            });
        
            await newUser.save()
            return res.send('User created')
        },

        async update(req, res) {
            const updateUser = await User.findOne({ username: req.body.username })
            updateUser.name = req.body.newName;

            const doc = await updateUser.save()
            return res.send(doc)
        },

        delete(req, res) {
            User.deleteOne({$and: [ {username: req.body.username, password: req.body.password}]},
                 (err, doc) => {
                if (!err) {
                    return res.send('User Deleted');
                }
                else { return console.log('Error in user delete :' + err); }
            });
        }
        
    } 
}


module.exports = controller