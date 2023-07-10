const pagination = (page = 1, limit = 10, sortDirection = "ASC", sortWith = "id") => {

  page = parseInt(page);
  limit = parseInt(limit);

  return {
    offset: (page - 1) * limit,
    limit: limit,
    order: [
      [sortWith, sortDirection]
    ]
  }
}

module.exports = pagination;