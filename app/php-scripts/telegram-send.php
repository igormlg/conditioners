<?php
// $channel_id = '-1001821980475'; // igor_test_chanel
$channel_id = '-1001774735836'; // conditioners_channel
$bot_token = '2011467293:AAFuNRDmK__OoqDdJcPX0PHWSCthQOdGtmo'; #test_igormlg_bot3

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$bot_url    = "https://api.telegram.org/bot$bot_token/";

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
    if ( $data['form'] === "call-block-form") {
        $telegram_text = "Phone: " . $data['phone'] . "\n\nCallback has been ordered";
    }

    $url = $bot_url."sendMessage?chat_id=".$channel_id."&text=".urlencode($telegram_text);
    $answer = connectResourse($url);

    file_put_contents('file3.txt', print_r(($answer), 1). "\n", FILE_APPEND);

    if (isset($answer->{'ok'})) {
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
