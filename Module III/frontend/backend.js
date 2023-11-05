const mysql = require('mysql');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');

const excel = require('excel4node');
const cmd = require('node-cmd');

// const multer = require('multer');
// const upload = multer({dest:__dirname + "/src/assets"});

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const fs = require('fs');

const PORT = process.env.PORT || 3000

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));

var con = mysql.createPool({
  connectionLimit: 2,
  port: 3306,
  host: "localhost",
  user: "root",
  password: "password",
//   password: "1234",
  database: "doxa"
});


// Route that receives a POST request to /sms
app.post('/', function (req, res) {
    
    const username = req.body["username"]



    con.query(`select * from user_candidate where Name='${username}'`, function (err, result, fields) 
    {
        if (err) throw err;
        
        res.send(result[0]);
    });

});

function register_reply(io, socket, data)
{
    con.query(`select * from user_candidate where email='${data.email}' or contact_number='${data.phone}'`, function (err, result, fields)
    {
        if (err) throw err;
        
        if (result[0] != null)
            duplicate_return(io, socket, data, result[0]);

        else
        {
            con.query(`insert into user_candidate (Name, Email, Password, Contact_Number) values ('${data.name}', '${data.email}', '${data.password}', '${data.phone}')`, function (err, result, fields)
            {
                if (err) throw err;

                return_account_details(io, socket, data.email);
            });
        }
    });
}

function duplicate_return(io, socket, data, result)
{
    duplicates = {account_created: false, duplicate: []};

    if (data.email == result.Email)
        duplicates["duplicate"].push("Email");
    
    if (data.phone == result.Contact_Number)
        duplicates["duplicate"].push("Phone");


    io.to(socket.id).emit("register_reply", duplicates);
}

function return_account_details(io, socket, email)
{
    con.query(`select * from user_candidate where email='${email}'`, function (err, result, fields) 
    {
        if (err) throw err;
        
        to_return = {account_created: true, details: result[0]}

        io.to(socket.id).emit("register_reply", to_return);
    });
}


function login_reply(io, socket, data)
{
    con.query(`select * from user_candidate where email='${data.email}' and password='${data.password}'`, function (err, result, fields) 
    {
        if (err) throw err;
        
        io.to(socket.id).emit("login_reply", result[0]);
    });
}



function dashboard_info_reply(io, socket, data)
{
    to_return = [];
    
    con.query(`select * from work_experience where user_candidate_fk='${data}' order by idwork_experience`, function (err, result, fields) 
    {
        if (err) throw err;
        
        to_return.push(result);

        con.query(`select * from education where user_candidate_fk='${data}' order by ideducation`, function (err, result, fields) 
        {
            if (err) throw err;
            
            to_return.push(result);

            io.to(socket.id).emit("dashboard_info_reply", to_return);
        });
    });
}






function update_data_reply(io, socket, data)
{    
    update_user_data(io, socket, data["user_data"]);

    update_work_experience(io, socket, data["work_experience"]);

    update_education(io, socket, data["education"]);

    delete_work_experience(io, socket, data["work_to_delete"]);

    delete_education(io, socket, data["education_to_delete"]);
}

function update_user_data(io, socket, data)
{
    con.query(`update user_candidate set \
    Name='${data.Name}', Email='${data.Email}',\
    Contact_Number='${data.Contact_Number}',\
    Gender='${data.Gender}', Job_Title='${data.Job_Title}',\
    Position='${data.Position}', About_Me='${data.About_Me}',\
    Facebook_Link='${data.Facebook_Link}', \
    Twitter_Link='${data.Twitter_Link}', \
    Instagram_Link='${data.Instagram_Link}', \
    Linkedin_Link='${data.Linkedin_Link}' \
    where iduser_candidate='${data.iduser_candidate}'`, function (err, result, fields) 
    {
        if (err) throw err;

        io.to(socket.id).emit("updated_user_data");
    });
}

