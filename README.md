## Set-up

1. Clone the project and run 'npm install' inside the root folder
2. Create a .env.local file in the root of the folder, and declare the following variable with its value:

NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

Make sure the address of the local server you are running is equal to the address above. If it's running on port 3001 for example, change the address above to http://localhost:3001.
If these are not equal, the API call for retrieving the Product-data within the Overview page will fail. 

4. Run 'npm run dev' to start the dev-server or run 'npm run build' followed by 'npm start' to run the build on a local server (address defaults to http://localhost:3000/)
