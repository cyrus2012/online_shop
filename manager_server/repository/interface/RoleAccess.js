class roleAccess{
    constructor(roleRepository){
        this.roleRepository = roleRepository;
    }

    getRole(role_id, cb){
        return this.roleRepository.getRole(role_id, cb);
    }
}

export default roleAccess;