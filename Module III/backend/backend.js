const mysql = require('mysql');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const request = require('request');

const excel = require('excel4node');
const cmd = require('node-cmd');

const ffmpeg = require('ffmpeg');
const executeCommand = require("execute-command-sync");
const glob = require("glob");


// const multer = require('multer');
// const upload = multer({dest:__dirname + "/src/assets"});

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    maxHttpBufferSize: 1e8, pingTimeout: 60000
});
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const flask_api = 'http://localhost:5000/';

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));

var con = mysql.createPool({
  connectionLimit: 2,
  port: 3306,
  host: "localhost",
  user: "root",
//   password: "Habib123##",
  password: "1234",
  database: "doxa"
});

// ['Anger', 'Contempt', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness', 'Surprise']
var emotion_mapping = {
    Stress: [["Fear", "Anger"], ["Disgust"]],
    Nervous: [["Fear", "Sadness"], ["Anger", "Sadness"]],
    // Punishment: [["Sadness"]],
    Relaxed: [["Neutral", "Happiness"], ["Sadness", "Surprise"], ["Neutral", "Surprise"], ["Neutral"]],
    Neutral: [["Neutral"]],
    Excited: [["Happiness", "Fear"], ["Happiness", "Anger"], ["Surprise", "Fear"], ["Surprise", "Anger"], ["Surprise"]]
}

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
        io.to(socket.id).emit("login_reply_pic", fs.readFileSync('./avatars/default.png', 'base64'));
    });
}






