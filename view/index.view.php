<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leave A Mind</title>
    <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
    <div class="big-container">
        <h1>Leave A Mind</h1>

        <main class="lam">

<!-- Form -->
            <form class="lam_form" action="./submit.php" method="post">
                <div class="lam_form_input-container">
                    <label for="user-name">Dein Name :</label>
                    <input type="text" name="name" id="user-name" required >
                    <span class="hint"></span>
                </div>

                <div class="lam_form_input-container">
                    <label for="message-title">Überschrift :</label>
                    <input type="text" name="title" id="message-title" required>
                    <span class="hint"></span>
                </div>

                <div class="lam_form_input-container">
                    <label for="message">Message :</label>
                    <textarea 
                        cols="50"
                        rows="20"
                        name="message" 
                        id="message"
                        spellcheck="true"
                        required></textarea>
                    <span class="hint"></span>
                    <span class="free-character-hint">XXX</span>
                </div>

                <div class="lam_form_input-container radio-fields">
                    <p>Kategorie :</p>

                    <div class="radio-fields_field-container">
                        <label for="radio-mind">Gedanke</label>
                        <input type="radio" name="hashtag" value="Gedanke" id="radio-mind" checked>
                    </div>

                    <div class="radio-fields_field-container">
                        <label for="radio-poem">Gedicht</label>
                        <input type="radio" name="hashtag" value="Gedicht" id="radio-poem">
                    </div>
                  
                    <div class="radio-fields_field-container">
                        <label for="radio-quote">Zitat</label>
                        <input type="radio" name="hashtag" value="Zitat" id="radio-quote">
                    </div>
                  
                    <div class="radio-fields_field-container">
                        <label for="radio-recommendation">Empfehlung</label>
                        <input type="radio" name="hashtag" value="Empfehlung" id="radio-recommendation">
                    </div>

                    <span class="hint"></span>
                </div>
            </form>

<!-- Form Button -->
            <button class="lam_form-controll-button">
                <span class="lam_form-controll-button_img">
                    <img src="./images/pen.png" alt="ein Bleistift">
                </span>

                <span class="lam_form-controll-button_text">Submit</span>
            </button>

<!-- Entries Section -->
            <section class="lam_entries">

    <!-- Entry -->
               <? /*php dmp('entries array', $entries) */?>
               <!-- <br>  -->

                <!-- // 'CREATE AN ARTICLE FOR EACH ENTRY OF THE DATABSE ' -->
                <?php if(!empty($entries)) foreach($entries as $entry): ?>

                    <article class="lam_entries_entry">
                        <header class="lam_entries_entry_header">
                            <span class="lam_entries_entry_author"><?= escape($entry['author']) ?></span>
                            <span class="lam_entries_entry_date">schrieb am <?= europeDateFormat($entry['date']) ?></span>
                            <span class="lam_entries_entry_category"># <?= escape($entry['hashtag']) ?></span>
                            <span class="lam_entries_entry_title"><?= escape($entry['title']) ?></span>
                        </header>

                        <?php 
                            // 'HANDLE THE CONTENT OF THE ENTRY '
                
                            // --- POEM CONTENT ---
                            if($entry['hashtag'] === 'Gedicht'){

                                // 'FORMAT THE CONTENT TO MAKE LINEBREAKS VISIBLE => METHOD 1'

                                // => check which line break is a part of a poem paragraph
                                //    and wich is a line break between two poem paragraphs
                                // => check if there is more then one line break between two poem paragraphs
                                //    and delete the souperfluous

                                $poemParts = explode("\n", $entry['content']);
                                // dmp('poem paragraphs', $poemParts);

                                $idxOfLinebreak = 0;

                                foreach($poemParts as $idx => $value){
                                    $value = trim($value);
                                    // dmp('the array value', $value);

                                    if(strlen($value) === 0){
                                        // echo $idx . "=>" . $value;

                                        if($idxOfLinebreak === 0){
                                            $idxOfLinebreak = $idx +1;
                                            $poemParts[$idx] = $value;
                                        }

                                        if($idxOfLinebreak === $idx){
                                            $idxOfLinebreak = $idx +1;
                                            unset($poemParts[$idx]);
                                        }
                                    }
                                    else if(strlen($value) > 0){
                                        $idxOfLinebreak = 0;
                                    }
                                }

                                // dmp('poem paragraphs', $poemParts);

                                // 'CREATE DOM CONTENT'

                                foreach($poemParts as $poemPart){
                                    // dmp('poem part', $poemPart);

                                    if(strlen($poemPart) > 0){
                                        echo 
                                            "<span class='lam_entries_entry_poem-line'>" .
                                                escape($poemPart) . 
                                            "</span>";
                                    }
                                    else {
                                        echo "<br>";
                                    }
                                }

                            }
                            // --- ALL OTHER CONTENT ---
                            else{

                                // 'FORMAT THE CONTENT TO MAKE LINEBREAKS VISIBLE => METHOD 2'

                                // => check the line breaks and sort out any empty line
                                
                                $paragraphs = explode("\n", $entry['content']);
                                $filteredParagraphs = [];

                                foreach($paragraphs as $paragraph){
                                    $paragraph = trim($paragraph);
    
                                    if(strlen($paragraph) > 0){
                                        $filteredParagraphs[] = $paragraph;
                                    }
                                }
                                
                                // dmp('paragraphs', $paragraphs);
    
                                // 'CREATE DOM CONTENT'
    
                                foreach($filteredParagraphs as $formatedParagraph){
                                    echo 
                                        "<p class='lam_entries_entry_content'>" . 
                                        escape($formatedParagraph) . 
                                        "</p>";
                                }
                            }
                            // dmp('content', $entry['content']);
                        ?>    
                    </article>

                <?php endforeach; ?>

                <?php if(empty($entries) && isset($_GET['time']) ) :?>
                    <p class="no-results">
                        Sorry, es sind keine Einträge für den Zeitraum zwischen 
                        <span><?= europeDateFormat($startDate)?></span> und 
                        <span><?= europeDateFormat($endDate) ?> </span> vorhanden.
                    </p>
                <?php endif; ?>

                <!-- dummy entry -->
                <!-- <article class="lam_entries_entry">
                    <header class="lam_entries_entry_header">
                        <span class="lam_entries_entry_author">Max Mustermann</span>
                        <span class="lam_entries_entry_date">schrieb am 24.10.2022</span>
                        <span class="lam_entries_entry_category"># Gedanke</span>
                        <span class="lam_entries_entry_title">Hey</span>
                    </header>

                    <p class="lam_entries_entry_content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </article> --> 
            </section>
        </main>

