
#INSTRUCTIONS TO RUN THE APPLICATION
				   (Consider Linux environment)
				   
				   
##Adding Node and NPM
(You can install latest npm and node too if you prefer I'd instruct with my version so that this node and npm versions work 
for a angular frontend too - the latest angular versions(11) won't work with latest npm and node versions properly- This is a 
completely additional thing. Only for the backend you can have the latest node and npm versions)

First need to install the node and npm.
Go to this link.	https://nodejs.org/en/blog/release/v14.16.1/           And download the related Binary or Installer according to your Operating System.
( I recommend Binary and Linux environment)
(For mine the link is:  https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz

Then create a folder named "node" under the opt folder of your computer. (If there is no opt folder, then create a folder named opt under your root folder.)
Place the downloaded file in the created node folder and extract it in the same folder. (right click on downloaded file --> Extract Here)
Then open the extracted file. Next open to the bin.
Now press "Ctrl+ L"  Then press "Ctrl + C" to copy the path to the bin.
Then press "Ctrl + Alt + T" to open the terminal (at any place)
Then type 		gedit ~/.profile       and        press Enter        to open the system variable document. 
(You can use any editor to open the .profile file    Ex: code  ~/.profile     can be used if you have vs code.
Add below line to that text document.
export PATH=$PATH:
Now add the copied path to the node bin here after the $PATH:  as below.
export PATH=$PATH:/opt/node/node-v14.16.1-linux-x64/bin

If you are already using node then you have a similar path in .profile file and change it to this copied path.
Now in the same terminal that you typed "gedit ~/.profile", type the below command and press Enter to compile the .profile file
	source ~/.profile  
Now check the version of node by  typing node --version in the same terminal and pressing Enter.
It will show "v14.16.1"

Now You need to logout from your computer and come back again.(This is necessary to update the environmal variable to the system)
Now you have the required version of the node. Check the version again to check and confirm it.
Now Open the terminal again(at any where by pressing "Ctrl + Alt + T" and type below codes and press the enter.

	npm i npm@6.14.12
	
Now you have sucessfully installed the Node and NPM. Now go to the next stage of  "Configurations to Run the Application".
(You can install latest npm and node too if you prefer)

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------Configurations to Run the Application-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
1. Create a folder named practial_assignment
2. Open that folder
2. Right click on the folder and open the terminal. Then type below codes and execute them by pressing Enter.
	1. cd Custom-Question-Manager-Backend
	2. npm i
	3. npm start  
	
3. Now You have started the Server(Don't close that terminal)
	
5. Now using the postman application or a suitable client(browser) you can receive the data from the server.
(You have to create a data base named question, (if it is not existed) for a real project).
