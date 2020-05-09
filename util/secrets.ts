
export const JWT_SECRET = "ashdfjhasdlkjfhalksdjhflak"; //read from elsewhere, dont hard code in future

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}