<!-- Floating Actions -->
        <div class="lam_floating-actions">

            <!-- FAB and Pick List -->
            <button class="lam_floating-actions_button"></button>

            <ul class="lam_floating-actions_list">
                <li>Kategorie</li>
                <li>Autor</li>
                <li>Zeitraum</li>
            </ul>

            <!-- Pick List Item Options -->
            <div class="lam_floating-actions_choice">
                <ul class="lam_floating-actions_choice_category">
                    <li>Gedanke</li>
                    <li>Gedicht</li>
                    <li>Zitat</li>
                    <li>Empfehlung</li>
                </ul>

                <?php 
                    $filteredAuthor = ['Moritz'];

                    foreach($storedEntriesForTheFilter as $entry){
                        $authorName = $entry['author'];

                        // dmp('author name', $authorName);
                        in_array($authorName, $filteredAuthor) || $filteredAuthor[] = $authorName; 
            
                    }

                    // dmp('filtered authors', $filteredAuthor);
                ?>

                <ul class="lam_floating-actions_choice_author">
                   <?php foreach($filteredAuthor as $entry): ?>
                        <li><?= escape($entry) ?></li>
                    <?php endforeach; ?>
                </ul>

                <!-- // 'FIND THE OLDEST DATE ENTRY' -->
                <?php 
                    $dateArray = [];

                    foreach($storedEntriesForTheFilter as $entry){
                        $date = $entry['date'];

                        in_array($date, $dateArray) || $dateArray[] = $date; 
                    }

                    $sortedDateArray = sortArrayOfDateStrings($dateArray);
                    $theFirstExistingDate = $sortedDateArray[0];
                    $theLatestExistingDate = $sortedDateArray[count($sortedDateArray)-1];

                    // dmp('date array', $dateArray);
                    // dmp('sorted date array', $sortedDateArray);
                    // dmp('the oldest date', $theFirstExistingDate);
                    // dmp('the latest date', $theLatestExistingDate);
                ?>

                <div class="lam_floating-actions_choice_date">
                    <div class="lam_floating-actions_choice_date_hint">
                    <p>Hinweis :</p>
                        <p>Der erste Eintrag in die Datenbank wurde am <?= europeDateFormat($theFirstExistingDate) ?> erstellt.</p>
                        <p>Der letzte am <?= europeDateFormat($theLatestExistingDate) ?></p>
                    </div>
                
                    <label for="start-date">Von :</label>
                    <input type="date" id="start-date" name="start-date" min="<?= $theFirstExistingDate ?>">

                    <label for="end-date">Bis :</label>
                    <input type="date" id="end-date" name="end-date" min="<?= $theFirstExistingDate ?>" >
                </div>

                <div class="placeholder-for-js-state"></div>
            </div>

            <form class="lam_floating-actions_form" method="get" action="./index.php">
                <input type="hidden">
            </form>

        </div><!-- End Floating Actions Container -->
        



    </div><!-- End Big Container -->
    
    <script src="./src/js/form.js"></script>
    <script src="./src/js/free_chars_hint.js"></script>
    <script src="./src/js/filter.js"></script>
</body>
</html>

