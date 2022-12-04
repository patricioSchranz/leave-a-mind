<?php

require __DIR__ . '/inc/connect.php';
require __DIR__ . '/inc/functions.php';

// -------------------------------------------
// ### HANDLE SUBMIT ###
// -------------------------------------------

// 'SQL STATEMENT'

$sql_postANewEntry = '
    INSERT INTO entries (`author`, `title`, `content`, `hashtag`, `date`)
    VALUES (:author, :title, :message, :hashtag, :date)
';


// 'HANDLE POST DATAS'

if(!empty($_POST)){
    dmp('The Post Datas', $_POST);

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

    $statement_insertEntry = $pdo->prepare($sql_postANewEntry);
    $statement_insertEntry->bindValue(':author', $author);
    $statement_insertEntry->bindValue(':title', $title);
    $statement_insertEntry->bindValue(':message', $message);
    $statement_insertEntry->bindValue(':hashtag', $hashtag);
    $statement_insertEntry->bindValue(':date', $currentDateFormated);
    $statement_insertEntry->execute();

    $thisStatementId = $pdo->lastInsertId();
    
    if($thisStatementId){
        dmp('redirect', $thisStatementId);

        echo 
        "<script>
           window.open('./index.php', '_self')
        </script>";

        exit();
    }
   
}

// 'HANDLE NULL POST DATAS'

else{
    die('Error');
    // header("Location: ./index.php"); 
}


dmp('The Author', $author);
dmp('The Title', $title);
dmp('The Message', $message);
dmp('The Hashtag', $hashtag);
dmp('The current Date', $currentDate);
dmp('The current Date formated', $currentDateFormated);
dmp('last insert id ', $thisStatementId);


