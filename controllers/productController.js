const pool = require("../config/dbconfig");

const pageSize = 20;

const getPagination = (numRecords, offset = 0, limit = pageSize) => {

  const numberOfPages = Math.ceil(numRecords / limit);

  if((offset > numRecords) || (offset < 0)){
    offset = 0;
  }

  const page = Math.ceil((offset+1) / limit);
  const prevPage = (offset > limit) ? {page: page - 1, offset: offset - limit, limit} : null;
  const nextPage = (page < numberOfPages) ? {page: page + 1, offset: offset + limit, limit} : null;

  return {page, prevPage, nextPage, numberOfPages};
}

const getAllProducts = (req, res) => {

  // establish connection
  pool.getConnection((err, connection) => {

    connection.query("SELECT COUNT(*) AS count FROM product", 
      (err, countData) => {

        if(err) res.status(409).json({
          status: "error",
          error: err
        });

        const numRecords = countData[0].count;
        const limit = Number(req.query.limit) || pageSize;
        const offset = Number(req.query.offset) || 0;

        const orderField = req.query.orderField || "name";
        const orderType = req.query.orderType || "ASC";

        let {page, prevPage, nextPage, numberOfPages} = getPagination(numRecords, offset, limit);

        connection.query(`SELECT * FROM product ORDER BY ${orderField} ${orderType} LIMIT ${offset}, ${limit}`, 
          function (err, data) {

            res.status(200).json({
                status: "success",
                totalCount: numRecords,
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

const getProductsByCategory = (req, res) => {

  // establish connection
  pool.getConnection((err, connection) => {

    connection.query("SELECT COUNT(*) AS count FROM product WHERE category = ?", 
      [req.params.id],
      (err, countData) => {

        const numRecords = countData[0].count;
        const limit = Number(req.query.limit) || pageSize;
        const offset = Number(req.query.offset) || 0;

        const orderField = req.query.orderField || "name";
        const orderType = req.query.orderType || "ASC";

        let {page, prevPage, nextPage, numberOfPages} = getPagination(numRecords, offset, limit);

        connection.query(
          `SELECT * FROM product WHERE category = ? ORDER BY ${orderField} ${orderType} LIMIT ${offset}, ${limit}`,
          [req.params.id],
          function (err, data) {

            if(err) res.status(409);

            res.status(200).json({
              status: "success",
              totalCount: numRecords,
              data,
              pagination: {page, 
                          prevPage,
                          nextPage,
                          limit, 
                          numberOfPages}
            });
          }
        );
    });

    // releasing connection
    connection.release();
  });
}

const getProductsByName = (req, res) => {

  // establish connection
  pool.getConnection((err, connection) => {
      
    const orderField = req.query.orderField || "name";
    const orderType = (req.query.orderType == "ASC" || req.query.orderType == "DESC") || "ASC";

    connection.query(
      `SELECT * FROM product WHERE name LIKE '%${req.query.name}%' ORDER BY ${orderField} ${orderType}`,
      (err, data) => {
        res.status(200).json({
          status: "success",
          totalCount: data?.length,
          data: data,
        });
      }
    );

    // releasing connection
    connection.release();
  });
}

module.exports = {getAllProducts, getProductsByCategory, getProductsByName};

