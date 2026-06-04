export function errorHandler(err,req,res,next){
    console.error('Error: ', err);

    if(err.name === 'ValidationError'){
        return res.status(400).render('error', {
            message: 'Validation Error',
            errors: err.message
        });
    }
    if(err.code === 'ECONNREFUSED'|| err.code === 'ENOTFOUND'){
        return res.status(503).render('error', {
            message: 'Database connection failed'
        });
    }

    if(err.code && err.code.startsWith('23')){
        return res.status(400).render('error' , {
            message: 'Database constraint violation',
            error: err.message
        });
    }

    return res.status(500).render('error', {
        message: 'Intermal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : null
    });
}