function login_reply(io, socket, data)
{
    con.query(`select * from user_candidate where email='${data.email}' and password='${data.password}'`, function (err, result, fields) 
    {
        if (err) throw err;
        
        io.to(socket.id).emit("login_reply", result[0]);

        if (result.length > 0 && result[0]["iduser_candidate"] != undefined)
        {
            if (fs.existsSync(`./avatars/candidates/${result[0]["iduser_candidate"]}.png`))
                io.to(socket.id).emit("login_reply_pic", fs.readFileSync(`./avatars/candidates/${result[0]["iduser_candidate"]}.png`, 'base64'));
            else
                io.to(socket.id).emit("login_reply_pic", fs.readFileSync('./avatars/default.png', 'base64'));
        

            applied_results = [];
            iduser_candidate = result[0]["iduser_candidate"];

            con.query(`select * from job_postings where idjob_postings in (select idjob_postings from job_applications where iduser_candidate=${iduser_candidate})`, function (err, result, fields) 
            {
                if (err) throw err;

                applied_results = applied_results.concat(result);
                
                con.query(`select * from job_postings where idjob_postings in (select idjob_postings from interviews_schedule where iduser_candidate=${iduser_candidate})`, function (err, result, fields) 
                {
                    if (err) throw err;
                    
                    applied_results = applied_results.concat(result);

                    con.query(`select * from job_postings where idjob_postings in (select idjob_postings from interviews_complete where iduser_candidate=${iduser_candidate})`, function (err, result, fields) 
                    {
                        if (err) throw err;
                        
                        applied_results = applied_results.concat(result);

                        con.query(`select * from job_postings where idjob_postings in (select idjob_postings from job_result where iduser_candidate=${iduser_candidate})`, function (err, result, fields) 
                        {
                            if (err) throw err;
                            
                            applied_results = applied_results.concat(result);

                            for(let i in applied_results)
                            {
                                if (fs.existsSync(`./avatars/employers/${applied_results[i]["idemployer"]}.png`))
                                    applied_results[i]["employer_pic"] = 'data:image/png;base64,' + fs.readFileSync(`./avatars/employers/${applied_results[i]["idemployer"]}.png`, 'base64');
                                else
                                    applied_results[i]["employer_pic"] = 'data:image/png;base64,' + fs.readFileSync('./avatars/default.png', 'base64');
                            }

                            io.to(socket.id).emit("job_applications_reply", applied_results);
                        });

                        // io.to(socket.id).emit("job_applications_reply", result);
                    });

                    // io.to(socket.id).emit("job_applications_reply", result);
                });

                // io.to(socket.id).emit("job_applications_reply", result);
            });
        }
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
    if (data["Skills"] !=  null)
        data["Skills"] = data["Skills"].join('\n');
    
    console.log(data)

    con.query(`update user_candidate set \
    Name='${data.Name}', Email='${data.Email}',\
    Contact_Number='${data.Contact_Number}',\
    Gender='${data.Gender}', Job_Title='${data.Job_Title}',\
    Position='${data.Position}', About_Me='${data.About_Me}',\
    Facebook_Link='${data.Facebook_Link}', \
    Twitter_Link='${data.Twitter_Link}', \
    Instagram_Link='${data.Instagram_Link}', \
    Linkedin_Link='${data.Linkedin_Link}', \
    Skills='${data.Skills}' \
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
    results = {};

    con.query(`select idAssessments, Assessment_Name from assessments order by idAssessments`, function (err, result, fields) 
    {
        if (err) throw err;
        
        // io.to(socket.id).emit("assessment_names_reply", result);
        results["assessment_names_reply"] = result;
        con.query(`select * from assessments_taken where iduser_candidate=${data["iduser_candidate"]}`, function (err, result, fields) 
        {
            if (err) throw err;
            
            results["assessment_saved_results_reply"] = result;
            // io.to(socket.id).emit("assessment_saved_results_reply", result);

            io.to(socket.id).emit("assessment_names_reply", results);
        });
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
        console.log(data, result);
        io.to(socket.id).emit("assessment_replies_reply", result);
    });
}



function assessment_answers_reply(io, socket, data)
{
    console.log(data);

    // let workbook = new excel.Workbook();
    // let worksheet = workbook.addWorksheet('Sheet 1');

    // for(let property in data)
    // {
    //     if (data["idAssessments"] == 2)
    //     {
    //         if (property != "idAssessments" && property != "iduser_candidate")
    //         {
    //             worksheet.cell(1, parseInt(property)).number(parseInt(data[property]) - 1);
    //         }
    //     }

    //     else
    //     {
    //         if (property != "idAssessments" && property != "iduser_candidate")
    //         {
    //             worksheet.cell(1, parseInt(property)).string("Q"+property+"A");
    //             worksheet.cell(2, parseInt(property)).number(parseInt(data[property]));
    //         }
    //     }
    // }
    
    
    // workbook.write(data["iduser_candidate"].toString()+".xlsx", function (){
    
    // data["iduser_candidate"] = "temp1";
    
    if (data["idAssessments"] == 2)
    {
        request.post({
            url:     flask_api+'ass2',
            json:    { "data": data }
            }, 
            function(error, response, body) {

                arr = body;
                console.log(arr);

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



        // cmd.runSync(`python3 predict_script.py ${data["iduser_candidate"]}`);

    
        // fs.readFile(`${data["iduser_candidate"]}.txt`, function(err, file_data) {
        //     if(err) throw err;
        
        //     const arr = file_data.toString().replace(/\r\n/g,'\n').split('\n');
        
        //     // console.log(arr[0]);

        //     // io.to(socket.id).emit("assessment_answers_reply", arr);

        //     // console.log("\n\n\n\n\n", data, "\n\n\n\n\n");

        //     con.query(`SELECT Info from personality_info where Type='${arr[0]}';`
        //     , function (err, result, fields) 
        //     {
        //         if (err) throw err;

        //         arr.push(result[0]["Info"]);
                
        //         io.to(socket.id).emit("assessment_answers_reply", arr);

        //         con.query(`INSERT INTO assessments_taken (idAssessments, iduser_candidate, Result) \
        //                 VALUES (${data["idAssessments"]}, ${data["iduser_candidate"]}, '${arr[0]} ${result[0]["Info"]}');`
        //         , function (err, result, fields) 
        //         {
        //             if (err) throw err;
        //             cmd.runSync(`rm ${data["iduser_candidate"].toString()}.xlsx`);
        //         });
        //     });

            
        // });
    }
    
    else
    {
        request.post({
            url:     flask_api+'ass1',
            json:    { "data": data }
            }, 
            function(error, response, body) {

                arr = body;
                console.log(arr);

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

                con.query(`INSERT INTO assessments_taken (idAssessments, iduser_candidate, Result) \
                            VALUES (${data["idAssessments"]}, ${data["iduser_candidate"]}, '${arr.join('\\n')}');`
                , function (err, result, fields) 
                {
                    if (err) throw err;
                });
        });

        // cmd.runSync(`python3 predict2_script.py ${data["iduser_candidate"]}`);
        
        // // cmd.runSync(`python predict2_script.py temp1`);
        
        // fs.readFile(`${data["iduser_candidate"]}_2.txt`, function(err, file_data) {
        //     if(err) throw err;
        
        //     const arr = file_data.toString().replace(/\r\n/g,'\n').split('\n');
        
        //     arr_copy = [...arr]

        //     // console.log(arr[0]);
        //     arr[0] = "Openness: " + arr[0] + "%";
        //     arr[1] = "Cooperativeness: " + arr[1] + "%";
        //     arr[2] = "Adjustment: " + arr[2] + "%";
        //     arr[3] = "Persistence: " + arr[3] + "%";
        //     arr[4] = "Agreeableness: " + arr[4] + "%";
        //     arr[5] = "Ambition: " + arr[5] + "%";
        //     arr[6] = "Openness to Experience: " + arr[6] + "%";
        //     arr[7] = "Learning Approach: " + arr[7] + "%";

        //     io.to(socket.id).emit("assessment_answers_reply", arr);

        //     // console.log("\n\n\n\n\n", data, "\n\n\n\n\n");

        //     con.query(`INSERT INTO assessments_taken (idAssessments, iduser_candidate, Result) \
        //                 VALUES (${data["idAssessments"]}, ${data["iduser_candidate"]}, '${arr.join('\\n')}');`
        //     , function (err, result, fields) 
        //     {
        //         if (err) throw err;
        //         cmd.runSync(`rm ${data["iduser_candidate"].toString()}.xlsx`);
        //     });
        // });
    }
    // });
}


function apply_job_reply(io, socket, data)
{
    // console.log(data);
    
    con.query(`select idAssessments from assessments_taken where iduser_candidate='${data["iduser_candidate"]}'`, function (err, result, fields) 
    {
        if (err) throw err;
        
        assessments_taken = [];

        for(let i of result)
        {
            assessments_taken.push(i["idAssessments"].toString());
        }

        // console.log(assessments_taken);

        for(let i of data["Assessments_Required"])
        {
            if (i != "" && assessments_taken.includes(i) == false)
            {
                io.to(socket.id).emit("apply_job_reply", {applied: false, idjob_postings: data["idjob_postings"]});
                return;
            }
        }

        con.query(`insert into job_applications (iduser_candidate, idjob_postings) VALUES ('${data["iduser_candidate"]}', '${data["idjob_postings"]}')`, function (err, result, fields) 
        {
            if (err) throw err;

            io.to(socket.id).emit("apply_job_reply", {applied: true, idjob_postings: data["idjob_postings"]});
        });
        // io.to(socket.id).emit("assessment_names_reply", result);
    });
}


function snapshot_reply(io, socket, data)
{
    // console.log(data);

    request.post({
        url:     flask_api+'emotion_recog',
        json:    { "data": data }
        }, 
        function(error, response, body) {
            io.to(socket.id).emit("snapshot_reply", body);
    });
}


function update_avatar_candidate(io, socket, data)
{
    let buff = new Buffer.from(data["avatar"].replace(/^data:image\/\w+;base64,/, ''), 'base64');
    fs.writeFileSync(`./avatars/candidates/${data["iduser_candidate"]}.png`, buff);
}


function update_avatar_employer(io, socket, data)
{
    let buff = new Buffer.from(data["avatar"].replace(/^data:image\/\w+;base64,/, ''), 'base64');
    fs.writeFileSync(`./avatars/employers/${data["idemployer"]}.png`, buff);
}

function get_interviews_scheduled(io, socket, data)
{

    con.query(`SELECT job_postings.*, employer.Organization_Name from job_postings JOIN employer USING (idemployer) where job_postings.idjob_postings in (SELECT idjob_postings from interviews_schedule where iduser_candidate='${data["iduser_candidate"]}');`, function (err, result, fields)
    {
        if (err) throw err;

        // console.log(result);
        
        io.to(socket.id).emit("get_interviews_scheduled_reply", result);
    });

    con.query(`SELECT job_postings.*, employer.Organization_Name from job_postings JOIN employer USING (idemployer) where job_postings.idjob_postings in (SELECT idjob_postings from interviews_complete where iduser_candidate='${data["iduser_candidate"]}');`, function (err, result, fields)
    {
        if (err) throw err;

        // console.log(result);
        
        io.to(socket.id).emit("get_interviews_complete_reply", result);
    });
}



function send_interview_video(io, socket, data)
{
    // console.log(data["data"].replace(/^data:video\/[\w-]+;base64,/, ''));
    // console.log(data);
    let buff = new Buffer.from(data["data"].replace(/^data:video\/[\w-]+;base64,/, ''), 'base64');
    if (!fs.existsSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}`)) 
    {
        fs.mkdirSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}`, { recursive: true});
    }
    
    if (fs.existsSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/${data["Question"]}.webm`)) 
    {
        fs.unlinkSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/${data["Question"]}.webm`)
        fs.writeFileSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/${data["Question"]}.webm`, buff);
    }
    else
        fs.writeFileSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/${data["Question"]}.webm`, buff);

    
    //   console.log("Video written");

    io.to(socket.id).emit("send_interview_video_reply", {"written": true});
}



