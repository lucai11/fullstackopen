const mongoose = require('mongoose');
const Schema = mongoose.Schema



if (process.argv.length !== 5 && process.argv.length !== 3) {
    console.log('Please arguments as follows: <password> <name> <number>')
    process.exit(1)
}
const password = process.argv[2]
const mongourl = `mongodb+srv://fullstackuser:${password}@cluster0.ij1kj.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const personSchema = new Schema({
    name: String,
    number: Number
})
const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){
    let newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    newPerson.save(res => {
        console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
        mongoose.connection.close()
    })
}
if(process.argv.length === 3){
    Person.find({}).then(people => {
        people.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}


