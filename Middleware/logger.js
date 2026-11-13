



export function logger (req, res, next) {

    console.log(`[${new Date().toISOString()}] ${req.method} request targeting path: ${req.path}`);
// This hands off the excecution context to the next handler in line.

 next();
}