function end_interview(io, socket, data)
{

    

    // ['Anger', 'Contempt', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness', 'Surprise']
    con.query(`insert into interviews_complete (idjob_postings, iduser_candidate) values \
        ('${data["idjob_postings"]}', '${data["iduser_candidate"]}')`, function (err, result, fields)
    {
        if (err) throw err;

        fs.mkdirSync(`./emotion_detection_temp/${data["idjob_postings"]}/${data["iduser_candidate"]}`, { recursive: true })
        executeCommand(`ffmpeg -i ./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/1.webm -r 1 ./emotion_detection_temp/${data["idjob_postings"]}/${data["iduser_candidate"]}/1_%02d.png`);
        
        data["current_video"] = 1;

        extract_emotions(data);

        con.query(`delete from interviews_schedule where idjob_postings='${data["idjob_postings"]}' and iduser_candidate='${data["iduser_candidate"]}'`, function (err, result, fields)
        {
            if (err) throw err;

            io.to(socket.id).emit("end_interview_reply", {inserted: true, removed: true});

        });
    });
}

var getDirectories = function (src, callback) {
    glob(src + '/**/*', callback);
};

function extract_emotions(data)
{
    try {
        getDirectories(`./emotion_detection_temp/${data["idjob_postings"]}/${data["iduser_candidate"]}`, function (err, res) {
        if (err) {
            console.log('Error', err);
        } else {
            // console.log(res);
            
            images = [];
            
            for(let i = 0; i < res.length; i++)
            {
                images.push('data:image/png;base64,' + fs.readFileSync(res[i], 'base64'));
            }


            request.post({
                url:     flask_api+'batch_emotion_recog',
                json:    { "images": images }
                }, 
                function(error, response, body) {
                    console.log(body);
                    fs.rmdirSync(`./emotion_detection_temp/${data["idjob_postings"]}/${data["iduser_candidate"]}`, { recursive: true });

                    percentages = {};

                    for(let i = 0; i < body.length; i++)
                    {
                        if (!(body[i] in percentages))
                        {
                            var count_current_emotions = 0;
                            for(let j = 0; j < body.length; j++)
                            {
                                if (body[j] == body[i])
                                    count_current_emotions += 1;    
                            }

                            percentages[body[i]] = count_current_emotions / body.length
                        }
                    }
                    // console.log(percentages);
                    
                    // ['Anger', 'Contempt', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness', 'Surprise']
                    con.query(`insert into emotions_detected (idjob_postings, iduser_candidate, Anger, Contempt,\
                        Disgust, Fear, Happiness, Neutral, Sadness, Surprise) values \
                        ('${data["idjob_postings"]}', '${data["iduser_candidate"]}', '${percentages["Anger"]}', \
                        '${percentages["Contempt"]}', '${percentages["Disgust"]}', '${data["Fear"]}', \
                        '${percentages["Happiness"]}', '${percentages["Neutral"]}', '${percentages["Sadness"]}', \
                        '${percentages["Surprise"]}')`, function (err, result, fields)
                    {
                        if (err) throw err;
                    
                        if (data["current_video"] < 3)
                        {
                            data["current_video"] += 1;

                            fs.mkdirSync(`./emotion_detection_temp/${data["idjob_postings"]}/${data["iduser_candidate"]}`, { recursive: true })
                            executeCommand(`ffmpeg -i ./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/${data["current_video"]}.webm -r 1 ./emotion_detection_temp/${data["idjob_postings"]}/${data["iduser_candidate"]}/${data["current_video"]}_%02d.png`);
                            
                            extract_emotions(data);
                        }
                    });

                    // emotion_state_classification(percentages);
                });


        }
        });

    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
}


// extract_emotions({iduser_candidate: 1, idjob_postings: 2});



function emotion_state_classification(percentages)
{
    // Classifying into states
    states = {};

    for(let i in percentages)
    {
        if (percentages[i] == "undefined")
            delete percentages[i];
    }

    for(let i in emotion_mapping)
    {
        total_state_percentage = 0;
        for(let j of emotion_mapping[i])
        {
            current_emotions_state_percentage = 1;
            let meet_all = true;
            
            for(let k of j)
            {
                if (!(k in percentages))
                {
                    meet_all = false;
                }
                else
                    current_emotions_state_percentage = Math.min(current_emotions_state_percentage, parseFloat(percentages[k]));
            }

            if (meet_all)
                total_state_percentage += current_emotions_state_percentage;
        }

        states[i] = total_state_percentage;
    }

    // console.log(states);
    return {states: states, percentages: percentages};
}


function get_job_results(io, socket, data)
{
    results = [];

    con.query(`SELECT job_postings.*, employer.Organization_Name from job_postings JOIN employer USING (idemployer) WHERE job_postings.idjob_postings IN \
            (select idjob_postings from job_result where iduser_candidate='${data["iduser_candidate"]}')`, function (err, result, fields)
    {
        if (err) throw err;
        
        results = result;

        con.query(`SELECT * from job_result where iduser_candidate='${data["iduser_candidate"]}'`, function (err, result, fields)
        {
            if (err) throw err;
            
            for(let i in result)
            {
                for(let j in results)
                {
                    if (results[j]["idjob_postings"] == result[i]["idjob_postings"])
                    {
                        results[j]["result"] = result[i]["result"];
                    }
                }
            }

            for(let i in results)
            {
                if (fs.existsSync(`./avatars/employers/${results[i]["idemployer"]}.png`))
                    results[i]["employer_pic"] = 'data:image/png;base64,' + fs.readFileSync(`./avatars/employers/${results[i]["idemployer"]}.png`, 'base64');
                else
                    results[i]["employer_pic"] = 'data:image/png;base64,' + fs.readFileSync('./avatars/default.png', 'base64');
            }

            io.to(socket.id).emit("get_job_results_reply", results);
        });
    });
}









// executeCommand("ffmpeg -i ./interviews/2/1/output.webm -r 0.2 ./emotion_detection_temp/2/1/1_%02d.png");



// EMPLOYER FUNCTIONS

function employer_register_reply(io, socket, data)
{
    con.query(`select * from employer where email='${data.email}' or contact_number='${data.phone}'`, function (err, result, fields)
    {
        if (err) throw err;
        
        if (result[0] != null)
            employer_duplicate_return(io, socket, data, result[0]);

        else
        {
            con.query(`insert into employer (Organization_Name, Email, Password, Contact_Number) values ('${data.name}', '${data.email}', '${data.password}', '${data.phone}')`, function (err, result, fields)
            {
                if (err) throw err;

                employer_return_account_details(io, socket, data.email);
            });
        }
    });
}

function employer_duplicate_return(io, socket, data, result)
{
    duplicates = {account_created: false, duplicate: []};

    if (data.email == result.Email)
        duplicates["duplicate"].push("Email");
    
    if (data.phone == result.Contact_Number)
        duplicates["duplicate"].push("Phone");


    io.to(socket.id).emit("employer_register_reply", duplicates);
}

function employer_return_account_details(io, socket, email)
{
    con.query(`select * from employer where email='${email}'`, function (err, result, fields) 
    {
        if (err) throw err;
        
        to_return = {account_created: true, details: result[0]}

        io.to(socket.id).emit("employer_register_reply", to_return);
        io.to(socket.id).emit("employer_login_reply_pic", fs.readFileSync('./avatars/default.png', 'base64'));
    });
}



function employer_login_reply(io, socket, data)
{
    con.query(`select * from employer where email='${data.email}' and password='${data.password}'`, function (err, result, fields) 
    {
        if (err) throw err;

        if (result.length > 0 && result[0]["idemployer"] != undefined)
        {
            if (fs.existsSync(`./avatars/employers/${result[0]["idemployer"]}.png`))
                io.to(socket.id).emit("employer_login_reply_pic", fs.readFileSync(`./avatars/employers/${result[0]["idemployer"]}.png`, 'base64'));
            else
                io.to(socket.id).emit("employer_login_reply_pic", fs.readFileSync('./avatars/default.png', 'base64'));
        }
        
        io.to(socket.id).emit("employer_login_reply", result[0]);
    });
}




function post_job_reply(io, socket, data)
{
    data.Job_Responsibilities = data.Job_Responsibilities.join('\n');
    data.Job_Requirements = data.Job_Requirements.join('\n');
    data.Assessments_Required = data.Assessments_Required.join('\n');
    
    // console.log(data);
    let date = new Date();
    let dateArr = date.toDateString().split(' ');
    let dateFormat = dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3];

    con.query(`insert into job_postings (idemployer, Email, Phone, Location, Job_Title, Job_Type, Job_Category, Industry, Job_Experience, \
                Job_Qualification, Job_Level, Job_Description, Job_Responsibilities, Job_Requirements, Date_Posted, Assessments_Required, Interview_Required, Question_1, Question_2, Question_3) \
                VALUES ('${data["idemployer"]}', '${data["Email"]}', '${data["Phone"]}', '${data["Location"]}', '${data["Job_Title"]}', '${data["Job_Type"]}', \
                        '${data["Job_Category"]}', '${data["Industry"]}', '${data["Job_Experience"]}', '${data["Job_Qualification"]}', '${data["Job_Level"]}', \
                        '${data["Job_Description"]}', '${data["Job_Responsibilities"]}', '${data["Job_Requirements"]}', '${dateFormat}', '${data["Assessments_Required"]}', \
                        '${data["Interview_Required"]}', '${data["Question_1"]}', '${data["Question_2"]}', '${data["Question_3"]}')`, function (err, result, fields)
    {
        if (err) throw err;
        
        io.to(socket.id).emit("post_job_reply", {inserted: true});
    });
}


