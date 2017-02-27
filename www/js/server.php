<?php
    $requestJson =json_decode(file_get_contents('php://input'),true);
    $action = $requestJson['action'];
    $lat =$requestJson['data']['lat'];
    $long = $requestJson['data']['long'];
    $units = $requestJson['data']['units'];

    $url = "https://api.darksky.net/forecast/7e435afb07d070e0e163302e29f11294/$lat,$long?&units=$units";

    if($action==='getForecast'){
        $xml = file_get_contents($url);
        echo $xml;
    }