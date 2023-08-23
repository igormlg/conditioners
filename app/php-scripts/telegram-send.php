<?php
require 'config.php';
// $channel_id = '-1001821980475'; // igor_test_chanel

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$bot_url    = "https://api.telegram.org/bot" . BOT_TOKEN ."/";

$nonsequential = json_encode($data);
// $response = [];

// функция подключения к внешнему ресурсу
function connectResourse($url) {
    $curlSession = curl_init();
    curl_setopt($curlSession, CURLOPT_URL, $url);
    curl_setopt($curlSession, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($curlSession, CURLOPT_RETURNTRANSFER, true);

    $answer = json_decode(curl_exec($curlSession));
    curl_close($curlSession);

    return $answer;
}

if (isset($data['form'])) {
    $telegram_text = '';
    if ($data['form'] === "call-block-form") {
        $telegram_text = "Phone: " . $data['phone'] . "\n\nCallback has been ordered";
    }
    if ($data['form'] === "callback-form") {
        $telegram_text = "Phone: " . $data['phone'] . "\nName: " . $data['name'] . "\nLocation: " . $data['location'] . "\nWhen: " . $data['when'] . "\n\nNew order for install";
    }
    if (isset($data['installPlace'])) {
        $telegram_text = $telegram_text = "Phone: " . $data['phone'] . "\nName: " . $data['name'] . "\nLocation: " . $data['location'] . "\nWhen: " . $data['when'] . "\nInstall place: " . $data['installPlace'] . "\n\nNew order for install";
    }

    $url = $bot_url."sendMessage?chat_id=".CHANNEL_ID."&text=".urlencode($telegram_text);
    $answer = connectResourse($url);

    file_put_contents('file3.txt', print_r(($answer), 1). "\n", FILE_APPEND);

    if (isset($answer->{'ok'}) && $answer->{'ok'} == true) {
        $response = [
            'status' => 'ok',
            'messages_error' => ''
        ];
    } else {
        $response = [
            'messages_error' => 'Something went wrong',
            'status' => false,
        ];
    }
} else {
    $response = [
        'messages_error' => 'Something went wrong',
        'status' => false,
    ];
}
    
echo json_encode($response, JSON_ERROR_NONE); 

?>
