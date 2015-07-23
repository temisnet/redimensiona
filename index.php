<?php
error_reporting(E_ALL & ~E_NOTICE);
$site = $_GET['site'];

if ($site=="") {
    $site = 'http://www.temisnet.com.br/';
} elseif (substr($site,0,3)=="www") {
    $site = 'http://'.$site;  
} else {
    $site = 'http://www.'.$site;
}

 $ch = curl_init();
 curl_setopt ($ch, CURLOPT_URL, $site);
 curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
ob_start();
 curl_exec($ch); 
 curl_close($ch);
 $file_contents = ob_get_contents();
ob_end_clean();
       
 if (preg_match('/<title>([^<]++)/', $file_contents, $matches) == FALSE)
 $titulo = 'TemisNet Tecnologia'; // se der algum erro
       
 $titulo = $matches[1];

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <title><?php echo $titulo ?></title>
    <link rel="stylesheet" type="text/css" href="assets/base.css"> 
    <script type="text/javascript">var itemMarketplace='tf'; var verticalScrollbarEnable='1';</script>
    <script type="text/javascript" src="assets/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="assets/main.js"></script>
</head>
<body>
    <div id="temisnet-bar">
        <a href="http://www.temisnet.com.br/" id="temisnet-bar-logo">
            <img src="assets/bar_logo.png" alt="TemisNet">
        </a>		
        <ul class="temisnet-bar-responsive-dimension-list">
            <li class="temisnet-bar-responsive-dimension-list-item-desktop selected"><a href="#" title="Area de Trabalho - Pc"></a></li>
            <li class="temisnet-bar-responsive-dimension-list-item-1024x768"><a href="#" title="Tablet - Paisagem(1024x768)"></a></li>
            <li class="temisnet-bar-responsive-dimension-list-item-768x1024"><a href="#" title="Tablet - Retrato (768x1024)"></a></li>
            <li class="temisnet-bar-responsive-dimension-list-item-480x320"><a href="#" title="Mobile - Paisagem (480x320)"></a></li>
            <li class="temisnet-bar-responsive-dimension-list-item-320x480"><a href="#" title="Mobile - Retrato (320x480)"></a></li>
        </ul>
        <a href="<?php echo $site ?>" id="temisnet-bar-remove-frame" title="Retirar frame"><span>Retirar frame</span></a>
    </div>
    <div id="preview-window-wrapper">
        <iframe src="<?php echo $site ?>" id="preview-window" frameborder="0" noresize="noresize" /></iframe>
    </div>
</body>
</html>