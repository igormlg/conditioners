<?php
$nonsequential = array(1=>"foo", 2=>"bar", 3=>"baz", 4=>"blong");
// echo '123';
$nonsequential = json_encode($nonsequential);
print_r($nonsequential);
return $nonsequential;