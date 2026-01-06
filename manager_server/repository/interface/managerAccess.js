class ManagerAccess{
    
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async getUserById(id){
        return await this.userRepository.getUserById(id);
    }

    async getUserByName(name){
        return await this.userRepository.getUserByName(name);
    }

}

export default ManagerAccess;