<?php

	echo "<pre>";
	print_r($_POST);
	echo "</pre>";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>JQuery Multi Select Plug-in</title>
<!--	<script src="jquery-1.3.2.min.js" language="javascript"></script>
-->    
	
	<script src="jquery-1.4.2.min.js" language="javascript"></script>
	<script src="jquery.multiselect-1.1.0.js" language="javascript"></script>
    
    <script>
		$(function(){
			//Make custom multi select.
			/*Exmple to remove the selected value from the left panel*/
			/*$('#mulit').multiselect({selContainerID : 'me', is2RemoveSelected : true});*/
			
				$('#mulit_box').multiselect(
										{
											innerContainer			: 	'label',
											ContainerHeight			:	'56px',
											clsListContainer		:	'table_scroll',
											clsSelectedOption		: 	'clsSelectedOption',  
											clsUnSelectedOption		:	'clsUnSelectedOption',
											is2RemoveSelected		:	false,		/*Set it to true if you don't want to show the selected value in the left or top box*/
											
											/*These are for the rigth panel options which have been selected*/
											clsSelectedValue		:	'clsSelectedValue',  
											clsOnMouseOver			:	'clsOnMouseOver',
											clsOnMouseOut			:	'clsOnMouseOut',
											is2ShowSelected			:	true,
											selContainerID 			:	'me_hon'/*Id of the selected value Container*/ /*,
											jScrollPane				:	'$(".table_scroll").jScrollPane({scrollbarWidth: 6, scrollbarMargin:0})' */ /*Open it if you wanna apply JScroll pane*/
										}
										
										);
				
				
			
			/*Exmple: use it if you don't want to show the selected values to selected box container.*/
			/*$('#mulit').multiselect({is2ShowSelected : false});*/
			
		});
	</script>
    <style>
	
.clsListContainer, .clsSelectedContainer
{
	height:155px; 
	width:180px; 
	overflow:auto; 
	font-family:"Times New Roman", Times, serif;
	font-size:12px;
	border:#999999 thin solid;
}

.clsSelectedOption
{
	color:#000;
	background-color:#F5E6CD;
	background-image:url(images/tick.jpg);
	background-position:left;
	background-repeat:no-repeat;
	padding-left:18px;
	margin-left: 2px;
	margin-bottom:2px;
	font-weight:normal;
	cursor:pointer;
}
.clsUnSelectedOption
{
	background-color:none;
	cursor:pointer;
	margin-bottom:2px;
	color:#999;
	font-weight:normal;
	padding-left:6px;
}



.clsSelectedValue
{
	display:inline-block;
	margin-bottom:1px;
	margin-right:1px;
	padding:0 2px 1px 2px ;
	color:#000000;
	border:#CCCCDD 1px solid;
	cursor:pointer;
}
.clsOnMouseOver
{
	text-decoration:line-through;
}
.clsOnMouseOut
{
	text-decoration:none;
}
	
    .table_scroll
	{
		width:260px;
	}
    
    .keywords_panel { border:1px solid #79582d; width:260px; padding-left:5px; height: 56px;}
	.keywords_panel label.keyword, .keywords_panel label.keywordCross { width:105px; float:left; line-height:15px; margin:2px 0; background:url(images/circle.jpg) center left no-repeat; padding-left:15px; font-weight:bold;}
	.keywords_panel label.keyword { background:url(images/circle.jpg) center left no-repeat; cursor:pointer;}
	.keywords_panel label.keywordCross { background:url(images/circle_close.jpg) center left no-repeat; cursor:pointer;}

    
    </style>
</head>

<body>
<form method="post">
<div class="keywords_panel">

 <select size="1" multiple="multiple" name="mulit_box[]" id="mulit_box">
	 <option selected="selected" value="I am a test">Test Me</option>
   	 <option selected="selected"  value="I am a good guy">Okay</option>
   </select>
   <br clear="all" />

</div>
	<div class="keywords_panel">
		<div id="me_hon" class="table_scroll" style="height: 56px;">
        
        </div>
         <br clear="all" />
    </div>   
	<input type="submit" />
</form>
</body>

</html>
