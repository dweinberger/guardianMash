<?php

$term = $_REQUEST['term'];

$furl = "https://greencommons.herokuapp.com/api/v1/search?q="  . $term . "&return=title&q.parser=structured";

$f = file_get_contents($furl);

//("https://doc-gc-search-r2aim34zywsfrpbiwkzneb7wae.us-west-2.cloudsearch.amazonaws.com/2013-01-01/search?&q=" . $term . "&return=title");

echo $f;

?>