INSERT INTO global_vars (name, value, description)
VALUES 
    ("backendFullPath",     "/home/credit/backend_credit_manager/",         "backendFullPath"),
    ("frontendFullPath",    "/home/credit/webapp_mobil_credit_manager/",    "frontendFullPath"),
    ("PM2projectName",      "credit",                                       "PM2projectName"),
    ("deploymentFolder",    "/var/www/html/ecredit/",                       "deploymentFolder"),
    ("projectBuildFolder",  "test",                                         "projectBuildFolder")
    ("distFolder",          "business",                                     "distFolder")
;

INSERT INTO projects (id, name, description)
VALUES 
    (1, "Backend Credit Manager",     "BackEnd Credit"),
    (2, "Frontend Credit Manager",    "FrontEnd Credit")
;

/***********************************************/
/**** -------------- BACKEND -------------- ****/
/***********************************************/

INSERT INTO tasks (
        id,
        name, 
        description, 
        order_number, 
        task_type,
        request_type, 
        request_url, 
        request_body, 
        project_id)
VALUES 
    (   1,
        "Actualizar Repositorio", 
        "cd ${repoFullPath} && git checkout ${branch} && git pull",
        1,
        1,
        "POST",
        "/api/actions/pullchangesbackend",
        "{ ""branch"": ""develop"" }",
        1
    ),
    (   2,
        "Instalar paquetes", 
        "cd ${repoFullPath} && npm install",
        2,
        1,
        "POST",
        "/api/actions/installpackagesbackend",
        "",
        1
    ),
    (   3,
        "Ejecutar tests", 
        "cd ${repoFullPath} && npm test",
        3,
        1,
        "POST",
        "/api/actions/runtestsbackend",
        "",
        1
    ),
    (   4,
        "Recargar Aplicación en PM2", 
        "pm2 restart ${PM2projectName}",
        4,
        1,
        "POST",
        "/api/actions/reloadpm2proj",
        "",
        1
    ),
    (   5,
        "Iniciar Aplicación si está abajo", 
        "pm2 start {backendFullPath}index.js --name {PM2projectName} --watch --log logs.log",
        5,
        1,
        "POST",
        "/api/actions/startpm2proj",
        "",
        1
    )
;

-- -- SECUENCIAS 

INSERT INTO job_sequences (
        id, 
        name,
        description,
        project_id)
VALUES 
    (   1,
        "Desplegado Completo",
        "Desplegado Completo Version 1", 
        1
    )
;

INSERT INTO job_sequence_tasks (
        order_number,
        task_id, 
        job_sequence_id,
        continue_if_failed)
VALUES 
        (1, 1, 1, false),
        (2, 2, 1, false),
        (3, 3, 1, false),
        (4, 4, 1, false)
;

/***********************************************/
/**** -------------- FRONTEND ------------- ****/
/***********************************************/

INSERT INTO tasks (
        id,
        name, 
        description, 
        order_number, 
        task_type,
        request_type, 
        request_url, 
        request_body, 
        project_id)
VALUES 
    (   6,
        "Actualizar Repositorio", 
        "cd ${repoFullPath} && git checkout ${branch} && git pull",
        1,
        1,
        "POST",
        "/api/actions/pullchangesfrontend",
        "{ ""branch"": ""master"" }",
        2
    ),
    (   7,
        "Borrar carpeta del servidor /var/www/html", 
        "`rm -rf ${deploymentFolderVarname}${projectBuildFolderVarname}",
        2,
        1,
        "POST",
        "/api/actions/deleteserverfolder",
        "",
        2
    ),
    (   8,
        "Mover carpeta dist al servidor  /var/www/html", 
        "cp -R ${projectFullpath}/dist/${distFolderVarname} ${deploymentFolderVarname}${projectBuildFolderVarname} ",
        3,
        1,
        "POST",
        "/api/actions/movedisttoserver",
        "",
        2
    )
;

-- -- SECUENCIAS 

INSERT INTO job_sequences (
        id, 
        name,
        description,
        project_id)
VALUES 
    (   
        2,
        "Desplegado Completo",
        "Desplegado Completo Version 1",
        2
    )
;

INSERT INTO job_sequence_tasks (
        order_number,
        task_id, 
        job_sequence_id,
        continue_if_failed)
VALUES 
        (1, 6, 2, false),
        (2, 7, 2, false),
        (3, 8, 2, false)
;