# BCIT-Charity-Bingo

This is a fun little application designed specifically for the United Way Charity Bingo game at BCIT.  After entering your bingo numbers into the data.json file, you can quickly check your results from the command line using NodeJS.

## Installation

If you already have NodeJS installed on your computer, simply run the following command in the directory of your choice:

    npm install bcit-charity-bingo

## Setup

After install, find the file in the root of the folder called data.json.  Edit this file replacing the pre-populated bingo numbers with the numbers from your own bingo cards.

*You will only need to do this once ;)*

## Check Your Numbers

Assuming you entered all your bingo numbers correctly, it's time to run the application.  In the command prompt, navigate to the root of the folder.  If you just ran `npm install bcit-charity-bingo` from the step above, you can type `cd node_modules/bcit-charity-bingo`.  Then type the following: 

    node check-bingo-numbers

If everything went correctly, you should see a prompt requesting your username.  This is your A00 number for loging into the Loop (where the bingo numbers are being called).  Next you will be prompted for your password.  This will only be used to post your credentials to the Loop login page so that the program can access the current numbers.  After the numbers have been checked, the program will log you out and your username/password will be lost when the process ends

You can also run the following from the command line

    node check-bingo-numbers a00751527

At this point you will be prompted for your password.  Alterntively, you could run:

    node check-bingo-numbers a00751527 myPasswordForEveryoneToSee

This just skips the prompts altogether.

## Technology

This works using a "headless browser" called PhantomJS.  Similar to Chrome and Firefox, it's capable of rendering webpages, except in this case, it's completely invisible.  If you don't believe me, you can see proof after running the program in the `screen-caps` folder.  There will be a series of images showing the entire bingo-checking experience.

After PhantomJS arrives at the bingo page (also set in the data.json file), it simply uses JavaScript to extract the called and uncalled bingo numbers from the table.  With these in hand, it's just a matter of comparing the results against the numbers you entered in data.json.
