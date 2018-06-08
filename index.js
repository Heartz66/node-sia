var Promise = require('bluebird');
var _ = require('lodash');
var request = require('request-promise');

function SiaClient(data) {
    data = data || {};

    var defaults = {
        baseUrl: 'http://127.0.0.1:9980',
        json: true,
        timeout: 1000 * 30,
        headers: {
            'User-Agent': 'Sia-Agent'
        }
    };

    if (data.hasOwnProperty('url')) {
        defaults.baseUrl = data.url;
    }

    if (data.hasOwnProperty('password')) {
        defaults.headers['Authorization'] = 'Basic ' + new Buffer(':' + data.password).toString('base64');
    }

    this.request = request.defaults(_.defaultsDeep({}, defaults, data.request));
}

SiaClient.prototype.sendRequest = function (method, endpoint, parameters, body) {
    var self = this;

    return new Promise(function (resolve, reject) {
        if (typeof method !== 'string' || !_.includes(['GET', 'POST'], method)) {
            return reject(new Error('Invalid method.'));
        }

        if (typeof endpoint !== 'string') {
            return reject(new Error('Invalid endpoint.'));
        }

        self.request({
            method: method,
            url: endpoint,
            qs: parameters || {},
            body: body || {}
        }).then(function (data) {
            return resolve(data);
        }).catch(function (err) {
            return reject(err);
        });
    });
};

module.exports = SiaClient;
