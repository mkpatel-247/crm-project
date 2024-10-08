/**
 * Common json.
 * @param {*} message that we have to send in api response
 * @param {*} status status (boolean).
 * @param {*} code http status code.
 * @returns
 */
export function apiResponse(message, status, statusCode) {
    return { message, status, statusCode };
}