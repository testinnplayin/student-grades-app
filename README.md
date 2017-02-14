#Introduction:

This app is to solve a pain point many teachers face: how to deal with all of their students grades in several classes? Teachers can end up teaching multiple classes every term, every year and these classes can have a lot of students in them. Recording grades in some sort of database/spreadsheet takes a long time. Once this app is completed it will do several things:
 1. Allow teachers to enter students in their classes into a Mongo database and to record every grade for every assignment the students are graded on.
 2. Look at trends in their students and in their classes from year-to-year.

This current iteration of the app is an incomplete MVP to get started on entering classes and students into the Mongo Database via Node on the back-end and jQuery on the front-end. It is by no means a polished app.

#Current Features:
1. Can create/edit/delete and view a class.\n
2. Can create students.\n
3. Can obtain pre-seeded grades in the database for each student and calculate their GPA and their median grade.\n

#Future Features:
1. Can edit/delete students.
2. Can view a student and see his grades and statistics.\n
3. Will be able to sort grades, sort students and classes and finally sort through assignments/exams and grades.\n
4. Will have a chart API that shows trends for students from year-to-year but also class grades.\n
5. Provide accounts for the teachers with encryption of passwords. These accounts will be able to draw up the history of the teacher's classes.\n
6. Will be able to bulk load students/grades for assignments.\n
7. Technology will hopefully be updated soon to be a React application rather than hand-coded jQuery.\n

#Technology Used: 
Node/Express (and many modules such as Chai and Mocha), MongoDB/Mongoose, jQuery, SASS