function edit_job_reply(io, socket, data)
{
    data.Job_Responsibilities = data.Job_Responsibilities.join('\n');
    data.Job_Requirements = data.Job_Requirements.join('\n');
    data.Assessments_Required = data.Assessments_Required.join('\n');
    
    // console.log(data);
    // let date = new Date();
    // let dateArr = date.toDateString().split(' ');
    // let dateFormat = dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3];

    con.query(`UPDATE job_postings SET \
                idemployer='${data["idemployer"]}', Email='${data["Email"]}', Phone='${data["Phone"]}', Location='${data["Location"]}', \
                Job_Title='${data["Job_Title"]}', Job_Type='${data["Job_Type"]}', Job_Category='${data["Job_Category"]}', Industry='${data["Industry"]}', \
                Job_Experience='${data["Job_Experience"]}', Job_Qualification='${data["Job_Qualification"]}', Job_Level='${data["Job_Level"]}', \
                Job_Description='${data["Job_Description"]}', Job_Responsibilities='${data["Job_Responsibilities"]}', Job_Requirements='${data["Job_Requirements"]}', \
                Date_Posted='${data["Date_Posted"]}', Assessments_Required='${data["Assessments_Required"]}', Interview_Required='${data["Interview_Required"]}', \
                Question_1='${data["Question_1"]}', Question_2='${data["Question_2"]}', Question_3='${data["Question_3"]}' WHERE idjob_postings=${data["idjob_postings"]}`, function (err, result, fields)
    {
        if (err) throw err;
        
        io.to(socket.id).emit("edit_job_reply", {inserted: true});
    });
}


