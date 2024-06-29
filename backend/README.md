<h1>Spooky Games API</h1>

This is the API to interact with the Spooky Games frontend. It is a REST API that allows you to interact with the database.

<h1>Table of contents</h1>

- [Installation](#installation)
  - [Create a superuser](#create-a-superuser)
  - [Docker](#docker)
- [Launch tests](#launch-tests)


# Installation

First, you need to clone the repository and install the package with pip.

```bash
you@your-pc:~$ git clone git@github.com:romainlancelot/assosphere.git
you@your-pc:~$ cd assosphere/backend
you@your-pc:~$ pip install . # or .[dev] for development
```

Then you need to create a `.env` file in the root of the project with the following content:
Check the `.env.example` file to see examples of the variables.

| Variable        | Description                                                   | Required     | Default value        |
| --------------- | ------------------------------------------------------------- | ------------ | -------------------- |
| `ALLOWED_HOSTS` | The allowed hosts of the Django project, separated by a comma | :red_square: | `localhost`          |
| `DEBUG`         | The debug mode of the Django project                          | :red_square: | `False`              |
| `SECRET_KEY`    | The secret key of the Django project                          | :red_square: | `django-insecure...` |

Finally, you can run the server with the following command:

```bash
you@your-pc:~$ python manage.py migrate # To apply the migrations to the database
you@your-pc:~$ python manage.py runserver
```

## Create a superuser

To create a superuser, you can use the following command:

```bash
you@your-pc:~$ python manage.py createsuperuser
```

Congratulations, you have a superuser!

## Docker

You can also use Docker to run the project. To do this, you can use the following command:

```bash
you@your-pc:~$ docker-compose up
```

# Launch tests

To lauch all the tests, you can use the following command:

```bash
you@your-pc:~$ pytest
```

<h1>Thanks for reading !</h1>

<img src="https://media1.tenor.com/m/17IgpB1KexsAAAAC/trash-disappointed.gif" width="100%">