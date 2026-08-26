/** usPollenInfo flattened for the /en/ allergen page generator to paginate. */
import usPollenInfo from "./usPollenInfo.js";

export default Object.entries(usPollenInfo).map(([id, info]) => ({ id, ...info }));