function hide_job_reply(io, socket, data)
{
    con.query(`UPDATE job_postings SET Hidden='${data["Hidden"]}' WHERE idjob_postings=${data["idjob_postings"]}`, function (err, result, fields)
    {
        if (err) throw err;
        
        io.to(socket.id).emit("hide_job_reply", {inserted: true});
    });
}

function delete_job_reply(io, socket, data)
{
    con.query(`DELETE FROM job_postings WHERE idjob_postings=${data["idjob_postings"]}`, function (err, result, fields)
    {
        if (err) throw err;
        
        io.to(socket.id).emit("delete_job_reply", {removed: true});
    });
}


function get_jobs_reply(io, socket, data)
{
    con.query(`SELECT job_postings.*, employer.Organization_Name from job_postings JOIN employer USING (idemployer) WHERE job_postings.Hidden='No';`, function (err, result, fields)
    {
        if (err) throw err;
        
        for(let i in result)
        {
            if (fs.existsSync(`./avatars/employers/${result[i]["idemployer"]}.png`))
                result[i]["employer_pic"] = 'data:image/png;base64,' + fs.readFileSync(`./avatars/employers/${result[i]["idemployer"]}.png`, 'base64');
            else
                result[i]["employer_pic"] = 'data:image/png;base64,' + fs.readFileSync('./avatars/default.png', 'base64');
        }

        io.to(socket.id).emit("get_jobs_reply", result);
    });
}


