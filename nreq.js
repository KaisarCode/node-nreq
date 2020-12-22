// HTTP Requests [NodeJS]
/*
nreq('post', https://page.com', {
    hdr: {
    'X-Access-Token': 'mytoken123',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
}, function(res, sts){
     console.log('Status:', sts);
     console.log('Result', res);
});
*/
var purl = require('url').parse;
function nreq(mth, url, opt, cb) {
    mth = mth.toUpperCase();
    opt = opt || {};
    opt.hdr = opt.hdr || {}; 
    opt.dta = opt.dta || null;
    cb = cb || function(){};
    url = purl(url);
    url.protocol =
    url.protocol.replace(/:$/,'');
    var prot = url.protocol || 'http';
    var port = 80;
    if (prot == 'https') port = 443;
    port = url.port || port;
    var cfg = {
        port: port,
        method: mth,
        path: url.path,
        headers: opt.hdr,
        hostname: url.hostname
    };
    var xhr = require(prot)
    .request(cfg, function(res){
        var rd = '';
        res.on('data',
        function(d){rd += d;});
        res.on('end', function(){
        var sts = res.statusCode;
        var loc = res.headers.location;
        cb(rd, sts, loc); });
    });
    if (opt.dta) {
        if (typeof opt.dta == 'object')
        opt.dta = JSON.stringify(opt.dta);
        xhr.write(opt.dta);
    } xhr.end();
}

// Export
module.exports = nreq;