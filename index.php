<?php

require __DIR__ . '/inc/connect.php';
require __DIR__ . '/inc/functions.php';

// dmp('PDO Objekt', $pdo);
// dmp('GET Array', $_GET);

// -------------------------------------------
// ### WORKING WITH THE DATABASE ###
// -------------------------------------------

$entries = ''; // placeholder for the searched database entries


// 'SQL STATEMENTS'

$sql_selectAll = '
    SELECT *
    FROM `entries`
    ORDER BY `id` DESC
';

$sql_selectCategory = '
    SELECT *
    FROM `entries`
    WHERE `hashtag` = :searchedCategory
    ORDER BY `id` DESC
';

$sql_selectAuthor = '
    SELECT *
    FROM `entries`
    WHERE `author` = :searchedAuthor
    ORDER BY `id` DESC
';

$sql_selectPeriod = '
    SELECT *
    FROM `entries`
    WHERE `date` BETWEEN :startDate AND :endDate
';


// 'PREPARTE STATEMENTS'

$statement_fetchAll = $pdo->prepare($sql_selectAll);
$statement_fetchAllForTheFilter = $pdo->prepare($sql_selectAll);
$statement_fetchByCategory = $pdo->prepare($sql_selectCategory);
$statement_fetchByAuthor = $pdo->prepare($sql_selectAuthor);
$statement_fetchPeriod = $pdo->prepare($sql_selectPeriod);


// 'EXECUTE THE RIGHT PREPARED STATEMENT'

$statement_fetchAllForTheFilter->execute();
$storedEntriesForTheFilter = $statement_fetchAllForTheFilter->fetchAll(PDO::FETCH_ASSOC);

if(empty($_GET)){
    $statement_fetchAll->execute();
    $entries = $statement_fetchAll->fetchAll(PDO::FETCH_ASSOC);
    // dmp('FETCH ALL ENTRIES', $entries);
}
else{
    // dmp('the get parameter', $_GET);
    
    if(isset($_GET['category'])){
        // dmp('choosen category', $_GET['category']);

        $statement_fetchByCategory->bindValue(':searchedCategory',$_GET['category'] );
        $statement_fetchByCategory->execute();

        $entries = $statement_fetchByCategory->fetchAll(PDO::FETCH_ASSOC);
        // dmp('fetch by category', $entries);
    }

    else if(isset($_GET['author'])){
        // dmp('choosen author', $_GET['author']);

        $statement_fetchByAuthor->bindValue(':searchedAuthor', $_GET['author']);
        $statement_fetchByAuthor->execute();

        $entries = $statement_fetchByAuthor->fetchAll(PDO::FETCH_ASSOC);
    }

    else if(isset($_GET['time'])){
        // dmp('choosen time', $_GET['time']);

        $periodArray = explode(',', $_GET['time']);
        // dmp('period array', $periodArray);

        $sortedPeriodArray = sortArrayOfDateStrings($periodArray);
        // dmp('sorted period array',$sortedPeriodArray);

        $startDate = $sortedPeriodArray[0];
        $endDate = $sortedPeriodArray[1];

        $statement_fetchPeriod->bindValue(':startDate', $startDate);
        $statement_fetchPeriod->bindValue(':endDate', $endDate);
        $statement_fetchPeriod->execute();

        $entries = $statement_fetchPeriod->fetchAll(PDO::FETCH_ASSOC);

        // dmp('period entries', $entries);
    }

}


// -------------------------------------------


require __DIR__ . '/view/index.view.php';