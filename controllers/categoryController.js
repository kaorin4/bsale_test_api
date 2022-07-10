const pool = require("../config/dbconfig");

const getAllCategories = (req, res) => {
  // establish connection
  pool.getConnection((err, connection) => {
      
    connection.query("SELECT * FROM category", (err, data) => {
        res.status(200).json({
            status: "success",
            totalCount: data?.length,
            data: data,
        });
    });

    // releasing connection
    connection.release();
  });
};

module.exports = {getAllCategories};