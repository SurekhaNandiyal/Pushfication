# Pushfication - Push Notification Service


## API:
### Register User: 
  Eg: http://localhost:3000/registerUser?username=bbc1&accessToken=4234
  **Params : username, accessToken**
  **HTTP Post**
### Get all Registered Users: 
  Eg: http://localhost:3000/getAllRegisteredUsers
  **No Params**
  **HTTP Get**
### Push Notification: 
  Eg: http://localhost:3000/pushNotification?body=Good Morning&type=note&username=bbcUser4&title=Greetings
  **Params: username, type, body, url, file_name, file_type, file_url, source_device_iden, client_iden, channel_tag, email, guid**
  **HTTP Post**
  **Note:**
    - type - Set to note
    - title - The note's title.
    - body - The note's message.
  **Link**
    - type - Set to link
    - title - The link's title.
    - body - A message associated with the link.
    - url - The url to open.
  **File**
    - type - Set to file
    - body - A message to go with the file.
    - file_name - The name of the file.
    - file_type - The MIME type of the file.
    - file_url - The url for the file. See pushing files for how to get a file_url
    
  - source_device_iden	- string - Device iden of the sending device. Optional.
  - client_iden	- string -	Client iden of the target client, sends a push to all users who have granted access to this client. The current user must own this client.
  - channel_tag -	string - Channel tag of the target channel, sends a push to all people who are subscribed to this channel. The current user must own this channel.
  - email	- string	- Email address to send the push to. If there is a pushbullet user with this address, they get a push, otherwise they get an email.
  - guid -	string	- Unique identifier set by the client, used to identify a push in case you receive it from /v2/everything before the call to /v2/pushes has completed. This should be a unique value. Pushes with guid set are mostly idempotent, meaning that sending another push with the same guid is unlikely to create another push (it will return the previously created push).