function get_organization_details(io, socket, data)
{
    con.query(`SELECT * from employer where idemployer=${data};`, function (err, result, fields)
    {
        if (err) throw err;
        
        if (fs.existsSync(`./avatars/employers/${data}.png`))
            result[0]["employer_pic"] = 'data:image/png;base64,' + fs.readFileSync(`./avatars/employers/${data}.png`, 'base64');
        else
            result[0]["employer_pic"] = 'data:image/png;base64,' + fs.readFileSync('./avatars/default.png', 'base64');

        io.to(socket.id).emit("organization_details_reply", result[0]);
    });
}


function get_employers_reply(io, socket, data)
{
    con.query(`SELECT * from employer`, function (err, result, fields)
    {
        if (err) throw err;
        
        io.to(socket.id).emit("get_employers_reply", result);
    });
}


function update_employer_data_reply(io, socket, data)
{
    console.log(data);
    con.query(`update employer set Email='${data["Email"]}', Contact_Number='${data["Contact_Number"]}', \
                About='${data["About"]}', Vision='${data["Vision"]}', Location='${data["Location"]}',\
                Website_Link='${data["Website_Link"]}', Team_Size='${data["Team_Size"]}', Industry='${data["Industry"]}',\ 
                Year_Established='${data["Year_Established"]}' where idemployer='${data["idemployer"]}'`, function (err, result, fields)
    {
        if (err) throw err;
        
        io.to(socket.id).emit("update_employer_data_reply", true);
    });
}


function get_self_jobs_reply(io, socket, data)
{
    con.query(`SELECT job_postings.*, employer.Organization_Name from job_postings JOIN employer USING (idemployer) where job_postings.idemployer=${data};`, function (err, result, fields)
    {
        if (err) throw err;
        
        for(let i in result)
        {
            if (fs.existsSync(`./avatars/employers/${result[i]["idemployer"]}.png`))
                result[i]["employer_pic"] = 'data:image/png;base64,' + fs.readFileSync(`./avatars/employers/${result[i]["idemployer"]}.png`, 'base64');
            else
                result[i]["employer_pic"] = 'data:image/png;base64,' + fs.readFileSync('./avatars/default.png', 'base64');
        }

        io.to(socket.id).emit("get_jobs_reply", result);
    });
}


function get_candidates_details_reply(io, socket, data)
{
    results = {};

    con.query(`select * from user_candidate where iduser_candidate in (select iduser_candidate from job_applications where idjob_postings=${data})`, function (err, result, fields)
    {
        if (err) throw err;
        
        results.job_applications = result;

        con.query(`select * from user_candidate where iduser_candidate in (select iduser_candidate from interviews_schedule where idjob_postings=${data})`, function (err, result, fields)
        {
            if (err) throw err;
            
            results.interviews_schedule = result;

            con.query(`select * from user_candidate where iduser_candidate in (select iduser_candidate from interviews_complete where idjob_postings=${data})`, function (err, result, fields)
            {
                if (err) throw err;
                
                results.interviews_complete = result;

                io.to(socket.id).emit("get_candidates_details_reply", results);
            });
        });
    }); 
}


