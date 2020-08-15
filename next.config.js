// next.config.js
 
module.exports = {
    // Target must be serverless
    target: 'serverless',
    env: {
        // NEXT_PUBLIC_API_URL: 'https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server'
        NEXT_PUBLIC_API_URL: 'http://localhost:3001/.netlify/functions/server'
    }
};