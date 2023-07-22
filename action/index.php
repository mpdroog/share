<?php
define("ROOT", __DIR__);
$req = $_SERVER["DOCUMENT_URI"] ?? null;
$req = str_replace("/action/", "", $req);
$req = str_replace(".", "", $req);

$fname = __DIR__ . "/cmp/$req/index.php";
if (! file_exists($fname)) {
    echo "ERR: No such file";
    exit();
}
require $fname;

