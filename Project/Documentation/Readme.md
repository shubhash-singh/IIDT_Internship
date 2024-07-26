# YouTube Video Downloader

## Table of Contents

   1. Introduction
   2. Problem Statement
   3. Tools and Technologies Used
   4. Existing System
   5. Proposed System
   6. Project Architecture
   7. Database Schema
   8. Database Implementation
   9. SQL Queries
   10. Frontend Implementation
   11. Backend Implementation
   12. Conclusion
   13. References

## Introduction

The YouTube Video Downloader project aims to develop a web application that allows users to download YouTube videos by providing a URL. This project is built using Django for the backend and HTML/CSS for the frontend. The goal is to provide a simple and efficient interface for users to download their desired videos.

## Problem Statement

With the increasing consumption of video content, there is a growing need for users to download videos for offline viewing. Current solutions are often cumbersome or come with restrictions. This project aims to provide a user-friendly and efficient method to download YouTube videos, addressing the need for an accessible offline viewing experience.

## Tools and Technologies Used

    Backend Framework: Django
    Frontend Technologies: HTML, CSS, JavaScript
    Database: SQLite
    Version Control: Git
    Package Manager: pip
    IDEs: Visual Studio Code, PyCharm

## Existing System

Currently, users rely on various third-party applications and websites to download YouTube videos. These solutions often have limitations, such as download restrictions, ads, and potential security risks. Additionally, many of these services are not user-friendly and require multiple steps to download a single video.

## Proposed System

The proposed system is a web-based application that simplifies the process of downloading YouTube videos. By providing a user-friendly interface, users can input a YouTube URL and quickly obtain a download link. The application will handle the complexities of video downloading in the background, ensuring a smooth user experience.

## Project Architecture

The architecture of the YouTube Video Downloader project is divided into three main components:

    Client (Browser):
        Interacts with the user.
        Sends HTTP requests to the server.
        Displays the user interface and download links.

    Django Server:
        Handles incoming HTTP requests.
        Manages URL routing, business logic, and template rendering.
        Interacts with the database to store and retrieve video information.

    Database (SQLite):
        Stores video data including URLs, titles, descriptions, and download links.
        Ensures data integrity and supports SQL queries for data manipulation and retrieval.

## Database Schema

The database schema for the project consists of the following table:

        Video Table:
        
        Column          |  Data Type    | Constraints
        ----------------|---------------|----------------
        id              |  INTEGER      | PRIMARY KEY AUTOINCREMENT
        url             |  TEXT         | NOT NULL
        title           |  TEXT         | NOT NULL
        description     |  TEXT         |
        download_link   |  TEXT         | NOT NULL

## Database Implementation

### Database Models (models.py)

    from django.db import models

    class Video(models.Model):
        url = models.URLField()
        title = models.CharField(max_length=255)
        description = models.TextField()
        download_link = models.URLField()

        def __str__(self):
            return self.title

### SQL for Creating Tables

    CREATE TABLE Video (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        download_link TEXT NOT NULL
    );

### Sample Data

    INSERT INTO Video (url, title, description, download_link) VALUES
    ('https://www.youtube.com/watch?v=example1', 'Example Video 1', 'This is an example video.', 'http://example.com/download1'),
    ('https://www.youtube.com/watch?v=example2', 'Example Video 2', 'This is another example video.', 'http://example.com/download2'),
    ('https://www.youtube.com/watch?v=example3', 'Example Video 3', 'Description for video 3', 'http://example.com/download3');

## SQL Queries

### Data Manipulation Queries

    1. Insert Data:

        INSERT INTO Video (url, title, description, download_link) VALUES ('https://www.youtube.com/watch?v=example4', 'Example Video 4', 'Description for video 4', 'http://example.com/download4');

    2. Update Data:

        UPDATE Video SET title = 'Updated Video Title' WHERE id = 1;

    3. Delete Data:

        DELETE FROM Video WHERE id = 3;

