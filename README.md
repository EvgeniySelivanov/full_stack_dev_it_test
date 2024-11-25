 ### Node version: 
 >18.18.2 
 ### Start project:
 <ins>Install dependencies in directories:</ins>  
 **./client**  
 **./server**  
 **./**  
  <ins>In the root folder of the project, run the command:</ins>   
 **npm run dev**
 ### Server side limitation on maximum requests per second
 >**./server/constants.js**
 ### Important
  *On my PC the server was accepting requests at 12-15 requests per second, so the limit of 50 is too high for me.
I set it to 10 and it worked.
I also checked with Postman (Pre-request Scripts && Collection Runner)*