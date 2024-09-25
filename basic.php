<?php
// php -S localhost:1234
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set the database file name and encryption key
$dbFile = 'website_database.db';
$encryptionKey = 'your_secret_encryption_key';

// Function to check login credentials
function login($username, $password) {
    $db = getDBConnection();
    $stmt = $db->prepare('SELECT * FROM users WHERE username = :username');
    $stmt->bindValue(':username', $username, SQLITE3_TEXT);
    $result = $stmt->execute();
    $user = $result->fetchArray(SQLITE3_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $db->close();
        return ['success' => true, 'message' => 'Login successful', 'userId' => $user['id']];
    } else {
        $db->close();
        return ['success' => false, 'message' => 'Invalid username or password'];
    }
}

// Function to handle password reset request
function forgotPassword($email) {
    $db = getDBConnection();
    $stmt = $db->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->bindValue(':email', $email, SQLITE3_TEXT);
    $result = $stmt->execute();
    $user = $result->fetchArray(SQLITE3_ASSOC);

    if ($user) {
        // Here, you would typically send a password reset email or generate a reset link/token
        $db->close();
        return ['success' => true, 'message' => 'Password reset link sent to your email.'];
    } else {
        $db->close();
        return ['success' => false, 'message' => 'Email not found.'];
    }
}

// Main logic to handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'login':
                if (isset($data['username']) && isset($data['password'])) {
                    $response = login($data['username'], $data['password']);
                } else {
                    $response = ['success' => false, 'message' => 'Invalid login input'];
                }
                break;

            case 'forgotPassword':
                if (isset($data['email'])) {
                    $response = forgotPassword($data['email']);
                } else {
                    $response = ['success' => false, 'message' => 'Invalid email input'];
                }
                break;

            default:
                $response = ['success' => false, 'message' => 'Invalid action'];
                break;
        }
    } else {
        $response = ['success' => false, 'message' => 'Invalid input data'];
    }

    // Output the response as JSON
    echo json_encode($response);
}

// create file
function createDB($dbFile, $encryptionKey )
{
    try {
        // Create and open the encrypted database
        $db = new SQLite3($dbFile);
        $db->exec("PRAGMA key = '$encryptionKey'");

        // Create the users table
        $db->exec("CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )");

        echo "Encrypted database created successfully with users table.\n";

        // Close the database connection
        $db->close();
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    } 
}

function getDBConnection()
{
    global $dbFile, $encryptionKey;
    $db = new SQLite3($dbFile);
    $db->exec("PRAGMA key = '$encryptionKey'");
    return $db;
}

function addUser($username, $email, $password)
{
    $db = getDBConnection();
    $stmt = $db->prepare('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)');
    $stmt->bindValue(':username', $username, SQLITE3_TEXT);
    $stmt->bindValue(':email', $email, SQLITE3_TEXT);
    $stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), SQLITE3_TEXT);
    $result = $stmt->execute();
    $lastInsertId = $db->lastInsertRowID();
    $db->close();
    return $result ? $lastInsertId : false;
}

function findUserByUsername($username)
{
    $db = getDBConnection();
    $stmt = $db->prepare('SELECT id, username, email FROM users WHERE username = :username');
    $stmt->bindValue(':username', $username, SQLITE3_TEXT);
    $result = $stmt->execute();
    $user = $result->fetchArray(SQLITE3_ASSOC);
    $db->close();
    return $user;
}

function removeUser($username)
{
    $db = getDBConnection();
    try {
        $stmt = $db->prepare('DELETE FROM users WHERE username = :username');
        $stmt->bindValue(':username', $username, SQLITE3_TEXT);
        $result = $stmt->execute();
        $changes = $db->changes();
        return $result && $changes > 0;
    } catch (Exception $e) {
        echo "Error in removing user:" . $e->getMessage() . "\n";
        return false;
    } finally {
        if ($db instanceof SQLite3) {
            $db->close();
        }
    }
}

function TestSQLDataBase () {
    try {
        $newUserId = addUser('johndoe', 'john@example.com', 'password123');
        echo $newUserId ? "User added with ID: $newUserId\n" : "Failed to add user\n";
    
        // Find a user
        $user = findUserByUsername('johndoe');
        if ($user) {
            echo "User found: " . print_r($user, true) . "\n";
        } else {
            echo "User not found\n";
        }
    
        // Remove user
        $removed = removeUser('johndoe');
        echo $removed ? "User removed successfully\n" : "Failed to remove user\n";
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

?>