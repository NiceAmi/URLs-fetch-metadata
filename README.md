URL Metadata Fetcher
This full-stack web application allows users to input a list of URLs and fetch the metadata (title, description, and image) for each URL. The front-end is built using React, and the back-end is built using Node.js with Express.
Features
•	Users can input a list of URLs (minimum 3)
•	The back-end fetches the metadata for each URL and returns it as a JSON response
•	The front-end displays the fetched metadata in a visually appealing way
•	Error handling for invalid URLs or cases where metadata cannot be retrieved
•	Rate limiting on the back-end to handle a maximum of 5 requests per second
•	Security measures against common web vulnerabilities (e.g., XSS, CSRF)
Technologies Used
Back-end:
•	Node.js
•	Express.js
•	Mongoose
•	Cheerio
•	Axios
•	Express Rate Limit
Front-end:
•	React
•	Axios
Testing:
•	Jest
•	Supertest
•	Nock
Installation and Setup
1.	Clone the repository: 
git clone https://github.com/NiceAmi/URLs-fetch-metadata
2.	Install dependencies: 
npm install
3.	Create a .env file in the backend directory and add the following environment variables: 
PORT=3000
4.	Start the back-end server: 
npm start
5.	Navigate to the front-end directory: 
cd url-metadata-fetcher/frontend
6.	Install dependencies: 
npm install
7.	Start the front-end development server: 
npm start
Usage
1.	Open your web browser and navigate to http://localhost:3000.
2.	In the form, enter at least three different URLs and click the "Fetch Metadata" button.
3.	The application will display the fetched metadata (title, description, and image) for each URL.
4.	If there are any errors, such as invalid URLs or failed metadata retrieval, the application will display appropriate error messages.
Testing
The application includes unit tests for both the front-end and back-end components. To run the tests:
cd url-metadata-fetcher/backend
npm test
Future Improvements
•	Metadata caching to improve performance
•	Investigate using dedicated APIs for fetching metadata
•	Add user authentication and authorization features
•	Expand the metadata fields fetched
•	Enhance accessibility
License
This project is licensed under the MIT License.