function update_work_experience(io, socket, data)
{
    if (data.length == 0)
    {
        io.to(socket.id).emit("updated_work_data");
    }
    for(let i = 0; i < data.length; i++)
    {
        if (data[i].idwork_experience == null)
        {
            con.query(`insert into work_experience \
            (Designation, Company, Starting_Year, Ending_Year, \
            Location, Job_Responsibilities, user_candidate_fk) \
            VALUES \
            ('${data[i].Designation}', '${data[i].Company}', \
            '${data[i].Starting_Year}', '${data[i].Ending_Year}', \
            '${data[i].Location}', '${data[i].Job_Responsibilities}', \
            '${data[i].user_candidate_fk}')`, function (err, result, fields) 
            {
                if (err) throw err;

                io.to(socket.id).emit("updated_work_data");
            });
        }
        else
        {
            con.query(`update work_experience set \
            Designation='${data[i].Designation}', Company='${data[i].Company}', \
            Starting_Year='${data[i].Starting_Year}', \
            Ending_Year='${data[i].Ending_Year}', Location='${data[i].Location}', \
            Job_Responsibilities='${data[i].Job_Responsibilities}', \
            user_candidate_fk='${data[i].user_candidate_fk}' \
            where idwork_experience='${data[i].idwork_experience}'`, function (err, result, fields) 
            {
                if (err) throw err;

                io.to(socket.id).emit("updated_work_data");
            });
        }
    }
}

function update_education(io, socket, data)
{
    if (data.length == 0)
    {
        io.to(socket.id).emit("updated_education_data");
    }
    for(let i = 0; i < data.length; i++)
    {
        if (data[i].ideducation == null)
        {
            con.query(`insert into education \
            (Title, Degree, Institute, Location, \
            Starting_Year, Ending_Year, About, user_candidate_fk) \
            VALUES \
            ('${data[i].Title}', '${data[i].Degree}', \
            '${data[i].Institute}', '${data[i].Location}', \
            '${data[i].Starting_Year}', '${data[i].Ending_Year}', \
            '${data[i].About}', '${data[i].user_candidate_fk}')`, function (err, result, fields) 
            {
                if (err) throw err;

                io.to(socket.id).emit("updated_education_data");
            });
        }
        else
        {
            con.query(`update education set \
            Title='${data[i].Title}', Degree='${data[i].Degree}', \
            Institute='${data[i].Institute}', \
            Location='${data[i].Location}', Starting_Year='${data[i].Starting_Year}', \
            Ending_Year='${data[i].Ending_Year}', \
            About='${data[i].About}', \
            user_candidate_fk='${data[i].user_candidate_fk}' \
            where ideducation='${data[i].ideducation}'`, function (err, result, fields) 
            {
                if (err) throw err;

                io.to(socket.id).emit("updated_education_data");
            });
        }
    }
}


function delete_work_experience(io, socket, data)
{
    if (data.length == 0)
        io.to(socket.id).emit("deleted_work_data");
        

    for(let i = 0; i < data.length; i++)
    {
        con.query(`delete from work_experience where idwork_experience='${data[i]}'`, function (err, result, fields) 
        {
            if (err) throw err;

            io.to(socket.id).emit("deleted_work_data");
        });
    }
}

function delete_education(io, socket, data)
{
    if (data.length == 0)
        io.to(socket.id).emit("deleted_education_data");


    for(let i = 0; i < data.length; i++)
    {
        con.query(`delete from education where ideducation='${data[i]}'`, function (err, result, fields) 
        {
            if (err) throw err;

            io.to(socket.id).emit("deleted_education_data");
        });
    }
}




function assessment_names_reply(io, socket, data)
{
    con.query(`select idAssessments, Assessment_Name from assessments order by idAssessments`, function (err, result, fields) 
    {
        if (err) throw err;
        
        io.to(socket.id).emit("assessment_names_reply", result);
    });

    con.query(`select * from assessments_taken where iduser_candidate=${data["iduser_candidate"]}`, function (err, result, fields) 
    {
        if (err) throw err;
        
        io.to(socket.id).emit("assessment_saved_results_reply", result);
    });
}




function assessment_questions_reply(io, socket, data)
{
    con.query(`select * from assessments where idAssessments=${data["idAssessments"]}`, function (err, result, fields) 
    {
        if (err) throw err;
        
        io.to(socket.id).emit("assessment_questions_reply", result[0]);
    });

    con.query(`select * from assessment_replies where idAssessments=${data["idAssessments"]}`, function (err, result, fields) 
    {
        if (err) throw err;
        
        io.to(socket.id).emit("assessment_replies_reply", result);
    });
}



