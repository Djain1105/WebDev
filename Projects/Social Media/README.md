# Social Media

## Database Setup

``` shell
mysql -u root -p
```

``` mysql
create database socialmediadb;

create user socialuser identified by 'socialpass';

grant all privileges on socialmediadb.* to socialuser;

flush privileges;
```

## Project Structure

### Backend (Server)
``` shell
src
├───controllers             # functions to connect routes to db operations
├───db                      # db connections and model definitions
├───public                  # html/js/css files for static part of site
└───routes                  # express middlewares (route wise)
```
### Frontend (Client Side Code)
``` shell
src/public
│   index.html              # first / home page
│
├───app                     # our own frontend js code
│       social-common.js
│
├───components              # own html snippets
│       navbar.html
│
├───css                     # if using any css library, then the file will go here
├───fonts                   # fonts file that we are using
└───js                      # js libraries we are using
```

## Business Logic

### Users

1. **create users**
    this will create new user with a random username

### Posts

1. **create post**
    this will create a new post, required fields are
    - username (the author of this post)
    - title
    - body

2. **show all posts**
    list all existing posts, we should have following filtering support

    - filter by username
    - filter by query contained in title (search by title)

3. **edit posts** `TBD`

4. **delete posts** `TBD`

### Comments

1. **show all comments (of a user)**

2. **show all comments (under a post)**

3. **add a comment**

## API Documentation

### `users`

1. `POST /users`

Creates a new user with random username and an user id

2. `GET /users{userid}`

Get an user with a given user id

3. `GET /users{username}`

Get an user with a giver username

### `posts`

1. `GET /posts/`

Get all posts by everyone

2. `POST /posts`

Create a new post.
Required fields in body - 

```
userId = 
title =
body = 
```
