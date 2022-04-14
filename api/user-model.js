let id = 0

function getId() {
    return ++id
}

let users = [
    {id: getId(), username: 'cowboyBarista', password: 'noneYa'},
    {id: getId(), username: 'trailerMan', password: 'trailerMan1'}
]

module.exports = {
    async findAll() {
        return users
    },
    async create({username, password}){
        const newUser = { id: getId(), username, password}
        users.push(newUser)
        return newUser
    },
    async login({username, password}){
       const uUser = users.find(u => u.username && u.password === username && password)
        if (!uUser) return null
    }
}