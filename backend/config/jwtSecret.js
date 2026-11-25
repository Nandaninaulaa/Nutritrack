const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT_SECRET must be set before starting the API");
}

module.exports = secret;
