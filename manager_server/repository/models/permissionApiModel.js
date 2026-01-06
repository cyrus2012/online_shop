const permissionApiModel = {
    type: {
        id: Number,
        permission_id: Number,
        api_service: String,
        api_action: String,
        api_path: String,
        api_order: Number,
    },
    table:"permission_api"
}

export default permissionApiModel;