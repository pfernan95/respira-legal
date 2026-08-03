/** pollenInfo flattened to a list with the pollen id and Spanish name, for the
 *  national pollen page generator to paginate over. */
import pollenInfo from "./pollenInfo.js";
import { POLLEN_TYPES } from "./constants/pollen.js";

export default Object.entries(pollenInfo).map(([id, info]) => ({
  id,
  pollenName: POLLEN_TYPES[id].nameEs,
  ...info,
}));
