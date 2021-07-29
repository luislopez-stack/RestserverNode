const getTokenSy = async(req, resp) => {


    let client_id = '6d1d671fab244ef2a6879659cae926a9'; //req.params.client_id;
    let client_secret = 'd9f04fb1e8924944a4836ff90f5afb4a'; //req.params.client_secret;
    let spotifyUrl = 'https://accounts.spotify.com/api/token';

    var authOptions = {
        url: spotifyUrl,
        headers: {
            Authorization: 'Basic ' + new Buffer.allocUnsafeSlow(client_id + ':' + client_secret).toString('base64')
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };


    await request.post(authOptions, (err, httpResponse, body) => {

        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'No se pudo obtener el token',
                err
            })
        }

        resp.json(body);

    });

}

const getRspuesta = async(req, resp) => {

    resp.json({
        msj: req.client_id
    })
}

module.exports = {
    getTokenSy,
    getRspuesta
}