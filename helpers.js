var handleResponse = function (resolve, reject) {
    return function (error, response, body) {
        if (error) {
            throw error;
        } else {
            if (response.statusCode.toString().match(/^2\d\d$/)) {
                resolve(JSON.parse(body));
            } else {
                console.error(JSON.parse(body), response.statusCode);
                reject(JSON.parse(body));
            }
        }
    }
};

module.exports = {
    handleResponse: handleResponse
};