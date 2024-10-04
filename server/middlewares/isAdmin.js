import User from "../model/User.js";

const isAdmin = async (req, res, next) => {
    // Find the logged-in user
    const user = await User.findById(req.userAuthId);
    
    // Check if the user is an admin
    if (user.isAdmin) {
        next(); // Proceed to the next middleware or route handler
    } else {
        next(new Error('Access denied, admin only')); // Return an error if not an admin
    }
};

export default isAdmin;