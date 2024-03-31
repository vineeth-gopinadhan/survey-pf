-- Create mst schema
CREATE SCHEMA IF NOT EXISTS mst;

-- Create usr schema
CREATE SCHEMA IF NOT EXISTS usr;

-- Create Survey Table
CREATE TABLE mst.survey (
    survey_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Question Table
CREATE TABLE mst.question (
    question_id SERIAL PRIMARY KEY,
    survey_id INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    "order" INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_survey FOREIGN KEY (survey_id) REFERENCES mst.survey(survey_id) ON DELETE CASCADE,
    CONSTRAINT unique_survey_order UNIQUE (survey_id, "order")
);

-- Create Option Table
CREATE TABLE mst.option (
    option_id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    image_url VARCHAR(50),
    subtitle VARCHAR(50) NOT NULL,
    skip_to_question INT REFERENCES mst.question(question_id) ON DELETE SET NULL,
    "order" INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES mst.question(question_id) ON DELETE CASCADE,
    CONSTRAINT unique_order_option_id UNIQUE ("order", question_id)
);

-- Create User Table
CREATE TABLE usr.user (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Response Table
CREATE TABLE usr.response (
    response_id SERIAL PRIMARY KEY,
    survey_id INT NOT NULL,
    question_id INT NOT NULL,
    option_id INT NOT NULL,
    respondent_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_survey_resp FOREIGN KEY (survey_id) REFERENCES mst.survey(survey_id) ON DELETE CASCADE,
    CONSTRAINT fk_question_resp FOREIGN KEY (question_id) REFERENCES mst.question(question_id) ON DELETE CASCADE,
    CONSTRAINT fk_option_resp FOREIGN KEY (option_id) REFERENCES mst.option(option_id) ON DELETE CASCADE,
    CONSTRAINT fk_survey_response_user FOREIGN KEY (respondent_id) REFERENCES usr.user(user_id) ON DELETE CASCADE
);

-- Create Survey Status Table
CREATE TABLE usr.survey_status (
    survey_status_id SERIAL PRIMARY KEY,
    survey_id INT NOT NULL,
    respondent_id INT NOT NULL,
    status NUMERIC(5,2) NOT NULL,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_survey_status_survey FOREIGN KEY (survey_id) REFERENCES mst.survey(survey_id) ON DELETE CASCADE,
    CONSTRAINT fk_survey_status_user FOREIGN KEY (respondent_id) REFERENCES usr.user(user_id) ON DELETE CASCADE
);
