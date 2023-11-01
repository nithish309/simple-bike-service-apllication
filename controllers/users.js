const { query } = require("express");
const mysql=require("mysql2");
const bcrypt=require("bcryptjs");


const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"store",
});

// database activities
exports.booking=(req,res)=>{
    //console.log(req.body);
    
    const{bname,bvname,bvnum,bservice,blocation,bcomplaint,bmobile}=req.body;
     /*db.query("select vehiclenumber from storetable where vehiclenumber=?",[bvnum],(error,result)=>{
        if(error){
            console.log(error)
        }
        if(result.length>0){
            return res.render("booking",{msg:"vehicle number already exists",msg_type:"error"});
        }*/
        // insert data into database
        db.query("insert into storetable set ?",{ownername: bname,
            vehiclename: bvname,
            vehiclenumber: bvnum,
            service: bservice,
            address: blocation,
            mobileno: bmobile,
            complaint: bcomplaint},(error,result)=>{
            if(error){
                console.log(error);
            }else{
                console.log(result);
                //return res.render("booking",{msg2:"Thanks for Booking",msg2_type:"good"});
                res.send("Thanks for Booking <br> NK Bike service team will verify as soon as possible");
            }
        });
   // });
};
exports.register=(req,res)=>{
    //console.log(req.body);
    const{name,pass}=req.body;
    if(name==="nithishchinnasamy91@gmail.com" && pass==="30.09.2003"){
        return res.render("update");
    }
    else{
        return res.render("register",{msg1:"It accessble only for admin",msg_type1:"error"});
    }
};
exports.reg=(req,res)=>{
    //console.log(req.body);
    const{email,phone}=req.body;
    //retrieve the data from database
    db.query("select email from user where email=?",[email],(error,result)=>{
        if(error){
            console.log(error)
        }
        if(result.length>0){
            return res.render("reg",{msg2:"email already exists",msg_type2:"error"});
        }
        db.query("insert into user set ?",{email:email,phone:phone},(error,result)=>{
            if(error){
                console.log(error);
            }else{
                console.log(result);
                return res.render("login",{msg3:"Registration successfull",msg_type3:"good"});
                //res.send("Thanks for Booking <br> NK Bike service team will verify as soon as possible");
            }
        });

    });
};


exports.login = (req, res) => {
    console.log(req.body);
    try{
        const{loginname,loginpass}=req.body;
        if(!loginname || !loginpass){
                return res.status(401).render("login",{msg1:"Please enter your email and mobile number",msg_type1:"error"});
        }
        db.query("select email from user where email=?",[loginname],async(error,result)=>{
            console.log(result);
            if(result <=0){
                return res.status(401).render("login",{msg1:"email or mobile number invalid",msg_type1:"error"});
            }else{
                if((loginname === result[0].email)){
                    return res.render("home",{msg3:"login successfull",msg_type3:"good"});
                    
                }else{
                    return res.status(401).render("login",{msg1:"email or mobile number invalid",msg_type1:"error"});
                }
            }

        });

    }catch(error){

    }
        
    


};



exports.update = (req, res) => {
    console.log(req.body);
    const { st, num5 } = req.body;

    db.query("SELECT COUNT(*) AS count FROM storetable WHERE vehiclenumber = ?", [num5], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            const count = result[0].count;
            if (count === 0) {
                return res.render("update", { msg2: "Vehicle number does not exist", msg_type2: "error" });
            } else {
                db.query("UPDATE storetable SET status = ? WHERE vehiclenumber = ?", [st, num5], (updateError, updateResult) => {
                    if (updateError) {
                        console.log(updateError);
                    } else {
                        console.log(updateResult);
                        return res.render("update", { msg3: "Updation successful", msg_type3: "good" });
                    }
                });
            }
        }
    });
};


exports.date = (req, res) => {
    console.log(req.body);
    const { date1, num5 } = req.body;

    db.query("SELECT COUNT(*) AS count FROM storetable WHERE vehiclenumber = ?", [num5], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            const count = result[0].count;
            if (count === 0) {
                return res.render("date", { msg2: "Vehicle number does not exist", msg_type2: "error" });
            } else {
                db.query("UPDATE storetable SET todate=? WHERE vehiclenumber = ?", [date1, num5], (updateError, updateResult) => {
                    if (updateError) {
                        console.log(updateError);
                    } else {
                        console.log(updateResult);
                        return res.render("date", { msg3: "Updation successful", msg_type3: "good" });
                    }
                });
            }
        }
    });
};


