const pool = require("../config/dbconfig");

const pageSize = 20;
const maxPageSize = 50;

const getPagination = (numRecords, offset = 0, limit = pageSize) => {

  const numberOfPages = Math.ceil(numRecords / limit);

  if((offset > numRecords) || (offset < 0)){
    offset = 0;
  }

  const page = Math.ceil((offset+1) / limit);
  const prevPage = (offset >= limit) ? {page: page - 1, offset: offset - limit, limit} : null;
  const nextPage = (page < numberOfPages) ? {page: page + 1, offset: offset + limit, limit} : null;

  return {page, prevPage, nextPage, numberOfPages};
}

const getAllProducts = (req, res) => {

  // establish connection
  pool.getConnection((err, connection) => {

    if(err) res.status(404).json({
      status: "error",
      error: err
    });

    const conditions = buildConditions(req.query);

    connection.query(`SELECT COUNT(*) AS count FROM product WHERE ${conditions.where};`, 
      conditions.values,
      (err, countData) => {

        if(err) res.status(409).json({
          status: "error",
          error: err
        });

        const numRecords = countData[0].count;
        let limit = parseInt(req.query.limit) || pageSize;
        // max limit to 50
        if(limit > maxPageSize){
          limit = maxPageSize;
        }
        const offset = parseInt(req.query.offset) || 0;

        const orderField = req.query.orderField || "name";
        const orderType = req.query.orderType || "ASC";

        let {page, prevPage, nextPage, numberOfPages} = getPagination(numRecords, offset, limit);

        let query = `SELECT * FROM product WHERE ${conditions.where} ORDER BY ${orderField} ${orderType} LIMIT ${offset}, ${limit};`;

        connection.query(query, 
          conditions.values,
          (err, data) => {

            res.status(200).json({
                status: "success",
                totalCount: numRecords,
                totalReturned: data.length,
                data,
                pagination: {page, 
                            prevPage,
                            nextPage,
                            limit, 
                            numberOfPages}
            });
        });
    });

    // releasing connection
    connection.release();
  });
};

const buildConditions = (params) => {
  let conditionsList = [];
  let values = [];

  if (params.category) {
    conditionsList.push("category = ?");
    values.push(params.category);
  }

  if (params.name) {
    conditionsList.push("name LIKE ?");
    values.push("%" + params.name + "%");
  }

  return {
    where: conditionsList.length ? conditionsList.join(' AND ') : '1',
    values: values
  };
}

module.exports = {getAllProducts};

