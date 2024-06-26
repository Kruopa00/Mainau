const e = require('express');
const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/, method: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/products(.*)/ , methods: ['POST', 'OPTIONS'] },
            {url: /\/api\/v1\/products(.*)/ , methods: ['PUT', 'OPTIONS'] },
            {url: /\/api\/v1\/products(.*)/ , methods: ['DELETE', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/, method: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/users\/reviews(.*)/, method: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/users\/review(.*)/, method: ['PUT', 'OPTIONS']},
            {url: /\/api\/v1\/users(.*)/, method: ['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }
    
    done();
}

module.exports = authJwt;