<?php

// gets tags for text using ClimateTagger.net

$txt = $_REQUEST['text'];
//error_log("TEXT=|$txt| ");

$txt=urlencode($txt);

$f = file_get_contents("http://api.climatetagger.net/service/extract?token=5c62f0ba28b94d24a8aacbbfc2d2feb0&format=json&locale=en&text=" . $txt);

//error_log("-----TAGS: $f");

echo $f;



?>