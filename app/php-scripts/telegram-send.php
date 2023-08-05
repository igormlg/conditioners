<?php
// $channel_id = '-1001821980475'; // igor_test_chanel
$channel_id = '-1001774735836'; // conditioners_channel
$bot_token = '2011467293:AAFuNRDmK__OoqDdJcPX0PHWSCthQOdGtmo'; #test_igormlg_bot3

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$bot_url    = "https://api.telegram.org/bot$bot_token/";

$nonsequential = json_encode($data);
$response = [];

if (isset($data['form'])) {
    if ( $data['form'] === "call-block-form") {
        $telegram_text = "Phone: " . $data['phone'] . "\n\nCallback has been ordered";
    }

    file_put_contents('file3.txt', print_r($telegram_text, 1). "\n", FILE_APPEND);
    $url = $bot_url."sendMessage?chat_id=".$channel_id."&text=".urlencode($telegram_text);
    $answer = file_get_contents($url);
    $answer = json_decode($answer);
    // file_put_contents('file3.txt', print_r(($answer->{'result'}), 1). "\n", FILE_APPEND);
    if ($answer->{'ok'}) {
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
    
echo json_encode($response); 

?>
