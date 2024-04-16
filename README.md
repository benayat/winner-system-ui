# Getting Started with Create React App

The project architecture is based on a Dashboard, instead of actually using routing. The Dashboard is a single page application that contains all the components.

to run the project, after cloning the repo:
1. without docker: 
    - run `npm install` to install the dependencies
    - run `npm start` to start the project
    - open [http://localhost:3000](http://localhost:3000) to view it in the browser.
2. with docker:
    - run `docker build -t <image-tag>:<version> .` to build the docker image
    - run `docker run -p 3000:80 <image-tag>:<version>` to run the docker container.
3. run UI as part of entire project:
    - In main backend project, run `docker-compose up` to run the entire project (UI, API, DB) and go to [http://localhost:3000](http://localhost:3000) to view it in the browser.
