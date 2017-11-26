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
    #### Followings are the node modules of Crop-service
        *  express
        *  path
        *  favicon
        *  logger (morgan)
        *  cookieParser
        *  bodyParser
        *  multer


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

  ** 1 - Endpoint '/'**
 - _Method - GET_
 - _Request params - No_
 - _Return params - index.jade page_
    
## Installing



## Deployment


## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details

## Acknowledgments


 
 
 
 