### Data Retrieval Queries

    1. Select All Videos:

        SELECT * FROM Video;

    2. Select Video by ID:

        SELECT * FROM Video WHERE id = 1;

    3. Select Videos with Specific Title:

        SELECT * FROM Video WHERE title LIKE '%Example%';

    4. Count Videos:

        SELECT COUNT(*) FROM Video;

    5. Join and Group Videos:

        SELECT title, COUNT(*) FROM Video GROUP BY title;

### Complex Queries

    1. Subquery:

        SELECT * FROM Video WHERE id IN (SELECT id FROM Video WHERE title LIKE '%Example%');

    2. Advanced Query:

        SELECT * FROM Video WHERE title IN (SELECT title FROM Video GROUP BY title HAVING COUNT(*) > 1);

## FrontEnd

### base.html

    {% load static %}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel = "icon" href ="image-link"     type = "image/x-icon">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="{% static 'css/main.css' %}">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <title>YT Video Downloader</title>
    </head>
    <body>
    <div class="container-fluid">
        {% block content %}

        {% endblock %}

    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="{% static 'js/popper.js' %}"></script>
    <script src="{% static 'js/main.js' %}"></script>

    </body>
    </html>

### home.html

    {% extends 'base.html' %}
    {% load crispy_forms_tags %}

    {% block content %}

        <div class="background">
            <div class="title">
                <p>YouTube Videos Downloader</p>
            </div>

            <div class="content">
                <form action="" method="post">
                    {% csrf_token %}
                    {{ form|crispy }}
                    <input type="submit" value="Download" class="btn btn-info btn-block">
                </form>
            </div>
        </div>

        {% if title %}
            <div class="dbox">
                <div class="img-thumb">
                    <img class="img-responsive" src="{{ thumb }}">
                </div>
                <div id="desl" class="v-about">
                    <p class="v-title">{{ title }}</p>
                    <section class="infos">

                        <li>Duration <b>{{ duration }}</b></li>
                        <li>Views <b>{{ views }}</b></li>
                        <li>Likes <b>{{ likes }}</b></li>
                        <li>Dislikes <b>{{ dislikes }}</b</li>

                    </section>
                </div>
            </div>

            <div id="m-show">
                <p class="v-title">{{ title }}</p>
            </div>
            <div class="downloads">

                <table>
                    <tr>
                        <th scope="col">Resolution</th>
                        <th scope="col">File Size</th>
                        <th scope="col">Extension</th>
                        <th scope="col">Download</th>
                    </tr>
                    <tr>
                        {% for stream in streams %}
                            <tr>
                                <td>{{ stream.resolution }}</td>
                                <td>{{ stream.file_size }}</td>
                                <td>{{ stream.extension }}</td>
                                <td><a href="{{ stream.video_url }}" style="text-decoration: none;"
                                    download="{{ title }}.{{ extension }}" target="_blank">Download <i
                                        class=" fa fa-download"></i></a></td>
                            </tr>
                        {% endfor %}
                    </tr>
                </table>

                <p class="h3 text-center mt-5 mb-5">Audio Only</p>
                <table class="table mt-5 mb-5">
                    <thead class="thead-light">
                    <tr>
                        <th scope="col">File Size</th>
                        <th scope="col">Extension</th>
                        <th scope="col">Download</th>
                    </tr>
                    </thead>
                    <tbody>
                    {% for stream in stream_audio %}
                        <tr>
                            <td>{{ stream.file_size }}</td>
                            <td>{{ stream.extension }}</td>
                            <td><a href="{{ stream.video_url }}" style="text-decoration: none;"
                                download="{{ title }}.{{ extension }}" target="_blank">Download <i
                                    class=" fa fa-download"></i></a></td>
                        </tr>
                    {% endfor %}
                    </tbody>
                </table>

                {##}
                {#            <p class="h3 text-center mt-5 mb-5">Video Only</p>#}
                {#            <table class="table mt-5">#}
                {#                <thead class="thead-light">#}
                {#                <tr>#}
                {#                    <th scope="col">Resolution</th>#}
                {#                    <th scope="col">File Size</th>#}
                {#                    <th scope="col">Extension</th>#}
                {#                    <th scope="col" >Download</th>#}
                {#                </tr>#}
                {#                </thead>#}
                {#                <tbody>#}
                {#                {% for stream in stream_video %}#}
                {#                    <tr>#}
                {#                        <td>{{ stream.resolution }}</td>#}
                {#                        <td>{{ stream.file_size }}</td>#}
                {#                        <td>{{ stream.extension }}</td>#}
                {#                        <td><a href="{{ stream.video_url }}" style="text-decoration: none;"#}
                {#                               download="{{ title }}.{{ extension }}" target="_blank">Download <i#}
                {#                                class=" fa fa-download"></i></a></td>#}
                {#                    </tr>#}
                {#                {% endfor %}#}
                {#                </tbody>#}
                {#            </table>#}
                {##}
            </div>


        {% endif %}
    {% endblock %}

### home2.html

    {% extends 'base.html' %}
    {% load crispy_forms_tags %}

    {% block content %}
        <div class="row">
            <div class="col-md-12 mb-5">
                <h1 class="display-2 text-center" style="text-align: center!important;">YouTube Video Downloader</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 ml-auto mr-auto">
                <form action="" method="post">
                    {% csrf_token %}
                    {{ form|crispy }}
                    <input type="submit" value="Download" class="btn btn-info btn-block">
                </form>
            </div>
        </div>

        {% if title %}
            <div class="row">
                <div class="col-md-6 ml-auto mr-auto mt-5">
                    <h1 class="h3 text-center">{{ title }}</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 ml-auto mr-auto mt-5">
                    <img class="img-responsive" src="{{ thumb }}">
                </div>

                <div class="col-md-4 ml-auto mr-auto mt-5 pt-5" >
                    <ul class="list-group list-group-flush"style="background-color: #a0463500">
                        <li class="list-group-item border-0 pl-2 pr-2 pb-0 text-center" style="background-color: black;"><p class="lead">Duration <i class="fa fa-clock-o"></i>: {{ duration }}</p></li>
                        <li class="list-group-item border-0 pl-2 pr-2 pb-0 text-center" style="background-color: #150571;"><p class="lead">Views <i class="fa fa-eye"></i>: {{ views }}</p></li>
                        <li class="list-group-item border-0 pl-2 pr-2 pb-0 text-center" style="background-color: #221e3a;"><p class="lead">Likes <i class="fa fa-thumbs-up"></i>: {{ likes }} Dislikes <i class="fa fa-thumbs-up"></i>: {{ dislikes }}</p></li>
                        <li class="list-group-item border-0 pl-2 pr-2 pb-0 text-center" style="background-color: transparent"><button class="btn btn-info mt-3" style="background-color: #4b55a0" data-toggle="collapse" data-target="#description">Description</button></li>
                    </ul>
                    <div id="description" class="collapse" >{{ description }}</div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table class="table mt-5">
                        <thead class="thead-light">
                        <tr>
                            <th scope="col">Resolution</th>
                            <th scope="col">File Size</th>
                            <th scope="col">Extension</th>
                            <th scope="col">Download</th>
                        </tr>
                        </thead>
                        <tbody>
                        {% for stream in streams %}
                            <tr>
                                <td>{{ stream.resolution }}</td>
                                <td>{{ stream.file_size }}</td>
                                <td>{{ stream.extension }}</td>
                                <td><a href="{{ stream.video_url }}" style="text-decoration: none;" download="{{ title }}.{{ extension }}" target="_blank" >Download <i class=" fa fa-download"></i></a></td>
                            </tr>
                        {% endfor %}
                        </tbody>
                    </table>

    {#                <p class="h3 text-center mt-5 mb-5">Video Only</p>#}
    {#                <table class="table mt-5">#}
    {#                    <thead class="thead-light">#}
    {#                    <tr>#}
    {#                        <th scope="col">Resolution</th>#}
    {#                        <th scope="col">File Size</th>#}
    {#                        <th scope="col">Extension</th>#}
    {#                        <th scope="col">Download</th>#}
    {#                    </tr>#}
    {#                    </thead>#}
    {#                    <tbody>#}
    {#                    {% for stream in stream_video %}#}
    {#                        <tr>#}
    {#                            <td>{{ stream.resolution }}</td>#}
    {#                            <td>{{ stream.file_size }}</td>#}
    {#                            <td>{{ stream.extension }}</td>#}
    {#                            <td><a href="{{ stream.video_url }}" style="text-decoration: none;" download="{{ title }}.{{ extension }}" target="_blank">Download <i class=" fa fa-download"></i></a></td>#}
    {#                        </tr>#}
    {#                    {% endfor %}#}
    {#                    </tbody>#}
    {#                </table>#}

    {#                <p class="h3 text-center mt-5 mb-5">Audio Only</p>#}
    {#                <table class="table mt-5 mb-5">#}
    {#                    <thead class="thead-light">#}
    {#                    <tr>#}
    {#                        <th scope="col">File Size</th>#}
    {#                        <th scope="col">Extension</th>#}
    {#                        <th scope="col">Download</th>#}
    {#                    </tr>#}
    {#                    </thead>#}
    {#                    <tbody>#}
    {#                    {% for stream in stream_audio %}#}
    {#                        <tr>#}
    {#                            <td>{{ stream.file_size }}</td>#}
    {#                            <td>{{ stream.extension }}</td>#}
    {#                            <td><a href="{{ stream.video_url }}" style="text-decoration: none;" download="{{ title }}.{{ extension }}" target="_blank" >Download <i class=" fa fa-download"></i></a></td>#}
    {#                        </tr>#}
    {#                    {% endfor %}#}
    {#                    </tbody>#}
    {#                </table>#}
                </div>
            </div>
        {% endif %}
    {% endblock %}

### main.css

    html, body {
        padding: 0;
        margin: 0;
        background-color: #caccf642;
        color: black;
    }

    .background {
        background: url("https://wallpaperaccess.com/download/dark-landscape-143729");
        background-size: cover;
        padding-bottom: 200px
    }
    .btn:hover
    {
    background:#654321;
    opacity:0.3;
    }
    a:hover
    {
    opacity:0.5;
    color: #654321;
    }
    p {
        margin: 0;
    }

    .title {
        color: rgb(247, 190, 190);
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        padding-top: 5%;
        font-family: 'CircularStd', sans-serif;
    }

    .content {
        text-align: center;
        padding-top: 3%;
    }

    .content > form > div > div > input {
        padding: 15px;
        border-radius: 10px;
        width: 50%;
        border: 2px solid #960FF2;
        color: #960FF2;
        font-weight: bold;
        font-size: 17px;
        text-align: center;
    }

    .content > form > input[type="submit"] {
        background: #0066ff;
        font-size: 22px;
        font-family: 'Gotham Bold';
        padding: 15px 20px;
        border: 0;
        border-radius: 10px;
        margin-top: 2%;
    }

    a {
        color: #960FF2;
    }

    .dbox {
        padding-left: 100px;
        padding-right: 100px;
        display: flex;
        margin-top: 3%;
    }

    .v-title {
        color: #960FF2;
        font-size: 30px;
        font-weight: bold;
        font-family: 'CircularStd', sans-serif;
    }

    .dbox > .img-thumb {
        padding-right: 10px;
    }

    .dbox > .img-thumb > img {
        margin-right: auto;
        margin-left: auto;
        display: block;
        border-radius: 10px;
    }

    .dbox > .v-about {
        padding-left: 10px;
    }

    .dbox > .v-about > .infos {
        display: flex;
        flex-direction: row;
        flex: 1;
        margin-top: 25px;
    }

    .dbox > .v-about > .infos > li {
        list-style: none;
        padding-right: 50px;
        font-size: 18px;
        font-family: 'CircularStd';
        color: #480773;
    }

    .downloads {
        padding-left: 100px;
        padding-right: 100px;
        margin-top: 5%;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        font-family: 'CircularStd';

    }

    th, td {
        text-align: left;
        padding: 15px;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2
    }

    th {
        background-color: #D6F227;
        color: black;
    }

    #m-show {
        display: none;
    }

    @media screen and (max-width: 500px) {
        .dbox, .downloads {
            padding-right: 10px;
            padding-left: 10px;
        }

        .dbox > .img-thumb > img {
            width: 100% !important;
        }

        #desl {
            display: none;
        }

        #m-show {
            display: block;
        }
    }


    @font-face {
        font-family: 'Gotham Book';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Book'), url('fonts/GothamBook.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Book Italic';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Book Italic'), url('fonts/GothamBookItalic.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Light';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Light'), url('fonts/GothamLight.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Light Italic';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Light Italic'), url('fonts/GothamLightItalic.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Medium';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Medium'), url('fonts/GothamMedium.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Medium';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Medium'), url('fonts/GothamMedium_1.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Medium';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Medium'), url('fonts/GothamMediumItalic.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Bold';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Bold'), url('fonts/GothamBold.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Bold';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Bold'), url('fonts/Gotham-Bold.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Bold Italic';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Bold Italic'), url('fonts/GothamBoldItalic.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Black Regular';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Black Regular'), url('fonts/Gotham-Black.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Light Regular';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Light Regular'), url('fonts/Gotham-Light.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Thin Regular';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Thin Regular'), url('fonts/Gotham-Thin.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham XLight Regular';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham XLight Regular'), url('fonts/Gotham-XLight.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Book Italic';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Book Italic'), url('fonts/Gotham-BookItalic.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Thin Italic';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Thin Italic'), url('fonts/Gotham-ThinItalic.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham Ultra Italic';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham Ultra Italic'), url('fonts/Gotham-UltraItalic.woff') format('woff');
    }


    @font-face {
        font-family: 'Gotham XLight Italic';
        font-style: normal;
        font-weight: normal;
        src: local('Gotham XLight Italic'), url('fonts/Gotham-XLightItalic.woff') format('woff');
    }

    @font-face {
        font-family: 'CircularStd';
        src: url('fonts/CircularStd-Black.eot');
        src: url('fonts/CircularStd-Black.eot?#iefix') format('embedded-opentype'), url('fonts/CircularStd-Black.woff') format('woff'), url('fonts/CircularStd-Black.ttf') format('truetype'), url('fonts/CircularStd-Black.svg#bcc26993292869431e54c666aafa8fcd') format('svg');
        font-weight: 800;
        font-style: normal;
    }

    @font-face {
        font-family: 'CircularStd';
        src: url('fonts/CircularStd-BlackItalic.eot');
        src: url('fonts/CircularStd-BlackItalic.eot?#iefix') format('embedded-opentype'), url('fonts/CircularStd-BlackItalic.woff') format('woff'), url('fonts/CircularStd-BlackItalic.ttf') format('truetype'), url('fonts/CircularStd-BlackItalic.svg#bcc26993292869431e54c666aafa8fcd') format('svg');
        font-weight: 800;
        font-style: italic;
    }

    @font-face {
        font-family: 'CircularStd';
        src: url('fonts/CircularStd-Bold.eot');
        src: url('fonts/CircularStd-Bold.eot?#iefix') format('embedded-opentype'), url('fonts/CircularStd-Bold.woff') format('woff'), url('fonts/CircularStd-Bold.ttf') format('truetype'), url('fonts/CircularStd-Bold.svg#bcc26993292869431e54c666aafa8fcd') format('svg');
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: 'CircularStd';
        src: url('fonts/CircularStd-BoldItalic.eot');
        src: url('fonts/CircularStd-BoldItalic.eot?#iefix') format('embedded-opentype'), url('fonts/CircularStd-BoldItalic.woff') format('woff'), url('fonts/CircularStd-BoldItalic.ttf') format('truetype'), url('fonts/CircularStd-BoldItalic.svg#bcc26993292869431e54c666aafa8fcd') format('svg');
        font-weight: 600;
        font-style: italic;
    }

    @font-face {
        font-family: 'CircularStd';
        src: url('fonts/CircularStd-Medium.eot');
        src: url('fonts/CircularStd-Medium.eot?#iefix') format('embedded-opentype'), url('fonts/CircularStd-Medium.woff') format('woff'), url('fonts/CircularStd-Medium.ttf') format('truetype'), url('fonts/CircularStd-Medium.svg#bcc26993292869431e54c666aafa8fcd') format('svg');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'CircularStd';
        src: url('fonts/CircularStd-MediumItalic.eot');
        src: url('fonts/CircularStd-MediumItalic.eot?#iefix') format('embedded-opentype'), url('fonts/CircularStd-MediumItalic.woff') format('woff'), url('fonts/CircularStd-MediumItalic.ttf') format('truetype'), url('fonts/CircularStd-MediumItalic.svg#bcc26993292869431e54c666aafa8fcd') format('svg');
        font-weight: 500;
        font-style: italic;
    }

    @font-face {
        font-family: 'CircularStd';
        src: url('fonts/CircularStd-Book.eot');
        src: url('fonts/CircularStd-Book.eot?#iefix') format('embedded-opentype'), url('fonts/CircularStd-Book.woff') format('woff'), url('fonts/CircularStd-Book.ttf') format('truetype'), url('fonts/CircularStd-Book.svg#bcc26993292869431e54c666aafa8fcd') format('svg');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'CircularStd';
        src: url('fonts/CircularStd-BookItalic.eot');
        src: url('fonts/CircularStd-BookItalic.eot?#iefix') format('embedded-opentype'), url('fonts/CircularStd-BookItalic.woff') format('woff'), url('fonts/CircularStd-BookItalic.ttf') format('truetype'), url('fonts/CircularStd-BookItalic.svg#bcc26993292869431e54c666aafa8fcd') format('svg');
        font-weight: 400;
        font-style: italic;
    }

## BackEnd

### service.py

    def download_video(url):
        # Logic to download video using a library like pytube or youtube_dl
        video_info = {
            'title': 'Example Video Title',
            'download_link': 'http://example.com/download'
        }
        return video_info

### settings.py

    """
    Django settings for djangoProject project.

    Generated by 'django-admin startproject' using Django 3.1.1.

    For more information on this file, see
    https://docs.djangoproject.com/en/3.1/topics/settings/

    For the full list of settings and their values, see
    https://docs.djangoproject.com/en/3.1/ref/settings/
    """

    from pathlib import Path
    import os
    # Build paths inside the project like this: BASE_DIR / 'subdir'.
    BASE_DIR = Path(__file__).resolve().parent.parent


    # Quick-start development settings - unsuitable for production
    # See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

    # SECURITY WARNING: keep the secret key used in production secret!
    SECRET_KEY = '#r*6fh@d&_-_$=xai$jky0h^n(+y4s5jiu-4&w^1dkz=ex(7g2'

    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = True

    ALLOWED_HOSTS = ['*']


    # Application definition

    INSTALLED_APPS = [
        'ytdl',
        'crispy_forms',
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
    ]

    MIDDLEWARE = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'whitenoise.middleware.WhiteNoiseMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]

    ROOT_URLCONF = 'djangoProject.urls'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [BASE_DIR / 'templates']
            ,
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    WSGI_APPLICATION = 'djangoProject.wsgi.application'


    # Database
    # https://docs.djangoproject.com/en/3.1/ref/settings/#databases
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'test',
        }
    }


    # Password validation
    # https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]


    # Internationalization
    # https://docs.djangoproject.com/en/3.1/topics/i18n/

    LANGUAGE_CODE = 'en-us'

    TIME_ZONE = 'UTC'

    USE_I18N = True

    USE_L10N = True

    USE_TZ = True


    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/3.1/howto/static-files/

    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static_serve', 'static_root')

    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'static_serve', 'media_root')

    STATICFILES_DIRS = [os.path.join(BASE_DIR, "static_files")]
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

    CRISPY_TEMPLATE_PACK = 'bootstrap4'

    # CORS_REPLACE_HTTPS_REFERER      = False
    # HOST_SCHEME                     = "http://"
    # SECURE_PROXY_SSL_HEADER         = None
    # SECURE_SSL_REDIRECT             = False
    # SESSION_COOKIE_SECURE           = False
    # CSRF_COOKIE_SECURE              = False
    # SECURE_HSTS_SECONDS             = None
    # SECURE_HSTS_INCLUDE_SUBDOMAINS  = False
    # SECURE_FRAME_DENY               = False

### urls.py

    """djangoProject URL Configuration

    The `urlpatterns` list routes URLs to views. For more information please see:
        https://docs.djangoproject.com/en/3.1/topics/http/urls/
    Examples:
    Function views
        1. Add an import:  from my_app import views
        2. Add a URL to urlpatterns:  path('', views.home, name='home')
    Class-based views
        1. Add an import:  from other_app.views import Home
        2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
    Including another URLconf
        1. Import the include() function: from django.urls import include, path
        2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
    """
    from django.contrib import admin
    from django.urls import path
    from ytdl import views

    urlpatterns = [
        path('', views.download_video),
    ]

### views.py

    from django.shortcuts import render

    # Create your views here.
    from django.http import HttpResponse
    from django.shortcuts import render
    import youtube_dl
    from .forms import DownloadForm
    import re


    def download_video(request):
        global context
        form = DownloadForm(request.POST or None)
        
        if form.is_valid():
            video_url = form.cleaned_data.get("url")
            regex = r'^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+'
            #regex = (r"^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$\n")
            print(video_url)
            if not re.match(regex,video_url):
                print('nhi hoa')
                return HttpResponse('Enter correct url.')

            # if 'm.' in video_url:
            #     video_url = video_url.replace(u'm.', u'')

            # elif 'youtu.be' in video_url:
            #     video_id = video_url.split('/')[-1]
            #     video_url = 'https://www.youtube.com/watch?v=' + video_id

            # if len(video_url.split("=")[-1]) < 11:
            #     return HttpResponse('Enter correct url.')

            ydl_opts = {}

            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                meta = ydl.extract_info(
                    video_url, download=False)
            video_audio_streams = []
            for m in meta['formats']:
                file_size = m['filesize']
                if file_size is not None:
                    file_size = f'{round(int(file_size) / 1000000,2)} mb'

                resolution = 'Audio'
                if m['height'] is not None:
                    resolution = f"{m['height']}x{m['width']}"
                video_audio_streams.append({
                    'resolution': resolution,
                    'extension': m['ext'],
                    'file_size': file_size,
                    'video_url': m['url']
                })
            video_audio_streams = video_audio_streams[::-1]
            context = {
                'form': form,
                'title': meta['title'], 'streams': video_audio_streams,
                'description': meta['description'], 'likes': meta['like_count'],
                'dislikes': meta['dislike_count'], 'thumb': meta['thumbnails'][3]['url'],
                'duration': round(int(meta['duration'])/60, 2), 'views': f'{int(meta["view_count"]):,}'
            }
            return render(request, 'home.html', context)
        return render(request, 'home.html', {'form': form})

## Conclusion

The YouTube Video Downloader project successfully provides a user-friendly interface for downloading YouTube videos. By leveraging Django for the backend and using HTML/CSS for the frontend, the project demonstrates an effective approach to handling video downloads. The database schema is designed to ensure data integrity and support efficient data retrieval.

## References

    Django Documentation: https://docs.djangoproject.com/
    SQLite Documentation: https://www.sqlite.org/docs.html
    HTML and CSS: https://www.w3schools.com/
