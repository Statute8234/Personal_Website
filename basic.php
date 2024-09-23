<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set the database file name
$dbFile = 'website_database.db';
$encryptionKey = 'your_secret_encryption_key';


// handle Post request form JavaScript
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['username']) && isset($data['email']) && isset($data['password'])) {
        $newUserId = addUser($data['username'], $data['email'], $data['password']);
        if ($newUserId) {
            echo json_encode(['success' => true, 'userId' => $newUserId]);
        } else {
            echo json_encode(['success' => false, 'message' => "Failed to add user."]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input data.']);
    }
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