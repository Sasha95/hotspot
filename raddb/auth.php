<?php
	ini_set('display_errors', 0);
	ini_set('display_startup_errors', 0);
	error_reporting(E_ALL);
	//
	if (!isset($argv[1]) || !isset($argv[2]) || !isset($argv[3]) || !isset($argv[4]))
		exit();
    $type = trim($argv[1]);
    $callingStationID = trim($argv[2]);
	$username = trim($argv[3]);
	$password = trim($argv[4]);
	//
	try {
		$mysqli = new mysqli("mysql", "radius", "123", "radius");
		if (!$mysqli || mysqli_connect_errno()) {
			throw new Exception('Unable to connect!');
			exit();
		}
	} catch(Exception $e) {
		echo $e->getMessage();
		exit();
	}
	$mysqli->set_charset("UTF8");
	//
	if (!empty($callingStationID) && filter_var($callingStationID, FILTER_VALIDATE_MAC) && $callingStationID == $username && $callingStationID == $password) {
		$result = $mysqli->query("
			SELECT
				TIME_TO_SEC(TIMEDIFF(`expiration_date`, CURRENT_TIMESTAMP())) `session_timeout`
			FROM
				`hotspot_users`
			WHERE
				`mac` LIKE '%$callingStationID%'
				AND CURRENT_TIMESTAMP() >= `start_date`
				AND CURRENT_TIMESTAMP() < `expiration_date`
		");
		if ($result) {
			if ($result->num_rows > 0) {
				$row = $result->fetch_assoc();
				$sessionTimeout = 0;
				if (isset($row['session_timeout']) && $row['session_timeout'] >= 0)
					$sessionTimeout = $row['session_timeout'];
				$sessionTimeout += 60;
				if ($type == "check")
					echo 'Accept';
				else if ($type == "reply")
					echo "Session-Timeout := $sessionTimeout,";
				exit();
			}
		}
	}
	//
	if ($type == "check")
		echo 'Reject';
?>