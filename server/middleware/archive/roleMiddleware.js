// Middleware function to check user roles
const roleMiddleware = (roles) => {
    return (req, res, next) => {
      // Check if the user is authenticated
      if (!req.user) {
        // If not authenticated, respond with a 401 Unauthorized status
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // Check if the user's role is included in the allowed roles
      if (!roles.includes(req.user.role)) {
        // If the user's role is not allowed, respond with a 403 Forbidden status
        return res.status(403).json({ message: 'Forbidden' });
      }
      // If the user is authenticated and has the correct role, proceed to the next middleware or route handler
      next();
    };
  };
  
  // Export the middleware function to be used in other parts of the application
  module.exports = roleMiddleware;
  