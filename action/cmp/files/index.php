<?php
$files = scandir(ROOT."/../files");
$out = [];

foreach ($files as $file) {
    if (in_array($file, [".", ".."])) continue;
    $out[] = ["file" => $file, "content" => file_get_contents(ROOT."/../files/$file")];
}

echo json_encode($out);
