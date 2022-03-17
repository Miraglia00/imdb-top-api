module.exports = (modelObject) => {
    let response = {
        data: modelObject,
        valid: true,
        errors: {}
    };
    const validation = modelObject.validateSync();
    if(validation === undefined || validation === null) {
        return response;
    }

    for(error in validation.errors) {
        let {path, message} = validation.errors[error];

        response.errors[path] = message;
    }
    response.valid = false;

    return response;
}