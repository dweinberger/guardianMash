<?php

$bool = "(or ('water') ('wind'))";

// "https://doc-gc-search-r2aim34zywsfrpbiwkzneb7wae.us-west-2.cloudsearch.amazonaws.com/2013-01-01/search?&q=(or+'water'%20'wind'%20'city')&return=title&q.parser=structured"

//$furl = "https://greencommons.herokuapp.com/api/v1/search?q=wind&filters[resource_types]=articles,reports&filters[model_types]=resources,lists,groups&page=2&per=5";

$furl = "https://greencommons.herokuapp.com/api/v1/search?q=(or+'water'%20'wind'%20'city')&return=title&q.parser=structured";

$f = file_get_contents($furl);


print $f;

?>