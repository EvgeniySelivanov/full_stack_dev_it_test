 ## Node version: 
 >18.18.2 
 ## Start project:  
 In the root folder of the project, run the command:
 >npm run dev
 ## Server side limitation on maximum requests per second
 >./server/constants.js
 ## Important
  On my PC the server processed requests at a speed of 12-15 requests per second, so the limit of 50 is too high for me.
  I set it to 10 and everything worked.
  I also checked with Postman (Pre-request Scripts && Collection Runner)