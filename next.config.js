// next.config.js
 
module.exports = {
    // Target must be serverless
    target: 'serverless',
    env: {
        API_KEY: 'https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server'
    }
};