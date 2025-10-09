<?php
/**
 * Contact Form Email Handler
 * Thahab Capital Real Estate Development
 */

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set response header
header('Content-Type: application/json; charset=utf-8');

// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Please use POST request.'
    ]);
    exit;
}

// Sanitize and validate input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Get form data
$name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'الاسم مطلوب';
}

if (empty($email)) {
    $errors[] = 'البريد الإلكتروني مطلوب';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'البريد الإلكتروني غير صحيح';
}

if (empty($message)) {
    $errors[] = 'الرسالة مطلوبة';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'خطأ في التحقق من البيانات',
        'errors' => $errors
    ]);
    exit;
}

// Email configuration
$to = 'info@thahab.sa'; // Main recipient email
$subject = 'رسالة جديدة من موقع ذهب كابيتال - ' . $name;

// Email content
$email_body = "
<html dir='rtl' lang='ar'>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background-color: #c9a227; color: white; padding: 20px; text-align: center; }
        .content { background-color: white; padding: 30px; margin-top: 20px; border-radius: 5px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #333; }
        .value { color: #666; margin-top: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>رسالة جديدة من موقع ذهب كابيتال</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>الاسم:</div>
                <div class='value'>" . $name . "</div>
            </div>
            <div class='field'>
                <div class='label'>البريد الإلكتروني:</div>
                <div class='value'>" . $email . "</div>
            </div>
            " . (!empty($phone) ? "
            <div class='field'>
                <div class='label'>رقم الجوال:</div>
                <div class='value'>" . $phone . "</div>
            </div>
            " : "") . "
            <div class='field'>
                <div class='label'>الرسالة:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>تم الإرسال من موقع ذهب كابيتال للتطوير العقاري</p>
            <p>www.thahab.sa | info@thahab.sa | +966 0112250555</p>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: نموذج الموقع <noreply@thahab.sa>" . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

// Send email
$mail_sent = mail($to, $subject, $email_body, $headers);

if ($mail_sent) {
    // Success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
    ]);

    // Optional: Log successful submission
    $log_file = __DIR__ . '/contact_log.txt';
    $log_entry = date('Y-m-d H:i:s') . " - Name: $name, Email: $email, Phone: $phone\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND);

} else {
    // Error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'عذراً، حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.'
    ]);
}
?>
