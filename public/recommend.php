<!DOCTYPE html>
<html lang="en">

  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="TODO">

    <title>Recommend - Discover new music like never before.</title>

    <link rel="stylesheet" href="components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="components/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="components/bootstrap-social/bootstrap-social.css">
    <link rel="stylesheet" href="components/slick-carousel/slick/slick.css">
    <link rel="stylesheet" href="stylesheets/landing-page.css">
    <link rel="stylesheet" href="stylesheets/style.css">
    
    
    <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
  </head>

<body>

<?php require_once('header.php'); ?>
<!-- Artists -->


<div class="rec_container">

    <div class="arrow_container_left"><img class="arrow" src="img/blue-previous.png"/></div>
    <div class="arrow_container_bottom_left"><img class="arrow" src="img/green-previous.png"/></div>
    
    <?php include('grid.php');?>
    
    <div class="arrow_container_right"><img class="arrow" src="img/blue-next.png"/></div>
    
</div>


<!-- Genre -->


<div class="rec_container">

	<?php include('grid.php');?>
    
    <div class="arrow_container_bottom_right"><img class="arrow" src="img/green-next.png"/></div>

</div>




<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</body>
</html>