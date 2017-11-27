## crop-service
Central service of the CropAdvisor mobile application. All the endpoints and web views contains in this project.

## Prerequisites

Following things need to be installed.
 * Node Version v4.4.7 or higher
 * MySQL Version 5.7.14 or higher

## Folder structure
* app.js
* bin/
* node_modules/
* public/
* public/css/
* public/fond-awesome/
* public/fonts/
* public/images/
* public/img/
* public/js/
* public/stylesheets/
* routes/
* views/
* sq/

### app.js

  app.js in the main entry point for the application. It imports all the third party node modules and bind all the controllers(routes) which are HTTP endpoints. 


### bin/

  bin/www file contains all the server side setup which are relevent to start and run the server. It uses app.js and start the server in the configured HTTP port. HTTP Port configuration also included inside this file.

### node_modules/
  All the imported node modules.
  ###### Followings are the node modules of Crop-service
     - *express
     - *path
     - *favicon
     - *logger (morgan)
     - *cookieParser
     - *bodyParser
     - *multer


### public/

  This folder contains all the public accessible data. All the images inside public folder are the images display in digitized crop details pages. Those are imported in to Jade view. Also some Sinhala fonts which are using in Jade files also contains in this folder.
    
### public/css/

  Imported CSS files. 
    
### public/font-awesome/
   CSS, JS and font files related to font-awesome html template.
    
### public/fonts/
   Fonts used in the service.
    
### public/images/

   This folder contains the images that displayed in mobile application for each crop. Once the mobile application installed, all these images will be cached inside the mobile application and won't retreive again from the service.

### public/img/

  This folder contains the images that displayed in the landing page of the (www.cropadvisor.site) web page.
    
### public/js/

  This folder contains all the third party Javascripts.
    
### public/stylesheets/

  This is the folder to store custome css files.
   
### public/routes/

    This folder contains all the Javascripts files which are containing all the HTTP end points. These routers contains all the application logics, database connections and database transaction details.

### public/routes/index.js

1. **Endpoint '/'**
 - _Method - GET_
 - _Request params - No_
 - _Return params - index.jade page_
 
2. **Endpoint '/PrivacyPolicy'**
 - _Method - GET_
 - _Request params - No_
 - _Return params - privacy_policy.jade page_
 
3. **Endpoint '/forum'**
 - _Method - GET_
 - _Request params - No_
 - _Return params - forum.jade page_
  
4. **Endpoint '/forum_ind'**
 - _Method - GET_
 - _Request params - No_
 - _Return params - forum_ind.jade page_
 
5. **Endpoint '/crops'**
 - _Method - GET_
 - _Request params_
    - crop_types | 1-Vegitables, 2-Fruites, 3-if not provided-All_
 - _Return params - A list of crops accroding to the parameter type_
 
6. **Endpoint '/crops'**
 - _Method - POST_
 - _Request params_ 
    - crop_types | 1-Vegitables, 2-Fruites, 3-if not provided-All_
 - _Return params - A list of crops accroding to the parameter type_
 - _Note - Audit enabled_
 
### public/routes/details.js

1. **Endpoint '/details/'**
 - _Method - GET_
 - _Request params_ 
    - crop detail page id | Integer values_
 - _Return params - Corresponding detail page .jade_
 
### public/routes/uploads.js

1. **Endpoint '/uploads/'**
 - _Method - GET_
 - _Request params_ No_
 - _Return params - JSON Ok response_
 
2. **Endpoint '/uploads/forum_mail/'**
 - _Method - GET_
 - _Request params_ 
    - user phone id_
 - _Return params - JSON Response - List of quaries of the requested user_
 
3. **Endpoint '/uploads/upload/'**
 - _Method - GET_
 - _Request params_ No_
 - _Return params - Returns a HTML form_ 

4. **Endpoint '/uploads/diseaseimage/'**
 - _Method - POST_
 - _Request params_ Image file_
 - _Return params - JSON Success or Error message_
 - _Note - Testing version of image upload function_
 
5. **Endpoint '/uploads/uploadimage1/'**
 - _Method - POST_
 - _Request params_ Image file_
 - _Return params - JSON Success or Error message_
 - _Note - Image upload function_

6. **Endpoint '/uploads/1/'**
 - _Method - GET_
 - _Request params_ No_
 - _Return params - Index page_
 - _Note - Testing end point_
 
7. **Endpoint '/uploads/getposts/'**
 - _Method - GET_
 - _Request params_ 
     - User phone id_
 - _Return params - List of user created queries in descending order by created time_
 
8. **Endpoint '/uploads/updateresponse/'**
 - _Method - POST_
 - _Request params_ 
     - Username
     - Password
     - Response_
 - _Return params - HTTP JSON Success or Error message_
 - _Note - Response is provided by administrative users which are allowed provide answeres for user generated queries._

9. **Endpoint '/uploads/updateresponse-ind/'**
 - _Method - POST_
 - _Request params_ 
     - User phone id
     - Response_
 - _Return params - HTTP JSON Success or Error message_
 - _Note - Response is provided by the mobile user for the queries which are submitted by user itself._

10. **Endpoint '/uploads/getresponse/'**
 - _Method - POST_
 - _Request params_ 
     - Post id_
 - _Return params - Requested query details_
 
### public/routes/users.js

1. **Endpoint '/users/'**
 - _Method - GET_
 - _Request params_  No_
 - _Return params - Text response_
 - _Note - Test end point_
 
2. **Endpoint '/users/updateuser/'**
 - _Method - POST_
 - _Request params_ 
     - Phone id
     - Name
     - Phone number
     - District
     - Address_
 - _Return params - HTTP JSON Success or Error message_
  
### public/routes/audits.js

1. **Endpoint '/audits/stats/'**
 - _Method - GET_
 - _Request params_  No_
 - _Return params - stats.jade page_
 
2. **Endpoint '/audits/getdaycount/'**
 - _Method - GET_
 - _Request params_ No_
 - _Return params - Daily accessed count of the service_
  
3. **Endpoint '/audits/getpagecount/'**
 - _Method - GET_
 - _Request params_ No_
 - _Return params - Accessed count of each page_
 
4. **Endpoint '/audits/getalluserdetals/'**
 - _Method - GET_
 - _Request params_ No_
 - _Return params - All user details plus page access details of each user_
 
5. **Endpoint '/audits/getdetailbycroptypeanduser/'**
 - _Method - GET_
 - _Request params_ No_
 - _Return params - User's access details for each crop_

 
## Installing



## Deployment


## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details

## Acknowledgments


 
 
 
 
