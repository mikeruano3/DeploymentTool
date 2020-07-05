CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS tasks (
    task_id INTEGER PRIMARY KEY,
    task_name TEXT,
    task_desc TEXT,
    order_number INTEGER,
    request_type TEXT,
    request_url TEXT,
    request_body TEXT,
    project_id INTEGER,
    FOREIGN KEY (project_id) 
      REFERENCES projects (project_id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS job_sequences (
    job_sequence_id INTEGER PRIMARY KEY,
    project_id INTEGER,
    FOREIGN KEY (project_id) 
      REFERENCES projects (project_id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS job_sequence_tasks (
    task_id INTEGER PRIMARY KEY,
    job_sequence_id INTEGER,
    order_number INTEGER,
    continue_if_failed BOOLEAN,
    FOREIGN KEY (job_sequence_id) 
      REFERENCES job_sequences (job_sequence_id)
      ON DELETE CASCADE,
    FOREIGN KEY (task_id) 
      REFERENCES tasks (task_id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    user_password TEXT
);

CREATE TABLE IF NOT EXISTS global_vars (
    global_var_id INTEGER PRIMARY KEY,
    global_var_name TEXT NOT NULL UNIQUE,
    global_var_value TEXT,
    global_var_desc TEXT
);
