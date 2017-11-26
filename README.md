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
* routes/
* views/
* sq/

### app.js
```
    app.js in the main entry point for the application. 
    It imports all the third party node modules and bind 
    all the controllers(routes) which are HTTP endpoints. 
```

### bin/
```
    bin/www file contains all the server side setup which 
    are relevent to start and run the server. It uses app.js 
    and start the server in the configured HTTP port. HTTP 
    Port configuration also included inside this file.
```

### node_modules/
```
    All the imported node modules.
    ##### Followings are node modules of Crop-service
        *  express
        *  path
        *  favicon
        *  logger (morgan)
        *  cookieParser
        *  bodyParser
        *  multer
```

### public/
```
    All the imported node modules.
```
## Installing



## Deployment


## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details

## Acknowledgments


 
 
 
 
