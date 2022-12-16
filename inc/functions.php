<?php

// => optimize the vardump output
function dmp($text, $var){
    echo '
        <section 
            style="
                padding: .5rem;
                padding-left: 2rem;
                border: solid rgba(0,0,0,0.1);
                // background: rgba(0,0,0, 0.01);
                border-width: 1px 0 1px;
                width: 100%;
                margin: .2rem auto;
            ">
    ';
    echo $text . ' => <br>';
    echo '<pre>';
        var_dump($var);
    echo '</pre>';
    echo '</section>'; 
}

// => defuse a string
function escape($text){
    return htmlentities($text,ENT_QUOTES, 'UTF-8', false);
}

// => make a european date
function europeDateFormat($date){
    $newDate = date("d-m-y", strtotime($date));
    $newDateInBetterFormat = str_replace("-", ".", $newDate);
    return $newDateInBetterFormat;
}

// => sort an array of date strings
function sortArrayOfDateStrings ($array){
    for($i = 0; $i < count($array); $i++){
        $time = strtotime($array[$i]);
        $array[$i] = $time;
   }

   usort($array, fn ($x, $y) =>  $x <=> $y);
//    var_dump($array);

    for($i = 0; $i < count($array); $i++){
        $date = date('Y-m-d', $array[$i]);
        $array[$i] = $date;
    }

//    var_dump($array);

    return $array;
}
