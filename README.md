# desktop-backend
## Backend Server

### Description
The backend server is built with Express.js and TypeScript, using a JSON file as a database. It handles saving and retrieving submissions.

### Endpoints
- **POST /submit**: Accepts parameters `name`, `email`, `phone`, `github_link`to save a new submission.
- **GET /read**: Accepts a query parameter `index` to read the (index+1)th submission.
- **DELETE /delete**: Accepts a JSON body with `index` to delete the specified submission.

### Setup
1. **Install Dependencies**:
    cd backend
    npm install

2. **Run the Server**:
    npx ts-node src/index.ts