function get_candidate_resume_reply(io, socket, data)
{
    to_return = [];
    

    if (fs.existsSync(`./avatars/candidates/${data["iduser_candidate"]}.png`))
            var picture = fs.readFileSync(`./avatars/candidates/${data["iduser_candidate"]}.png`, 'base64');
    else
            var picture = fs.readFileSync('./avatars/default.png', 'base64');

    con.query(`select * from work_experience where user_candidate_fk='${data["iduser_candidate"]}' order by idwork_experience`, function (err, result, fields) 
    {
        if (err) throw err;
        
        to_return.push(result);

        con.query(`select * from education where user_candidate_fk='${data["iduser_candidate"]}' order by ideducation`, function (err, result, fields) 
        {
            if (err) throw err;
            
            to_return.push(result);
            to_return.push(picture);
            to_return.push(`${data["iduser_candidate"]}`);

            con.query(`select Result from assessments_taken where iduser_candidate='${data["iduser_candidate"]}' and idAssessments='2'`, function (err, result, fields) 
            {
                if (err) throw err;
                
                to_return.push(result);
                
                
                if (data["reply_emit"] == "one") 
                    io.to(socket.id).emit("get_candidate_resume_reply", to_return);
                else
                    io.to(socket.id).emit("get_all_candidate_resume_reply", to_return);
            });
            
            // if (data["reply_emit"] == "one") 
            //     io.to(socket.id).emit("get_candidate_resume_reply", to_return);
            // else
            //     io.to(socket.id).emit("get_all_candidate_resume_reply", to_return);
        });
    });
}


function reject_candidate(io, socket, data)
{
    con.query(`delete from job_applications where idjob_postings='${data["idjob_postings"]}' and iduser_candidate='${data["iduser_candidate"]}'`, function (err, result, fields) 
    {
        if (err) throw err;

        con.query(`insert into job_result (idjob_postings, iduser_candidate, result) values ('${data["idjob_postings"]}', '${data["iduser_candidate"]}', 'No')`, function (err, result, fields) 
        {
            if (err) throw err;

            io.to(socket.id).emit("reject_candidate_reply", {removed: true});
        });
    });
}


function accept_candidate(io, socket, data)
{
    con.query(`select Interview_Required from job_postings where idjob_postings='${data["idjob_postings"]}'`, function (err, result, fields) 
    {
        if (err) throw err;

        if (result[0]["Interview_Required"] == "Yes")
        {
            con.query(`insert into interviews_schedule (idjob_postings, iduser_candidate) values ('${data["idjob_postings"]}', '${data["iduser_candidate"]}')`, function (err, result, fields)
            {
                if (err) throw err;
                
                con.query(`delete from job_applications where idjob_postings='${data["idjob_postings"]}' and iduser_candidate='${data["iduser_candidate"]}'`, function (err, result, fields) 
                {
                    if (err) throw err;

                    io.to(socket.id).emit("accept_candidate_reply", {removed: true, inserted: true});
                });
            });
        }
        else
        {
            con.query(`delete from job_applications where idjob_postings='${data["idjob_postings"]}' and iduser_candidate='${data["iduser_candidate"]}'`, function (err, result, fields) 
            {
                if (err) throw err;

                con.query(`insert into job_result (idjob_postings, iduser_candidate, result) values ('${data["idjob_postings"]}', '${data["iduser_candidate"]}', 'Yes')`, function (err, result, fields) 
                {
                    if (err) throw err;

                    io.to(socket.id).emit("accept_candidate_reply", {removed: true});
                });
            });
        }
    });
}



