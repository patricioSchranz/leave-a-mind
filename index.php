<?php

require __DIR__ . '/inc/connect.php';
require __DIR__ . '/inc/functions.php';

// dmp('PDO Objekt', $pdo);
// dmp('GET Array', $_GET);


// 'PAGINATION VARIABLES'

$countOfAllEntries = 0; // placeholder
$entriesPerPage = 2; // the count of entries that should be visible per page

$currentPage = 
    isset($_GET['page'])
    ? (int)$_GET['page']
    : 1; 

$offset = ($currentPage -1) * $entriesPerPage ; // first entry of the page
$limit = $currentPage * $entriesPerPage - 1; // last entry of the page

dmp('THE CURRENT PAGE IS ', $currentPage);

// -------------------------------------------
// ### WORKING WITH THE DATABASE ###
// -------------------------------------------

$entriesAll = [];  // placeholder for all of the searched database entries
$entries = []; // placeholder for the searched database entries that are prepared for the output
$usedFilter = []; // placeholder for the used filter

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

if(
    empty($_GET['category']) &&
    empty($_GET['author']) &&
    empty($_GET['time'])
    ){
    $statement_fetchAll->execute();
    $entriesAll = $statement_fetchAll->fetchAll(PDO::FETCH_ASSOC);

    $countOfAllEntries = count($entriesAll);

    // for($x = $offset; $x <= $limit; $x++){
    //     // dmp('$x', $x);
    //     // dmp('$limit', $limit);
        
    //     if(!empty($entriesAll[$x])){
    //         $entries[$x] = $entriesAll[$x];
    //     }
    //     else{
    //         break;
    //     }
       
    // }

    // => selection of entries for the current page
    $entries = getPaginationPortion($entriesAll, $offset, $limit);
    // dmp('entries', $entries);
    
    dmp('count of all entries', $countOfAllEntries);

    // foreach($entries as $key => $value){
    //     echo $key . '<br>';
    // }
    // dmp('FETCH ALL ENTRIES', $entries);
}
else{
    // dmp('the get parameter', $_GET);
    
    if(isset($_GET['category'])){
        // dmp('choosen category', $_GET['category']);

        $statement_fetchByCategory->bindValue(':searchedCategory',$_GET['category'] );
        $statement_fetchByCategory->execute();

        $entriesAll = $statement_fetchByCategory->fetchAll(PDO::FETCH_ASSOC);
        $countOfAllEntries = count($entriesAll);

        $entries = getPaginationPortion($entriesAll, $offset, $limit);
        $usedFilter = $_GET;

        dmp('used filter', $usedFilter);
        dmp('page number', $currentPage);
        dmp('offset', $offset);
        dmp('limit', $limit);
    }

    else if(isset($_GET['author'])){
        // dmp('choosen author', $_GET['author']);

        $statement_fetchByAuthor->bindValue(':searchedAuthor', $_GET['author']);
        $statement_fetchByAuthor->execute();

        $entriesAll = $statement_fetchByAuthor->fetchAll(PDO::FETCH_ASSOC);
        $countOfAllEntries = count($entriesAll);

        $entries = getPaginationPortion($entriesAll, $offset, $limit);
        $usedFilter = $_GET;

        dmp('used filter', $usedFilter);
        dmp('page number', $currentPage);
        dmp('offset', $offset);
        dmp('limit', $limit);
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

        $entriesAll = $statement_fetchPeriod->fetchAll(PDO::FETCH_ASSOC);
        $countOfAllEntries = count($entriesAll);

        $entries = getPaginationPortion($entriesAll, $offset, $limit);
        $usedFilter = $_GET;

        dmp('used filter', $usedFilter);
        dmp('page number', $currentPage);
        dmp('offset', $offset);
        dmp('limit', $limit);

        // dmp('period entries', $entries);
    }

}


// -------------------------------------------


require __DIR__ . '/view/index.view.php';