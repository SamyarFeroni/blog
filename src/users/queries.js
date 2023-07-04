//queries for postgresql
const getAllUsers = "SELECT * FROM public.users";
const getusersByusername = "SELECT * FROM public.users WHERE username = $1";
const checkUsernameExists = "SELECT s FROM public.users s WHERE s.username = $3";
const RestPasswordByemail = "SELECT email FROM users WHERE username = $1"
const addusers = "INSERT INTO public.users (first_name, last_name, username, password, gender, phoneNumber) VALUES ($1, $2, $3, $4, $5, $6)";
const removeUser = "DELETE FROM public.users WHERE username = $1";
const updateUser = "UPDATE public.users SET username =$1"
const loginUser = "SELECT * FROM users WHERE username = $1";
const profileImage = "UPDATE users SET prifile)image = "
module.exports = {
    getAllUsers,
    getusersByusername,
    checkUsernameExists,
    RestPasswordByemail,
    addusers,
    removeUser,
    updateUser,
    loginUser,    
}