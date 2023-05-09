export * from './errorMessage'
export * from './httpStatusCode'

export default {
    sqlDb: {
        host: process.env.SERVER_HOST || 'localhost',
        dbUser : process.env.DB_USER || 'root',
        dbPassword : process.env.DB_PASSWORD || '',
        dbName : process.env.DB_NAME || 'bwa_db'
    },
    jwtOption: {
        secret: process.env.JWT_AUTH || 'adsafdsfds32432',
        expiresIn: '45d'
    },
    serverAuth:{
        secret:process.env.SERVER_AUTH
    },
    country: 'en-IN',
    timeZone: 'Asia/Kolkata',
    userType: {
        CUSTOMER: "CUSTOMER",
        WHOLESALER: "WHOLESALER",
        DISTRIBUTER: "DISTRIBUTER"
      },

};



// model user = {
//     id: string,
//     name: string,
//     email: string,
//     password: string,
//     role: ["MEMBER", "ASSISTANT_GROUP_LEADER", "GROUP_LEADER", "CAPTAIN"],
//     its_id: string,
//     created_at: string,,
//     updated_at: string
// }

// model user_attendance = {
//     _id: string,
//     user_id: string,
//     date: string,
//     time: string,
//     status: ["present", "absent", "late"],
//     miqaat_id: string,
// }

// model miqaat = {
//     _id: string,
//     title: string, //ex: eid-ul-fitr 
//     description: string, //ex: eid-ul-fitr day
//     islamic_date: string, 
//     english_date: string
// }