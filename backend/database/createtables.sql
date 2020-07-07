CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    order_number INTEGER,
    task_type INTEGER,
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
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
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
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    password TEXT
);

CREATE TABLE IF NOT EXISTS global_vars (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    value TEXT,
    description TEXT
);
