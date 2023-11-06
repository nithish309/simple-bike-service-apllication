const { query } = require("express");
const bcrypt=require("bcryptjs");
const mongoose=require("mongoose");
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri);


exports.booking = (req, res) => {
    const { bname, bvname, bvnum, bservice, blocation, bcomplaint, bmobile } = req.body;
  
    async function run() {
      try {
        await client.connect();
        // database and collection code goes here
        const db = client.db("student");
        const coll = db.collection("stud");
        // insert code goes here
        const doc = {
          ownername: bname,
          vehiclename: bvname,
          vehiclenumber: bvnum,
          service: bservice,
          address: blocation,
          complaint: bcomplaint,
          mobileno: bmobile,
        };
        const result = await coll.insertOne(doc);
        // display the results of your operation
        console.log(result.insertedId);
        res.send('Thanks for Booking.\nNK Bike service team will verify as soon as possible.');
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);
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

exports.reg = async (req, res) => {
    const { email, pass1 } = req.body;


    try {
        // Connect to the MongoDB server
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("student"); // Use the name of your database

        // Specify the collection you want to search in
        const collection = db.collection('user'); // Replace with your collection name

        // Check if the email already exists
        const existingUser = await collection.findOne({ email: email });

        if (existingUser) {
            return res.render("reg", { msg2: "Email already exists", msg_type2: "error" });
        }

        // If email doesn't exist, insert the new user
        const result = await collection.insertOne({ email: email, password: pass1 });

        if (result.insertedId) {
            res.render("login", { msg3: "Registration successful", msg_type3: "good" });
        } else {
            res.render("reg", { msg2: "Error registering user", msg_type2: "error" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user in MongoDB.');
    } finally {
        await client.close(); // Close the MongoDB connection when done
    }
};



exports.login = async (req, res) => {
    const { loginname, loginpass } = req.body;

    try {
        // Connect to the MongoDB server
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("student"); // Use the name of your database

        // Specify the collection you want to search in
        const collection = db.collection('user'); // Replace with your collection name

        // Query the collection to find documents that match the search criteria
        const query = { email: loginname, password: loginpass }; // Assuming 'email' and 'password' are the fields in your documents
        const result = await collection.findOne(query);

        if (result) {
            // Data exists and is correct
            res.render("home", { msg3: "Login successful", data: result, msg_type3: "good" });
        } else {
            // Data not found or incorrect
            res.render("login", { msg1: "Invalid email or password", msg_type1: "error" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error checking data in MongoDB.');
    } finally {
        await client.close(); // Close the MongoDB connection when done
    }
};



exports.update = async (req, res) => {
    const { st, num5 } = req.body;

    try {
        // Connect to the MongoDB server
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("student"); // Use the default database specified in the connection string

        // Specify the collection you want to update
        const collection = db.collection('stud'); // Replace with your collection name

        // Update the status for the specific vehicle number
        const updateResult = await collection.updateOne(
            { vehiclenumber: num5 },
            { $set: { status: st } }
        );

        if (updateResult.modifiedCount > 0) {
            res.render("update", { msg3: "Updation successful", msg_type3: "good" });
        } else {
            res.render("update", { msg2: "Vehicle number does not exist", msg_type2: "error" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating data in MongoDB.');
    } finally {
        await client.close(); // Close the MongoDB connection when done
    }
};



exports.date = async (req, res) => {
    const { date1, num6 } = req.body;

    try {
        // Connect to the MongoDB server
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("student"); // Use the default database specified in the connection string

        // Specify the collection you want to update
        const collection = db.collection('stud'); // Replace with your collection name

        // Update the todate field for the specific vehicle number
        const updateResult = await collection.updateOne(
            { vehiclenumber: num6 },
            { $set: { todate: date1 } }
        );

        if (updateResult.modifiedCount > 0) {
            res.render("date", { msg3: "Updation successful", msg_type3: "good" });
        } else {
            res.render("date", { msg2: "Vehicle number does not exist", msg_type2: "error" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating date in MongoDB.');
    } finally {
        await client.close(); // Close the MongoDB connection when done
    }
};



exports.delete = async (req, res) => {
    const { num3 } = req.body;

    try {
        // Connect to the MongoDB server
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("student"); // Use the default database specified in the connection string

        // Specify the collection you want to delete from
        const collection = db.collection('stud'); // Replace with your collection name

        // Check if a document with the provided vehiclenumber exists
        const existingDocument = await collection.findOne({ vehiclenumber: num3 });

        if (existingDocument) {
            // Delete the document with the provided vehiclenumber
            const deleteResult = await collection.deleteOne({ vehiclenumber: num3 });

            if (deleteResult.deletedCount > 0) {
                res.render("delete", { msg3: "Deletion successful", msg_type3: "good" });
            } 
            
        } 
        else {
            res.render("delete", { msg2: "Vehicle number does not exist", msg_type2: "error" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting data from MongoDB.');
    } finally {
        await client.close(); // Close the MongoDB connection when done
    }
};


exports.select = async (req, res) => {
    const { num1 } = req.body;
    const vehiclenumber = num1; // Assuming vehiclenumber is passed as a parameter

    try {
        await client.connect(); // Connect to the MongoDB server
        const db = client.db("student");
        const coll = db.collection("stud");

        // Find documents that match the provided vehiclenumber
        const cursor = coll.find({ vehiclenumber });

        const data = await cursor.toArray(); // Use await to wait for the cursor to fetch data

        // Check if any documents were found
        if (data.length > 0) {
            // Generate an HTML table to display the data
            let tableHtml = '<table border="1">';
            tableHtml += '<tr><th>Owner Name</th><th>Vehicle Name</th><th>Vehicle Number</th><th>Service</th><th>Address</th><th>Complaint</th><th>Mobile Number</th><th>STATUS</th><th>DELIEVERY DATE</th></tr>';

            data.forEach((doc) => {
                tableHtml += `<tr><td>${doc.ownername}</td><td>${doc.vehiclename}</td><td>${doc.vehiclenumber}</td><td>${doc.service}</td><td>${doc.address}</td><td>${doc.complaint}</td><td>${doc.mobileno}</td><td>${doc.status}</td><td>${doc.todate}</td></tr>`;
            });

            tableHtml += '</table>';

            res.send(tableHtml);
        } else {
            return res.render("select", { msg2: "Vehicle number does not exist", msg_type2: "error" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from MongoDB.');
    } finally {
            await client.close(); // Close the MongoDB connection when done, but only if it's still connected.
        
    }
};




exports.select1 = async (req, res) => {
  try {
    // Connect to the MongoDB server
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("student"); // Use the default database specified in the connection string

    // Specify the collection you want to retrieve data from
    const collection = db.collection('stud'); // Replace with your collection name

    // Query the MongoDB collection to retrieve all documents
    const documents = await collection.find({}).toArray();

    if (documents.length > 0) {
      // Render the data in a table format
      const tableRows = documents.map((doc) => {
        return `<tr>
                    
                    <td>${doc.ownername}</td>
                    <td>${doc.vehiclename}</td>
                    <td>${doc.vehiclenumber}</td>
                    <td>${doc.service}</td>
                    <td>${doc.address}</td>
                    <td>${doc.mobileno}</td>
                    <td>${doc.complaint}</td>
                    <td>${doc.status}</td>
                    <td>${doc.todate}</td>
                </tr>`;
      });

      const tableHtml = `<table border="1">
                            <thead>
                              <tr>
                                
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
    } else {
      res.send('No data found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from MongoDB.');
  } finally {
    await client.close(); // Close the MongoDB connection when done
  }
};



exports.viewbook = async (req, res) => {
    const { num4 } = req.body;
    const vehiclenumber = num4; // Assuming vehiclenumber is passed as a parameter
    
    try {
        await client.connect(); // Connect to the MongoDB server
        const db = client.db("student");
        const coll = db.collection("stud");
    
        // Find documents that match the provided vehiclenumber
        const cursor = coll.find({ vehiclenumber });
    
        const data = await cursor.toArray(); // Use await to wait for the cursor to fetch data
    
        // Check if any documents were found
        if (data.length > 0) {
            // Generate an HTML table to display the data
            let tableHtml = '<table border="1">';
            tableHtml += '<tr><th>Owner Name</th><th>Vehicle Name</th><th>Vehicle Number</th><th>Service</th><th>Address</th><th>Complaint</th><th>Mobile Number</th><th>STATUS</th><th>DELIEVERY DATE</th></tr>';
    
            data.forEach((doc) => {
                tableHtml += `<tr><td>${doc.ownername}</td><td>${doc.vehiclename}</td><td>${doc.vehiclenumber}</td><td>${doc.service}</td><td>${doc.address}</td><td>${doc.complaint}</td><td>${doc.mobileno}</td><td>${doc.status}</td><td>${doc.todate}</tr>`;
            });
    
            tableHtml += '</table>';
    
            res.send(tableHtml);
        } else {
            return res.render("viewbook", { msg2: "Vehicle number does not exist", msg_type2: "error" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data from MongoDB.');
    } finally {
        await client.close(); // Close the MongoDB connection when done
    }
};

      