exports.select = (req, res) => {
    const { num1 } = req.body;

    // Check if a record with the provided vehicle number exists
    db.query("SELECT storetable.id, storetable.ownername, storetable.vehiclename, storetable.vehiclenumber, storetable.service, storetable.address, storetable.mobileno, storetable.complaint, storetable.status,storetable.todate, user.* FROM storetable INNER JOIN user ON storetable.id = user.id WHERE storetable.vehiclenumber = ?", [num1], (error, results) => {
        if (error) {
            // Handle the error, if any
            console.log(error);
            // Return an error response
            //res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.length === 0) {
            // No record found with the provided vehicle number
            return res.render("select", { msg2: "Vehicle number does not exist", msg_type2: "error" });
        } else {
            // Render the data in a table format
            const tableRows = results.map(result => {
                return `<tr>
                            <td>${result.id}</td>
                            <td>${result.ownername}</td>
                            <td>${result.vehiclename}</td>
                            <td>${result.vehiclenumber}</td>
                            <td>${result.service}</td>
                            <td>${result.address}</td>
                            <td>${result.mobileno}</td>
                            <td>${result.complaint}</td>
                            <td>${result.status}</td>
                            <td>${result.email}</td>
                            <td>${result.phone}</td>
                            <td>${result.todate}</td>

                        </tr>`;
            });

            const tableHtml = `<table border="1">
                                  <thead>
                                    <tr>
                                      <th>ID</th>
                                      <th>OWNER NAME</th>
                                      <th>VEHICLE NAME</th>
                                      <th>VEHICLE NUMBER</th>
                                      <th>SERVICE</th>
                                      <th>ADDRESS</th>
                                      <th>MOBILE NUMBER</th>
                                      <th>COMPLAINT</th>
                                      <th>STATUS</th>
                                      <th>REGISTER EMAIL</th>
                                      <th>REGISTER PHONE</th>
                                      <th>DELIVERY DATE</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    ${tableRows.join('')}
                                  </tbody>
                                </table>`;

            // Send the HTML table as a response
            res.send(tableHtml);
        }
    });
};


exports.select1=(req,res)=>{

    db.query("SELECT * from storetable,user",(error, results) => {
        if (error) {
            // Handle the error, if any
            console.log(error);
           // res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Render the data in a table format
            const tableRows = results.map(result => {
                return `<tr>
                            <td>${result.id}</td>
                            <td>${result.ownername}</td>
                            <td>${result.vehiclename}</td>
                            <td>${result.vehiclenumber}</td>
                            <td>${result.service}</td>
                            <td>${result.address}</td>
                            <td>${result.mobileno}</td>
                            <td>${result.complaint}</td>
                            <td>${result.status}</td>
                            <td>${result.email}</td>
                            <td>${result.phone}</td>
                            <td>${result.todate}</td>
                        </tr>`;
            });

            const tableHtml = `<table border="1">
                                  <thead>
                                    <tr>
                                      <th>ID</th>
                                      <th>OWNER NAME</th>
                                      <th>VEHICLE NAME</th>
                                      <th>VEHICLE NUMBER</th>
                                      <th>SERVICE</th>
                                      <th>ADDRESS</th>
                                      <th>MOBILE NUMBER</th>
                                      <th>COMPLAINT</th>
                                      <th>STATUS</th>
                                      <th>REGISTER EMAIL</th>
                                      <th>REGISTER PHONE</th>
                                      <th>DELIVERY DATE</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    ${tableRows.join('')}
                                  </tbody>
                                </table>`;

            // Send the HTML table as a response
            res.send(tableHtml);
        }
    });

};

exports.delete = (req, res) => {
    console.log(req.body);
    const { num3 } = req.body;

    db.query("SELECT COUNT(*) AS count FROM storetable WHERE vehiclenumber = ?", [num3], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            const count = result[0].count;
            if (count === 0) {
                return res.render("delete", { msg2: "Vehicle number does not exist", msg_type2: "error" });
            } else {
                db.query("delete from storetable WHERE vehiclenumber = ?", [num3], (deleteError, deleteResult) => {
                    if (deleteError) {
                        console.log(deleteError);
                    } else {
                        console.log(deleteResult);
                        return res.render("delete", { msg3: "deletion successful", msg_type3: "good" });
                    }
                });
            }
        }
    });
};

exports.viewbook = (req, res) => {
    const { num4 } = req.body;

    // Check if a record with the provided vehicle number exists
    db.query("SELECT storetable.id, storetable.ownername, storetable.vehiclename, storetable.vehiclenumber, storetable.service, storetable.address, storetable.mobileno, storetable.complaint, storetable.status,storetable.todate FROM storetable INNER JOIN user ON storetable.id = user.id WHERE storetable.vehiclenumber = ?", [num4], (error, results) => {
        if (error) {
            // Handle the error, if any
            console.log(error);
            // Return an error response
            //res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.length === 0) {
            // No record found with the provided vehicle number
            return res.render("viewbook", { msg2: "Vehicle number does not exist", msg_type2: "error" });
        } else {
            // Render the data in a table format
            const tableRows = results.map(result => {
                return `<tr>
                            <td>${result.id}</td>
                            <td>${result.ownername}</td>
                            <td>${result.vehiclename}</td>
                            <td>${result.vehiclenumber}</td>
                            <td>${result.service}</td>
                            <td>${result.address}</td>
                            <td>${result.mobileno}</td>
                            <td>${result.complaint}</td>
                            <td>${result.status}</td>
                            
                            <td>${result.todate}</td>

                            
                        </tr>`;
            });

            const tableHtml = `<table border="1">
                                  <thead>
                                    <tr>
                                      <th>ID</th>
                                      <th>OWNER NAME</th>
                                      <th>VEHICLE NAME</th>
                                      <th>VEHICLE NUMBER</th>
                                      <th>SERVICE</th>
                                      <th>ADDRESS</th>
                                      <th>MOBILE NUMBER</th>
                                      <th>COMPLAINT</th>
                                      <th>STATUS</th>
                                      
                                      <th>DELIVERY DATE</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    ${tableRows.join('')}
                                  </tbody>
                                </table>`;

            // Send the HTML table as a response
            res.send(tableHtml);
        }
    });
};




