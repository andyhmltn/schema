# Schema
#### Warning: alpha and missing many crucial features.

![Schema](http://i.imgur.com/jhJWMzj.png)

Schema is a modern, web-based database management tool. Features include:

- Modern UI and markup
- All AJAX
- Persistent database connections
- Support for MySQL (and soon PostgreSQL)
- Very fast
- Helpful information as you work, such as the storage sizes of data types

## Installation

To install, first you must download a copy of the source code. The best way to
do this would be using git:

    git clone git@github.com:timdavies/schema.git

However, you may prefer to download a ZIP archive of the source instead.
You can find this here: https://github.com/timdavies/schema/archive/master.zip

Once you have a copy of the source, enter the project directory and run the
following commands:

    npm install
    bower install

You will need to have `npm` and `bower` installed for this to work.

Finally, to run Schema, enter the following command:

    node app.js

Schema will now be running and you can access it by visiting `http://localhost:8000/`
in your browser.

Thanks for trying Schema!

## Problems to be aware of

Schema is seriously alpha software. Check out the RELEASES file for the criteria
I have decided on for each release. There's a *lot* left to do and what has been
done is almost definitely buggy as hell.

- Inserting and editing data issues - very little of this works and what does
  work is buggy. Use with care and definitely not on production. I am working
  on inserting and editing data currently.
- There is no "garbage collection" on database connections, so currently they
  will just keep piling up. This will be addressed soon (as well as database
  connection consolidation). There may be memory leaks, both server-side and
  client-side.
- Bugs in browsers other than Safari and Chrome. I have not tested in Firefox
  or IE.
- Security problems - I have kept the server-side code small to (hopefully)
  reduce security issues however there could be problems still. Also, details
  are currently sent over plaintext so don't use on an untrusted network yet.
