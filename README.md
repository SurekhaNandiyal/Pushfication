# Pushfication
#Push Notification Service


#API:
#POST: 
#Eg: http://localhost:3000/registerUser?username=bbc1&accessToken=4234
#Params : username, accessToken
#GET: 
#Eg: http://localhost:3000/getAllRegisteredUsers
#No Params
#POST: 
#Eg: http://localhost:3000/pushNotification?body=Good Morning&type=note&username=bbcUser4&title=Greetings
#Params: username, type
#Note: 
type - Set to note
title - The note's title.
body - The note's message.
Link
type - Set to link
title - The link's title.
body - A message associated with the link.
url - The url to open.
File
type - Set to file
body - A message to go with the file.
file_name - The name of the file.
file_type - The MIME type of the file.
file_url - The url for the file. See pushing files for how to get a file_url
