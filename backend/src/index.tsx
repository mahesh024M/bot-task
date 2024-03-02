const {Client}=require('pg');


const client=new Client({
   // connectionString:"use your database connection string"
})

interface User{
    username:string,
    age:string,
    phoneNumber:string,
    location:string
}

async function createUsersTable() {

    await client.connect();

    const result=await client.query(`
        create Table users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            age varchar(3) NOT NULL,
            phoneNumber VARCHAR(10)UNIQUE NOT NULL,
            location  VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `)
   
    console.log(result);
   
}


// createUsersTable();



async function insertData(users:User[]) {
    try {
        await client.connect();
        const results = await Promise.all(users.map(async (user) => {
            const insertQuery = 'INSERT INTO users (username, age, phoneNumber, location) VALUES ($1, $2, $3, $4)';
            const values = [user.username, user.age, user.phoneNumber, user.location];
            return await client.query(insertQuery, values);
        }));
        console.log("Insertion is successful", results);
    } catch (err) {
        console.error("Error during insertion:", err);
    } finally {
        await client.end();
    }
}


const users = [
    { username: 'john_doe123', age: '25', phoneNumber: '9876543210', location: 'New York' },
    { username: 'alice_smith45', age: '30', phoneNumber: '9876543211', location: 'Los Angeles' },
    { username: 'sam_jones78', age: '35', phoneNumber: '9876543212', location: 'Chicago' },
    { username: 'emily_wilson32', age: '40', phoneNumber: '9876543213', location: 'Houston' },
    { username: 'michael_clark67', age: '22', phoneNumber: '9876543214', location: 'Phoenix' },
    { username: 'anita_gupta27', age: '29', phoneNumber: '9876543215', location: 'Mumbai' },
    { username: 'vikram_sharma81', age: '33', phoneNumber: '9876543216', location: 'Delhi' },
    { username: 'priya_patel59', age: '28', phoneNumber: '9876543217', location: 'Bangalore' },
    { username: 'rahul_kumar44', age: '31', phoneNumber: '9876543218', location: 'Chennai' },
    { username: 'neha_shah88', age: '27', phoneNumber: '9876543219', location: 'Kolkata' },
    { username: 'suresh_yadav51', age: '36', phoneNumber: '9876543220', location: 'Hyderabad' },
    { username: 'pooja_verma73', age: '26', phoneNumber: '9876543221', location: 'Ahmedabad' },
    { username: 'amit_singh99', age: '32', phoneNumber: '9876543222', location: 'Pune' },
    { username: 'deepak_gandhi77', age: '34', phoneNumber: '9876543223', location: 'Surat' },
    { username: 'sonali_mishra48', age: '29', phoneNumber: '9876543224', location: 'Jaipur' },
    { username: 'akash_jain66', age: '30', phoneNumber: '9876543225', location: 'Lucknow' },
    { username: 'rinku_sharma91', age: '25', phoneNumber: '9876543226', location: 'Kanpur' },
    { username: 'kavita_patil52', age: '33', phoneNumber: '9876543227', location: 'Nagpur' },
    { username: 'arun_kumar42', age: '28', phoneNumber: '9876543228', location: 'Indore' },
    { username: 'divya_yadav75', age: '31', phoneNumber: '9876543229', location: 'Thane' },
    { username: 'ashish_shah81', age: '27', phoneNumber: '9876543230', location: 'Bhopal' },
    { username: 'rinky_jha53', age: '34', phoneNumber: '9876543231', location: 'Visakhapatnam' },
    { username: 'rohit_verma29', age: '26', phoneNumber: '9876543232', location: 'Pimpri-Chinchwad' },
    { username: 'ritu_gupta63', age: '29', phoneNumber: '9876543233', location: 'Patna' },
    { username: 'manish_kumar57', age: '32', phoneNumber: '9876543234', location: 'Vadodara' },
    { username: 'pratiksha_singh48', age: '31', phoneNumber: '9876543235', location: 'Ghaziabad' },
    { username: 'parth_patel74', age: '28', phoneNumber: '9876543236', location: 'Ludhiana' },
    { username: 'priyanka_sharma86', age: '35', phoneNumber: '9876543237', location: 'Agra' },
    { username: 'sumit_singh27', age: '30', phoneNumber: '9876543238', location: 'Nashik' },
    { username: 'sapna_yadav69', age: '26', phoneNumber: '9876543239', location: 'Faridabad' },
    { username: 'rajesh_gandhi32', age: '33', phoneNumber: '9876543240', location: 'Meerut' },
    { username: 'sneha_verma42', age: '29', phoneNumber: '9876543241', location: 'Rajkot' },
    { username: 'vivek_shah49', age: '27', phoneNumber: '9876543242', location: 'Srinagar' },
    { username: 'anu_kumar58', age: '34', phoneNumber: '9876543243', location: 'Dhanbad' },
    { username: 'rashmi_yadav39', age: '31', phoneNumber: '9876543244', location: 'Amritsar' },
    { username: 'rohan_sharma65', age: '28', phoneNumber: '9876543245', location: 'Allahabad' },
    { username: 'sunita_singh22', age: '35', phoneNumber: '9876543246', location: 'Howrah' },
    { username: 'vijay_gupta77', age: '26', phoneNumber: '9876543247', location: 'Gwalior' },
    { username: 'arti_sharma59', age: '30', phoneNumber: '9876543248', location: 'Jabalpur' },
    { username: 'vinod_kumar81', age: '33', phoneNumber: '9876543249', location: 'Coimbatore' },
    { username: 'sangeeta_patel48', age: '29', phoneNumber: '9876543250', location: 'Vijayawada' },
    { username: 'mukesh_yadav63', age: '32', phoneNumber: '9876543251', location: 'Madurai' },
    { username: 'ritika_shah27', age: '28', phoneNumber: '9876543252', location: 'Guwahati' },
    { username: 'amitabh_singh53', age: '31', phoneNumber: '9876543253', location: 'Chandigarh' },
    { username: 'neetu_sharma37', age: '30', phoneNumber: '9876543254', location: 'Mysore' },
    { username: 'abhishek_kumar45', age: '29', phoneNumber: '9876543255', location: 'Gurgaon' },
    { username: 'pallavi_yadav74', age: '34', phoneNumber: '9876543256', location: 'Aligarh' },
    { username: 'shivam_gupta29', age: '27', phoneNumber: '9876543257', location: 'Jalandhar' },
    { username: 'kirti_patel63', age: '32', phoneNumber: '9876543258', location: 'Bhubaneswar' },
    { username: 'satish_kumar41', age: '31', phoneNumber: '9876543259', location: 'Salem' },
    { username: 'shruti_sharma55', age: '28', phoneNumber: '9876543260', location: 'Warangal' },
    { username: 'ashish_yadav36', age: '33', phoneNumber: '9876543261', location: 'Raipur' },
    { username: 'pooja_kumari67', age: '30', phoneNumber: '9876543262', location: 'Bhilai' },
    { username: 'deepak_sharma29', age: '29', phoneNumber: '9876543263', location: 'Jamshedpur' },
    { username: 'tina_gupta41', age: '34', phoneNumber: '9876543264', location: 'Cuttack' },
    { username: 'rahul_shah57', age: '27', phoneNumber: '9876543265', location: 'Kochi' },
    { username: 'sunita_patel52', age: '32', phoneNumber: '9876543266', location: 'Udaipur' }
];

//console.log(users.length); 


//insertData(users);


module.exports={client};


