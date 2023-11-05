import { Injectable } from '@angular/core';


export interface User_Data_Interface {
  iduser_candidate: Number;
  Name: String;
  Email: String;
  Password: String;
  Gender: String,
  Contact_Number: String;
  Job_Title: String;
  Position: String;
  About_Me: String;
  Skills: Array<String>;
  Facebook_Link: String;
  Twitter_Link: String;
  Instagram_Link: String;
  Linkedin_Link: String;
}

export interface Work_Experience_Interface {
  idwork_experience: Number;
  Designation: String;
  Company: String;
  Starting_Year: String;
  Ending_Year: String;
  Location: String;
  Job_Responsibilities: String;
  user_candidate_fk: Number;
}

export interface Education_Interface {
  ideducation: Number;
  Title: String;
  Degree: String;
  Institute: String;
  Location: String;
  Starting_Year: String;
  Ending_Year: String;
  About: String;
  user_candidate_fk: Number;
}






// EMPLOYER INTERFACES

export interface Employer_Data_Interface {
  idemployer: Number;
  Organization_Name: String;
  Email: String;
  Password: String;
  Contact_Number: String;
  About: String;
  Vision: String;
  Location: String;
  Website_Link: String;
  Team_Size: String;
  Industry: String;
  Year_Established: String;
}


export interface Job_Posting_Interface {
  idjob_postings: Number;
  idemployer: Number;
  Email: String;
  Phone: String;
  Location: String;
  Job_Title: String;
  Job_Type: String;
  Job_Category: String;
  Industry: String;
  Job_Experience: String;
  Job_Qualification: String;
  Job_Level: String;
  Job_Description: String;
  Job_Responsibilities: Array<String>;
  Job_Requirements: Array<String>;
  Date_Posted: String;
  Organization_Name?: String;
  Assessments_Required?: Array<String>;
  Interview_Required: String;
  Question_1?: String;
  Question_2?: String;
  Question_3?: String;
  Hidden: String;
}

@Injectable({
  providedIn: 'root'
})



export class GlobalVariablesService {

  error = "";

  hide_error = true;

  user_data: User_Data_Interface;

  
  work_experience: Array<Work_Experience_Interface>;
  
  education: Array<Education_Interface>;
  
  user_data_retrieved = false;
  
  user_type = "";
  
  work_to_delete = [];
  
  education_to_delete = [];
  
  
  
  updated_user_data_backend = true;
  updated_education_data_backend = true;
  updated_work_data_backend = true;
  deleted_education_data_backend = true;
  deleted_work_data_backend = true;
  
  
  
  
  assessment_names = [];
  
  assessment_questions = [];
  assessment_replies = {};
  
  assessment_names_retrieved_1 = false;
  assessment_names_retrieved_2 = false;
  
  saved_assessment_results = {};
  
  assessment_answers = {};
  
  current_assessment_id = "";
  
  
  current_question = "";
  current_question_number = 1;
  
  current_reply1 = "";
  current_reply2 = "";
  
  assessment_result = ["Calculating..."];

  job_applications = [];

  test_current_emotion = "";
  

  avatar = "";

  interviews_scheduled = [];

  interviews_complete = [];

  giving_interview = "";

  record_interview = true;


  job_results = [];

  
  
  // EMPLOYER VARIABLES

  employer_data: Employer_Data_Interface;
  
  updated_employer_data_backend = true;

  jobs = [];

  employers = [];
  
  viewing_job = {job: {idemployer: -1}, organization: {}, applied: false};

  viewing_organization = {};

  viewing_assessments_required = [];
  
  assessments_name_mapping = {"1": "Personality Trait Score",
                              "2": "Know Your Personality"};

  viewing_candidates = false;

  candidate_applications = [];

  videos = {};

  employer_avatar = "";
  
  constructor() { }
}
