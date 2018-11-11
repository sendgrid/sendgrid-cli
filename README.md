# SendGrid CLI

A cli tool for SendGrid APIs

# Prerequisites

* SendGrid Account
* Tested with NodeJS v8.12.0

# Installation

* Clone this project
* `cd sendgrid-cli`
* `npm install`
* Rename `.env_sample` to `.env` and update the values

# Usage

This command line interface implements a limited set of commands.

* `sg list-tokens`: List api keys
* `sg subuser-admins`: Get all subuser teammate admin
* `sg contacts upload`: Upload contacts from a CSV file (fields: email, first_name, last_name)

These will output JavaScript Objects that are human readable.

You can also prepend `DEBUG=sg:*` for additional debug logging (not much yet).

Debug namespaces:
* `sg:client`
* `sg:utils`
* `sg:contacts`
* `sg:contacts-upload`
* `sg:list-tokens`
* `sg:subuser-admins`

# Todos

* Pipe from one command into another (need to output JSON strings to stdout)

# License

[LICENSE](LICENSE)