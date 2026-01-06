const permissionModel = {
    type: {
        permission_id: Number,
        permission_name: String,
        permission_control: String,
        permission_action: String,
        permission_level: Number
    },
    table: "permission"
}

export default permissionModel;