# Retrieving SendGrid Token

Certain API calls require you to set the `SENDGRID_TOKEN` environment variable.  These will be noted in the command help itself.

*** This token is only valid for the browser session.  You will need to update the token when 

To do this:

* Login to https://app.sendgrid.com


# Firefox

  * Navigate to Tools > Web Developer > Toggle Tools
  * In Dev Tools navigate to the Storage tab
  * Find the Cookies storage
  * Locate https://app.sendgrid.com in the list
  * Filter for `token`, you should see `mako_auth_token`
  * Copy the value and add it to your `.env` file
    
# Chrome
  
  * View > Developer > Developer Tools
  * In Dev Tools navigate to the Application tab
  * Storage > Cookies
  * Locate https://app.sendgrid.com in the list and click on it
  * Filter for `token`, you should see `mako_auth_token`
  * Copy the value and add it to your `.env` file

