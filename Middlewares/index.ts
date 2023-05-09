// module.exports = {
//     Auth: require('./Auth'),
//     FileUpload: require('./FileUpload'),
// };

import auth from "./auth"
import { upload } from "./fileUpload"

export default { auth, fileUpload: upload}