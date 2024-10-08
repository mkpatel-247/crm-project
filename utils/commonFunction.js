/**
 * Find and returns detail and index of the object.
 * @param {*} array 
 * @param {*} id 
 * @returns 
 */
export function findIndexAndDetails(array, id) {
    const detail = array.find((element) => element.id == id);
    const index = array.findIndex((element) => element.id == id);
    return { detail, index };
}