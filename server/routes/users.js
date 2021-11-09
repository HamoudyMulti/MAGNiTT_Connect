const { request } = require("express");
var express = require("express");
var router = express.Router();

var bcrypt = require("bcrypt");
var db = require("../db");

// router.post("/register", async (req, res) => {
//   // let isValid= true;
//   // if(isValid){
//   //   users.push({firstName:req.body.firstName});
//   //   res.redirect(`/users/${users.length-1}`);
//   //   res.json(users);
//   // } else {
//   //   console.log("Error");
//   //   res.render('users/new',{firstName:req.body.firstName});
//   // }

// try {
//   const hashedPassword = await bcrypt.hash(req.body.password, 10);
//   const user = { name: req.body.name, password: hashedPassword };

//   users.push(user);
//   res.status(201).send();
// } catch {
//   res.status(500).send();
// }

//   console.log(users);
// });

router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const password = await bcrypt.hash(req.body.password, 10);

  db.query(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// router.post("/login", async (req, res) => {
//   const user = users.find((user) => (user.name = req.body.name));
//   if (user == null) {
//     return res.status(400).send("Cannot find user");
//   }

//   try {
// if (await bcrypt.compare(req.body.password, user.password)) {
//   res.send("Success");
// } else {
//   res.send("Not Allowed");
// }
//   } catch {}
// });

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true });
  } else {
    res.send({ loggedIn: false });
  }
});

router.get("/getUserName", (req, res) => {
  if (req.session.user) {
    res.send({
      name: req.session.user[0].name,
    });
  } else {
    res.send({ failed: "No Session Found on Server" });
  }
});

router.get("/getUserRole", (req, res) => {
  if (req.session.user) {
    res.send({
      name: req.session.user[0].company_role,
    });
  } else {
    res.send({ failed: "No Session Found on Server" });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            //console.log(req.session.user);
            res.send({ success: "Login Successful" });
          } else {
            res.send({ message: "Wrong username or password" });
          }
        });
      } else {
        res.send({ message: "Email not found" });
      }
    }
  );
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Cookie Deleted");
});

// router
//   .route("/:id")
//   .get((req, res) => {
//     console.log(req.user);
//     res.send(`Get User with ID ${req.params.id}`);
//   })
//   .put((req, res) => {
//     res.send(`Update User with ID ${req.params.id}`);
//   })
//   .delete((req, res) => {
//     res.send(`Delete User with ID ${req.params.id}`);
//   });

// router.param("id", (req, res, next, id) => {
//   req.user = users[id];
//   next();
// });

router.get("/getAllUsers", (req, res) => {
  db.query(
    "SELECT `users`.`id`,`name`,`email`,`company_role`,`company_name`,`size`,`type`,`industry`,`description` FROM `companies` RIGHT JOIN `users` ON users.company_id=companies.id",
    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/getJoinRequests", (req, res) => {
  const id = req.session.user[0].id;
  db.query(
    "SELECT `company_to_user_request`.`id`,company_id,user_id,status,company_name FROM `company_to_user_request` INNER JOIN `companies` ON `company_id`=`companies`.`id` WHERE `user_id`=? AND `status`='pending'",
    [id],
    (err, result) => {
      if (err) {
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/acceptCompanyRequest", (req, res) => {
  const userId = req.body.userId;
  const companyId = req.body.companyId;

  db.query(
    "DELETE FROM `company_to_user_request` WHERE user_id=? AND company_id=?",
    [userId, companyId],
    (err, result) => {
      if (err) {
        res.send(err);
      }
    }
  );

  db.query(
    "UPDATE `users` SET company_id=?,company_role='member' WHERE id=?",
    [companyId, userId],
    (err, result) => {
      if (err) {
        res.send(err);
      }
    }
  );

  res.send('Success');
});



router.post("/rejectCompanyRequest", (req, res) => {
  const userId = req.body.userId;
  const companyId = req.body.companyId;

  db.query(
    "DELETE FROM `company_to_user_request` WHERE user_id=? AND company_id=?",
    [userId, companyId],
    (err, result) => {
      if (err) {
        res.send(err);
      }
    }
  );


  res.send('Success');
});

module.exports = router;
