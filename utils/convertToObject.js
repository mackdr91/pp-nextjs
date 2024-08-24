/**
 * Converts a MongoDB document to a plain JavaScript object with all
 * properties converted to strings via toString(), and all ObjectId and
 * Date properties converted to strings via toJSON().
 *
 * @param {Object} leanDocument - A MongoDB document in the "lean" format.
 * @return {Object} A plain JavaScript object with no ObjectId or Date properties.
 */
export function convertToSerializedObject(leanDocument) {
    for (const key of Object.keys(leanDocument)) {
        if (leanDocument[key].toJSON && leanDocument[key].toString) {
            leanDocument[key] = leanDocument[key].toString();

        }
    }
    return leanDocument;
}