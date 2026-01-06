const  roleModel = {
    type: {
        role_id: Number,
        name: String,
        permission_ids: String,
        permission_ca: String,
        role_desc: String
    },
    table: "role",
}

export default roleModel;