function assessment_answers_reply(io, socket, data)
{
    console.log(data);

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet('Sheet 1');

    for(let property in data)
    {
        if (data["idAssessments"] == 2)
        {
            if (property != "idAssessments" && property != "iduser_candidate")
            {
                worksheet.cell(1, parseInt(property)).number(parseInt(data[property]) - 1);
            }
        }

        else
        {
            if (property != "idAssessments" && property != "iduser_candidate")
            {
                worksheet.cell(1, parseInt(property)).string("Q"+property+"A");
                worksheet.cell(2, parseInt(property)).number(parseInt(data[property]));
            }
        }
    }
    
    workbook.write(data["iduser_candidate"].toString() +".xlsx");
    
    // data["iduser_candidate"] = "temp1";
    
    /*if (data["idAssessments"] == 2)
    {
        cmd.runSync(`python predict_script.py ${data["iduser_candidate"]}`);

    
        fs.readFile(`${data["iduser_candidate"]}.txt`, function(err, file_data) {
            if(err) throw err;
        
            const arr = file_data.toString().replace(/\r\n/g,'\n').split('\n');
        
            // console.log(arr[0]);

            // io.to(socket.id).emit("assessment_answers_reply", arr);

            // console.log("\n\n\n\n\n", data, "\n\n\n\n\n");

            con.query(`SELECT Info from personality_info where Type='${arr[0]}';`
            , function (err, result, fields) 
            {
                if (err) throw err;

                arr.push(result[0]["Info"]);
                
                io.to(socket.id).emit("assessment_answers_reply", arr);

                con.query(`INSERT INTO assessments_taken (idAssessments, iduser_candidate, Result) \
                        VALUES (${data["idAssessments"]}, ${data["iduser_candidate"]}, '${arr[0]} ${result[0]["Info"]}');`
                , function (err, result, fields) 
                {
                    if (err) throw err;
                });
            });

            
        });
    }
    
    else
    {
        cmd.runSync(`python predict2_script.py ${data["iduser_candidate"]}`);
        
        // cmd.runSync(`python predict2_script.py temp1`);
        
        fs.readFile(`${data["iduser_candidate"]}_2.txt`, function(err, file_data) {
            if(err) throw err;
        
            const arr = file_data.toString().replace(/\r\n/g,'\n').split('\n');
        
            arr_copy = [...arr]

            // console.log(arr[0]);
            arr[0] = "Openness: " + arr[0] + "%";
            arr[1] = "Cooperativeness: " + arr[1] + "%";
            arr[2] = "Adjustment: " + arr[2] + "%";
            arr[3] = "Persistence: " + arr[3] + "%";
            arr[4] = "Agreeableness: " + arr[4] + "%";
            arr[5] = "Ambition: " + arr[5] + "%";
            arr[6] = "Openness to Experience: " + arr[6] + "%";
            arr[7] = "Learning Approach: " + arr[7] + "%";

            io.to(socket.id).emit("assessment_answers_reply", arr);

            // console.log("\n\n\n\n\n", data, "\n\n\n\n\n");

            con.query(`INSERT INTO assessments_taken (idAssessments, iduser_candidate, Result) \
                        VALUES (${data["idAssessments"]}, ${data["iduser_candidate"]}, '${arr.join('\\n')}');`
            , function (err, result, fields) 
            {
                if (err) throw err;
            });
        });
    }*/
    
}



io.on("connection", (socket) => {
    console.log("new connection " + socket.client.id);

    socket.on("disconnect", () => {
        console.log("disconnect " + socket.client.id);
    });

    socket.on("register", (data) => {
        register_reply(io, socket, data);
    });

    socket.on("login", (data) => {
        login_reply(io, socket, data);
    });

    socket.on("dashboard_info", (data) => {
        dashboard_info_reply(io, socket, data);
    });

    socket.on("update_data", (data) => {
        update_data_reply(io, socket, data);
    });

    socket.on("assessment_names", (data) => {
        assessment_names_reply(io, socket, data);
    });

    socket.on("assessment_questions", (data) => {
        assessment_questions_reply(io, socket, data);
    });

    socket.on("assessment_answers", (data) => {
        assessment_answers_reply(io, socket, data);
    });
});



server.listen(PORT, () => {
    console.log("listening on *:" + PORT)
});