function get_videos(io, socket, data)
{
    reply = {video_1: null, video_2: null, video_3: null};

    if (fs.existsSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/1.webm`))
        reply.video_1 = 'data:video/x-matroska;base64,' + fs.readFileSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/1.webm`, 'base64');
    
    if (fs.existsSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/2.webm`))
        reply.video_2 = 'data:video/webm;base64,' + fs.readFileSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/2.webm`, 'base64');
    
    if (fs.existsSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/3.webm`))
        reply.video_3 = 'data:video/webm;base64,' + fs.readFileSync(`./interviews/${data["idjob_postings"]}/${data["iduser_candidate"]}/3.webm`, 'base64');

    con.query(`select Anger, Contempt, Disgust, Fear, Happiness, Neutral, Sadness, Surprise from emotions_detected where idjob_postings='${data["idjob_postings"]}' and iduser_candidate='${data["iduser_candidate"]}' ORDER BY idemotions_detected ASC`, function (err, result, fields) 
    {
        if (err) throw err;

        reply.question_1 = emotion_state_classification(result[0]);
        reply.question_1_basic = reply.question_1["percentages"];
        reply.question_1 = reply.question_1["states"];

        con.query(`select Anger, Contempt, Disgust, Fear, Happiness, Neutral, Sadness, Surprise from emotions_detected where idjob_postings='${data["idjob_postings"]}' and iduser_candidate='${data["iduser_candidate"]}' ORDER BY idemotions_detected ASC`, function (err, result, fields) 
        {
            if (err) throw err;

            reply.question_2 = emotion_state_classification(result[1]);
            reply.question_2_basic = reply.question_2["percentages"];
            reply.question_2 = reply.question_2["states"];

            con.query(`select Anger, Contempt, Disgust, Fear, Happiness, Neutral, Sadness, Surprise from emotions_detected where idjob_postings='${data["idjob_postings"]}' and iduser_candidate='${data["iduser_candidate"]}' ORDER BY idemotions_detected ASC`, function (err, result, fields) 
            {
                if (err) throw err;

                reply.question_3 = emotion_state_classification(result[2]);
                reply.question_3_basic = reply.question_3["percentages"];
                reply.question_3 = reply.question_3["states"];

                
                basic_emotions = ['Anger', 'Fear', 'Happiness', 'Neutral', 'Sadness', 'Surprise', 'Contempt', 'Disgust'];

                for(let i of basic_emotions)
                {
                    if (!(i in reply.question_1_basic))
                        reply.question_1_basic[i] = 0;
                    
                    if (!(i in reply.question_2_basic))
                        reply.question_2_basic[i] = 0;
                    
                    if (!(i in reply.question_3_basic))
                        reply.question_3_basic[i] = 0;
                }


                io.to(socket.id).emit("get_videos_reply", reply);
            });
        });
    });
}



function accept_candidate_answers(io, socket, data)
{
    con.query(`delete from interviews_complete where idjob_postings='${data["idjob_postings"]}' and iduser_candidate='${data["iduser_candidate"]}'`, function (err, result, fields) 
    {
        if (err) throw err;

        con.query(`insert into job_result (idjob_postings, iduser_candidate, result) values ('${data["idjob_postings"]}', '${data["iduser_candidate"]}', 'Yes')`, function (err, result, fields) 
        {
            if (err) throw err;

            io.to(socket.id).emit("accept_candidate_answers_reply", {removed: true});
        });
    });
}


function reject_candidate_answers(io, socket, data)
{
    con.query(`delete from interviews_complete where idjob_postings='${data["idjob_postings"]}' and iduser_candidate='${data["iduser_candidate"]}'`, function (err, result, fields) 
    {
        if (err) throw err;

        con.query(`insert into job_result (idjob_postings, iduser_candidate, result) values ('${data["idjob_postings"]}', '${data["iduser_candidate"]}', 'No')`, function (err, result, fields) 
        {
            if (err) throw err;

            io.to(socket.id).emit("reject_candidate_answers_reply", {removed: true});
        });
    });
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

    socket.on("apply_job", (data) => {
        apply_job_reply(io, socket, data);
    });

    socket.on("snapshot", (data) => {
        snapshot_reply(io, socket, data);
    });

    socket.on("update_avatar_candidate", (data) => {
        update_avatar_candidate(io, socket, data);
    });

    socket.on("get_interviews_scheduled", (data) => {
        get_interviews_scheduled(io, socket, data);
    });

    socket.on("send_interview_video", (data) => {
        send_interview_video(io, socket, data);
    });

    socket.on("end_interview", (data) => {
        end_interview(io, socket, data);
    });

    socket.on("get_job_results", (data) => {
        get_job_results(io, socket, data);
    });

    

    // EMPLOYER FUNCTIONS

    socket.on("employer_register", (data) => {
        employer_register_reply(io, socket, data);
    });

    socket.on("employer_login", (data) => {
        employer_login_reply(io, socket, data);
    });

    socket.on("update_avatar_employer", (data) => {
        update_avatar_employer(io, socket, data);
    });

    socket.on("post_job", (data) => {
        post_job_reply(io, socket, data);
    });

    socket.on("edit_job", (data) => {
        edit_job_reply(io, socket, data);
    });

    socket.on("hide_job", (data) => {
        hide_job_reply(io, socket, data);
    });

    socket.on("delete_job", (data) => {
        delete_job_reply(io, socket, data);
    });

    socket.on("get_jobs", (data) => {
        get_jobs_reply(io, socket, data);
    });

    socket.on("organization_details", (data) => {
        get_organization_details(io, socket, data);
    });

    socket.on("get_employers", (data) => {
        get_employers_reply(io, socket, data);
    });

    socket.on("update_employer_data", (data) => {
        update_employer_data_reply(io, socket, data);
    });

    socket.on("get_self_jobs", (data) => {
        get_self_jobs_reply(io, socket, data);
    });

    socket.on("get_candidates_details", (data) => {
        get_candidates_details_reply(io, socket, data);
    });

    socket.on("get_candidate_resume", (data) => {
        get_candidate_resume_reply(io, socket, data);
    });

    socket.on("reject_candidate", (data) => {
        reject_candidate(io, socket, data);
    });

    socket.on("accept_candidate", (data) => {
        accept_candidate(io, socket, data);
    });

    socket.on("get_videos", (data) => {
        get_videos(io, socket, data);
    });

    socket.on("accept_candidate_answers", (data) => {
        accept_candidate_answers(io, socket, data);
    });

    socket.on("reject_candidate_answers", (data) => {
        reject_candidate_answers(io, socket, data);
    });
});



server.listen(PORT, () => {
    console.log("listening on *:" + PORT)
});