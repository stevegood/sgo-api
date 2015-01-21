module.exports = function(superagent, client_tokens) {
    function setup(req) {
        req
            .set("client-id", client_tokens["client-id"])
            .set("client-secret", client_tokens["client-secret"]);
        return req;
    }

    function post(url) {
        return setup(superagent.post(url));
    }

    function put(url) {
        return setup(superagent.put(url));
    }

    function del(url) {
        return setup(superagent.del(url));
    }

    function get(url) {
        return setup(superagent.get(url));
    }

    return {
        post: post,
        put: put,
        del: del,
        get: get,
        superagent: superagent
    }
};