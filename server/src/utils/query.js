const getPagination = query => {
    const limit = Math.abs(query.limit) || 0
    const page = Math.abs(query.page) || 0 //Return all results if page is not specified

    const skip = (page - 1) * limit

    return { skip, limit }
}

module.exports = {
    getPagination,
}
