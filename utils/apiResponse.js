/**
 * Common json.
 * @param {*} message that we have to send in api response
 * @param {*} status status (boolean).
 * @param {*} code http status code.
 * @returns
 */
function apiResponse(message, status, code) {
    return { message, status, code };
}

module.exports = { apiResponse }