var express = require("express");
var router = express.Router();

var bcrypt = require("bcrypt");
var db = require("../db");

router.post("/sendInviteToUser", (req, res) => {
  const requestingCompanyId = req.session.user[0].company_id;
  const receivingUserId = req.body.userId;

  db.query(
    "INSERT INTO `company_to_user_request` (`company_id`, `user_id`, `status`) VALUES (?,?,?)",
    [requestingCompanyId, receivingUserId, "pending"],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/new", (req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const industry = req.body.industry;
  const description = req.body.description;

  let createdCompanyID = 0;

  db.query(
    "INSERT INTO companies (company_name,type,industry,description) VALUES (?,?,?,?)",
    [name, type, industry, description],
    (err, result) => {
      if (err) {
        res.send({ message: "Company Name Already Exists" });
      } else {
        //res.send({ success: "Company Created" });

        createdCompanyID = result.insertId;

        db.query(
          "UPDATE users SET company_id=?,company_role=? WHERE users.id=?",
          [createdCompanyID, "owner", req.session.user[0].id],
          (err, result) => {
            if (err) {
              //res.send({ message: "Company Name Already Exists" });
            } else {
              res.send({ success: "Company Created" });
            }
          }
        );
      }
    }
  );
});

router.get("/getCompany", (req, res) => {
  const id = req.session.user[0].id;

  db.query(
    "SELECT `companies`.`id`,`company_name`,`size`,`type`,`industry`,`description` FROM `companies` INNER JOIN `users` ON users.company_id=companies.id WHERE users.id=?",
    [id],
    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/getCompanyMembers/:id", (req, res) => {
  const id = `${req.params.id}`;

  db.query(
    "SELECT `id`,`name`,`email`,`company_role` FROM `users` WHERE `company_id`=?",
    [id],
    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/connectionSent/:id", (req, res) => {
  const companyId = req.session.user[0].company_id;
  const userId = `${req.params.id}`;

  db.query(
    "SELECT * FROM `company_to_user_request` WHERE `user_id`=? AND `company_id`=?",
    [userId, companyId],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/getCompanies", (req, res) => {
  db.query(
    "SELECT `companies`.`id`,`company_name`,`size`,`type`,`industry`,`description` FROM `companies`",

    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/makeConnectionRequest", (req, res) => {
  const sendingCompanyId = req.session.user[0].company_id;
  const receivingCompanyId = req.body.receivingCompanyId;

  db.query(
    "INSERT INTO `company_connections` (company_first,company_second,status) VALUES (?,?,'pending')",
    [sendingCompanyId, receivingCompanyId],
    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/getCompanyConnectionRequests", (req, res) => {
  const companyId = req.session.user[0].company_id;

  db.query(
    "SELECT `company_connections`.id,`company_connections`.`company_first`,`company_name`,`type`,`industry` FROM `company_connections`INNER JOIN `companies` ON `company_first`=`companies`.`id` WHERE `company_second`=? AND `status`='pending'",
    [companyId],
    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/acceptCompanyRequest", (req, res) => {
  const firstCompanyId = req.body.companyId;
  const secondCompanyId = req.session.user[0].company_id;

  db.query(
    "UPDATE `company_connections` SET `status`='connected' WHERE `company_first`=? AND`company_second`=?",
    [firstCompanyId, secondCompanyId],
    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/rejectCompanyRequest", (req, res) => {
  const firstCompanyId = req.body.companyId;
  const secondCompanyId = req.session.user[0].company_id;

  db.query(
    "DELETE FROM `company_connections` WHERE `company_first`=? AND `company_second`=? ",
    [firstCompanyId, secondCompanyId],
    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/getActiveConnections", (req, res) => {
  const companyId = req.session.user[0].company_id;

  db.query(
    "(SELECT `company_connections`.`id`,`company_name`,`type`,`industry` FROM `company_connections` INNER JOIN `companies` ON `company_first`=`companies`.`id` WHERE `company_second`=? AND `status`='connected') UNION (SELECT `company_connections`.`id`,`company_name`,`type`,`industry` FROM `company_connections` INNER JOIN `companies` ON `company_second`=`companies`.`id` WHERE `company_first`=? AND `status`='connected')",
    [companyId, companyId],
    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/CompanySentPending/:id", (req, res) => {
  const companyId = req.session.user[0].company_id;

  db.query(
    "SELECT * FROM `company_connections` WHERE `company_first`=? AND `company_second`=? AND `status`='pending'",
    [companyId, req.params.id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/CompanyReceivedPending/:id", (req, res) => {
  const companyId = req.session.user[0].company_id;

  db.query(
    "SELECT * FROM `company_connections` WHERE `company_first`=? AND `company_second`=? AND `status`='pending'",
    [req.params.id, companyId],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/CompanyIsConnected/:id", (req, res) => {
  const companyId = req.session.user[0].company_id;

  db.query(
    "(SELECT * FROM `company_connections` WHERE `company_second`=? AND `company_first`=? AND `status`='connected') UNION (SELECT * FROM `company_connections` WHERE `company_second`=? AND `company_first`=? AND `status`='connected') ",
    [req.params.id, companyId, companyId, req.params.id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
