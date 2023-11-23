# DOXA: AI-Powered Recruitment Assistant

## Overview

DOXA is a web-based smart recruitment assistant designed to streamline the recruitment process for organizations. It incorporates features such as CV generation, job posting, job application, personality assessment, facial emotion analysis in video interviews, and more. The system comprises three main modules: Personality Assessment, Face Detection, and Emotion Recognition.

## Modules

### Personality Assessment

DOXA employs two personality assessment models:

1.  **Multi-Layered Perceptron (MLP):** Determines the personality psycho-type with a 95% accuracy.
2.  **Linear Regression Model:** Scores personality traits with an R2 score of 0.95 and mean-squared error of 13.05.

### Face Detection

Utilizes OpenCV's Haarcascade for real-time face detection in the online interview portal. This module efficiently processes images, breaking down face detection into multiple stages, ensuring quick and accurate results.

### Emotion Recognition

Employs a Convolutional Neural Network (CNN) trained on the FER-2013 dataset to detect emotions during video interviews. The dataset was re-labeled for improved accuracy, achieving a 76% accuracy rate.

## DOXA System Features

### User-Friendly Dashboard

- Login and signup functionality for candidates and recruiters.
- Dashboard displaying personal information, work details, job listings, assessments, and offers fetched from the database.
- Update user information directly from the dashboard.

### Assessments

- Browse and take available tests with scores saved in the database.

### Jobs Listing

- Recruiters can create job postings with specific requirements, including assessments.
- Candidates can explore and apply to job postings, with applications screened based on requirements.

### Interview Portal

- Recruiters set questions for video interviews.
- Face detection and emotion recognition analyze applicant responses.
- Detailed performance reports, including confidence levels, are generated and saved in the database.

### Problem Statement and Proposed Solution

Organizations face challenges in recruiting professionals due to a large number of applicants and the need for efficient screening. DOXA's use of personality assessments and advanced screening methods aims to enhance the recruitment process, ensuring better hiring decisions and increased employee retention.

### Conclusion

DOXA, with its AI-powered recruitment assistant, offers a solution to streamline recruitment processes, improve candidate quality, and reduce mis-hiring costs. The system has received positive feedback from recruiters, and future enhancements include chat options, recommender systems, and a mobile app for improved accessibility.
