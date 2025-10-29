<?php

require __DIR__ . '/inc/connect.php';
require __DIR__ . '/inc/functions.php';



// -------------------------------------------
// ### HANDLE SUBMIT ###
// -------------------------------------------


// 'FIRST STEP: ENCODE DATAS!'

foreach($_POST as $name => $value){
    $_POST[$name] = escape($value);
}


// 'HANDLE POST DATAS'

// => if there are submited datas, handle it
if(!empty($_POST)){
    // dmp('The Post Datas', $_POST);

    // 'CHECK IF NAME OR TITLE INPUT CONTAINS NOT ALLOWED CHARACTERS AND REPLACE THEM'

    $regPattern_alphanumericWhitespace = "/[^\w\s]/" ;

    // => if the name input contains characters that match the regular expression, delete them from the string
   $_POST['name'] = 
        preg_match($regPattern_alphanumericWhitespace,  $_POST['name'])
        ? preg_replace($regPattern_alphanumericWhitespace, '', $_POST['name'])
        : $_POST['name'];

    // => if the title input contains characters that match the regular expression, delete them from the string
    $_POST['title'] = 
        preg_match($regPattern_alphanumericWhitespace,  $_POST['title'])
        ? preg_replace($regPattern_alphanumericWhitespace, '', $_POST['title'])
        : $_POST['title'];


    // 'DELETE WHITESPACE ON THE START AND END OF A STRING'

    foreach($_POST as $name => $value){
        $_POST[$name] = trim($value);
    }


    // 'SET VALUES IF THEY DON`T EXIST / CREATE CURRENT DATE'

    $author = 
        $_POST['name']
        ? @(string) $_POST['name']
        : 'Mark Twain';

    $title = 
        $_POST['title']
        ? @(string) $_POST['title']
        : 'Freundlichkeit';

    $message = 
        $_POST['message']
        ? @(string) $_POST['message']
        : 'Freundlichkeit ist eine Sprache, die Taube hören und Blinde lesen können.';

    $hashtag = 
        $_POST['hashtag']
        ? @(string) $_POST['hashtag']
        : 'Zitat'; 
    
    // => create a new datetime object
    $currentDate = new Datetime();

    // => set the current date to a variable
    $currentDateFormated = $currentDate->format("Y/m/d");


    // 'INSERT THE DATA TO THE DATABASE'

    // => create the sql statement
    $sql_postANewEntry = '
    INSERT INTO entries (`author`, `title`, `content`, `hashtag`, `date`)
    VALUES (:author, :title, :message, :hashtag, :date)
    ';

    // => create the prepared statement
    $statement_insertEntry = $pdo->prepare($sql_postANewEntry);

    // => bind the values to the prepared statement
    $statement_insertEntry->bindValue(':author', $author);
    $statement_insertEntry->bindValue(':title', $title);
    $statement_insertEntry->bindValue(':message', $message);
    $statement_insertEntry->bindValue(':hashtag', $hashtag);
    $statement_insertEntry->bindValue(':date', $currentDateFormated);

    // => execute the prepared statement
    $statement_insertEntry->execute();

    // => get the id of this insert
    $thisStatementId = $pdo->lastInsertId();
    
    // => if everything worked, open the index.php
    if($thisStatementId){
        echo 
        "<script>
           window.open('./index.php', '_self')
        </script>";

        exit();
    }
   
}

// => if the $_POST array is empty, terminate the script
else{
    die('Error');
}



