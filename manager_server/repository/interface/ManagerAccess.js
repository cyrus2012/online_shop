class ManagerAccess{
    
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async getUserById(id, cb){
        await this.userRepository.getUserById(id, cb);
    }

    async getUserByName(name, cb){
        await this.userRepository.getUserByName(name, cb);
    }

}

export default ManagerAccess;