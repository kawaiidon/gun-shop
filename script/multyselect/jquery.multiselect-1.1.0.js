/*
	Author: Syed Murtaza Hussain Kazmi
	Creation Date: 18-12-2009
	Company: Dynamic Online Systems
	
	The purpose of this plugin is to make the custom multi-select. It picks the multi-select and makes a div based custom multi select.
*/
(function($) {
    $.fn.extend({
        multiselect: function(settings){
		/*Default settings for the multi-select*/	
		var defaults = {  
			/*These are for the left panel options which have been selected or unselected*/
			innerContainer			: 'div',				/*Set it if you wanna change the inner option container default is div and otherwise li in the case of main container is ul*/
			ContainerHeight			: '56px',
			clsListContainer		: 'clsListContainer',  
			clsSelectedOption		: 'clsSelectedOption',  
			clsUnSelectedOption		: 'clsUnSelectedOption',
			is2RemoveSelected		: false,				/*Set it if you wanna delete the selected value from left Container*/
			
			/*These are for the rigth panel options which have been selected*/
			clsSelectedValue		: 'clsSelectedValue',  
			clsOnMouseOver			: 'clsOnMouseOver',
			clsOnMouseOut			: 'clsOnMouseOut',
			is2ShowSelected			: true,
			selContainerID			: 'multiSelectedBox',			/*Id of the selected value Container*/
			jScrollPane				: undefined					   /*Provide the Jscroll initiation function as a string along with parameters. For using this, JScroll pane file must be included before this file*/
		};  
		
		var options = $.extend(defaults, settings);  
		/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/	
		return this.each(
						function() 
						{
							var objSelCont		=	null;
							
							/*This is the actual multi select box which will be converted to the custom multi select and will be removed from the page at the end.*/
							var objMultiSelect = $(this);
							// Make sure the source is a multiple select box
							
							if($(objMultiSelect).attr("multiple"))
							{
								 /*Get the id and name of the multi select*/
								var ID			=	objMultiSelect.attr("id");
								var NAME		=	objMultiSelect.attr("name");
								

								// Make the object of the box where the selected values will be shown
								if(options.is2ShowSelected)
								{
									// Make the object of the box where the selected values will be shown
									if(options.selContainerID == null || options.selContainerID == '' || options.selContainerID == undefined || options.selContainerID == 'undefined')
									{
										//Append a new box right after the main source
										objMultiSelect.after('<div id="multiSelectedBox"></div>');
										
										objSelCont	=	$("#multiSelectedBox").attr("id" , ID.replace(/_/ig, '-') + "_multiSelectedBox");
									}
									else
										objSelCont	=	$("#" + options.selContainerID).attr("id" , ID.replace(/_/ig, '-') + "_" + options.selContainerID);
								}
								
								/*Make sure the id and name are not empty*/
								(typeof ID != 'undefined' || ID != "" ) ? ID = ID :  ID = 'multiSelect';
								(typeof NAME != 'undefined' || NAME != "" ) ? NAME = NAME :  NAME = 'multiSelect';

								/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
								/*Hide the multi select*/
								objMultiSelect.hide();
								 
								 /*Add a new container right after the multi select*/
								 var txtContainer	=	'<div id="'+ ID +'_main" class="'+ options.clsListContainer +'" style="height:'+ options.ContainerHeight +';"></div>';
								 objMultiSelect.after(
														 txtContainer
													  );
								 
								 /*Get the object of the newly created div*/
								 var objNewContainer	=	$("#" + ID +"_main");
								 
								/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
								/*
									This code snippet is used to make divs using the multiselect box on the html page, It also marks them selected if there are any selected 
									options present.
									inputs: None
									
									Output:	Adds a div container right after the multi-select
								*/
								/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
								var txtOptions	=	null;
								var txtCSS		=	options.clsUnSelectedOption;
								var hiddenbox	=	null;
								
								objMultiSelect.find("option")
								.each
								(
								 function( intIndex )
								 {
									var txtOptionVal	=	$(this).val();
									
									/*if value is empty, use the text as value*/
									(txtOptionVal)? txtOptionVal = txtOptionVal : txtOptionVal = $(this).text();
									/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
									
									/*Check if there is any selected  */
									if($(this).attr("selected"))
									{
										if(!options.is2RemoveSelected)
											txtCSS 		=	options.clsSelectedOption;
										
										//hiddenbox	=	'<input type="hidden" value="' + txtOptionVal + '" name="' +  ID + '[]" id="' +  ID + '_hid_' + intIndex + '" />';
									
										if(options.is2ShowSelected)
											displaySelected(objSelCont, $(this).text(), intIndex, txtOptionVal);
									
									}/*Closing of if($(this).attr("selected"))*/
									else
									{
										txtCSS 		= 	options.clsUnSelectedOption;
									}/*Closing of else*/
									/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
									//txtOptions = '<'+ options.innerContainer +' id="'+ ID +'_'+ intIndex +'" class="'+ txtCSS +'">'+ $(this).text() + hiddenbox  +'</'+ options.innerContainer +'>';	
									txtOptions = '<'+ options.innerContainer +' id="'+ ID +'_'+ intIndex +'" class="'+ txtCSS +'">'+ $(this).text() +'</'+ options.innerContainer +'>';	
									 
									// Append newly created option to the container
									objNewContainer.append(txtOptions);

									//Hide the node if that is already selected and remove selected value is set.
									if(options.is2RemoveSelected && $(this).attr("selected"))
										$("#" + ID +'_'+ intIndex).hide();
										
									/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
									var objOption	=	$( "#"+ ID + "_"+ intIndex);

									 /*Bind the click event with options*/
									objOption
									.bind("click", 
										  function(){
												if ( objOption.hasClass(options.clsUnSelectedOption) && !objOption.hasClass(options.clsSelectedOption) )
												{
													/* Append a hidden field with the selected Value		*/
													//objOption.append('<input type="hidden" value="' + txtOptionVal + '" name="' +  ID + '[]" id="' +  ID + '_hid_' + intIndex + '" />');
																	
													//mark the value as Selected to the source.
													if($("#" + ID + ' option' ).eq(intIndex).attr('value') && $("#" + ID + ' option' ).eq(intIndex).attr('value') != null)
														$("#" + ID + " option[value='"+ txtOptionVal +"']").attr("selected", "selected");
													else
														$("#" + ID + " option[text='"+ txtOptionVal +"']").attr("selected", "selected");														
													/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
													if(options.is2RemoveSelected)
														objOption.hide();
													else
														objOption.removeClass(options.clsUnSelectedOption).addClass(options.clsSelectedOption);
													/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
													//If  Selected Box is to be displayed
													if(options.is2ShowSelected)
													{
														displaySelected(objSelCont, objOption.text(), intIndex, txtOptionVal);
													}// Closing of if(is2ShowSelBox)
													/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
													
											  }/* Closing of   if ( $(this).hasClass(options.clsUnSelectedOption) && !$(this).hasClass(options.clsSelectedOption) )	 */
											  else if ( objOption.hasClass(options.clsSelectedOption) )
											  {	
												// Remove Selected Value to an Array
												removeSelected(ID.replace(/_/ig, '-') + "_sel_"+ intIndex, txtOptionVal);
												objOption.removeClass(options.clsSelectedOption).addClass(options.clsUnSelectedOption);
											  }		
											/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
											/*Call Jscroll pane if that is set*/
											/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
											  makeJScrollPane();
											  			
											  return false;
											 /*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
										  }/*Closing of function()*/
										);

									/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
								 }/*Closing of  function( intIndex )*/
								);	 
							}/*Closing of if($(objMultiSelect).attr("multiple"))*/

							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							/*Finally Remove the multi select*/
							//objMultiSelect.remove();
							objMultiSelect.hide();	

						});/*Closing of this.each*/
		
						/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
						/*
							Just to display the selected values .
							Inputs: 1: Selected options Container object
									2: Selected option text
									3: Selected Index
									4: Selected opiton value as string
							Output:  Selected values wrapped in div 
						*/	
						function displaySelected(objSelBox, txtSelText, intIndex, txtOptionVal)
						{
							var aryIds	=	objSelBox.attr("id").split("_");
							var selId	=	aryIds[0] + "_sel_"+ intIndex;
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							objSelBox.append(
												"<"+ options.innerContainer +" class=\""+ options.clsSelectedValue +"\" id=\""+ selId  + "\">"+ txtSelText +"</"+ options.innerContainer +">"
											);
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							/* Attach Click Event with Selected Link*/
							$("#" + selId).click
										(	
											function()
											{
												removeSelected(selId, txtOptionVal);
												makeJScrollPane();
											}
										);
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							$("#" + selId).hover(
													function()
													{
														$(this).removeClass(options.clsOnMouseOut);
														$(this).addClass(options.clsOnMouseOver);
													},
													
													function()
													{
														$(this).removeClass(options.clsOnMouseOver);
														$(this).addClass(options.clsOnMouseOut);
													}
												);	
						}/* Closing of function displaySelected(...) */

						/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
						/*
							Remove the selected value if any
							Inputs: 1: Selected option as string
									2: Selected opiton value as string
							Output: Nothing, It just removes the selected value from the array of values.
						*/
						function removeSelected(selectedOption, txtOptionVal)
						{
							var arrayVal	=	selectedOption.split("_");
							var mainBoxId	=	'';
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							//make sure the underscore with in the original id has not been replaced, if yes,
							// Replace that again with underScore.
							
							if(arrayVal[0].indexOf("-") != -1)
								mainBoxId	=	arrayVal[0].replace(/-/, '_');
							else
								mainBoxId	=	arrayVal[0];
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							//Remove the value as Selected to the source.
							if($("#"+ mainBoxId).val() != '')
								$("#"+ mainBoxId + " option[value='"+ txtOptionVal +"']").removeAttr("selected");
							else
								$("#"+ mainBoxId + " option[text='"+ txtOptionVal +"']").removeAttr("selected");
							
							if(options.is2RemoveSelected)
								$("#"+ mainBoxId + "_" + arrayVal[2] ).show();
							else
								$("#"+ mainBoxId + "_" + arrayVal[2] ).removeClass(options.clsSelectedOption).addClass(options.clsUnSelectedOption);
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							// Also remove from selected box
							if(options.is2ShowSelected)
								$("#" + selectedOption).remove();
						}/* Closing of function removeSelected(...) */
						
						/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
						/*
							make JScrol Pane
							Inputs:none
							Output: makes Scroll Pane.
						*/
						function makeJScrollPane()
						{
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							/*Call Jscroll pane if that is set*/
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							if(typeof options.jScrollPane != "undefined")
							{
								 eval(options.jScrollPane);
							}/*Closing of if(typeof jScrollPane != "undefined") */

						}/* Closing of function makeJScrollPane(...) */						
	
        }/*Closing of multiselect: function() */

    });
	$.fn.extend({
        singleselect: function(settings){
		/*Default settings for the multi-select*/	
		var defaults = {  
			/*These are for the left panel options which have been selected or unselected*/
			innerContainer			: 'div',				/*Set it if you wanna change the inner option container default is div and otherwise li in the case of main container is ul*/
			ContainerHeight			: '56px',
			clsListContainer		: 'clsListContainer',  
			clsSelectedOption		: 'clsSelectedOption',  
			clsUnSelectedOption		: 'clsUnSelectedOption',
			is2RemoveSelected		: false,				/*Set it if you wanna delete the selected value from left Container*/
			
			/*These are for the rigth panel options which have been selected*/
			clsSelectedValue		: 'clsSelectedValue',  
			clsOnMouseOver			: 'clsOnMouseOver',
			clsOnMouseOut			: 'clsOnMouseOut',
			is2ShowSelected			: true,
			selContainerID			: 'multiSelectedBox',			/*Id of the selected value Container*/
			jScrollPane				: undefined					   /*Provide the Jscroll initiation function as a string along with parameters. For using this, JScroll pane file must be included before this file*/
		};  
		
		var options = $.extend(defaults, settings);  
		/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/	
		return this.each(
						function() 
						{
							var objSelCont		=	null;
							
							/*This is the actual multi select box which will be converted to the custom multi select and will be removed from the page at the end.*/
							var objMultiSelect = $(this);
							// Make sure the source is a multiple select box
							
							if($(objMultiSelect).attr("multiple"))
							{
								 /*Get the id and name of the multi select*/
								var ID			=	objMultiSelect.attr("id");
								var NAME		=	objMultiSelect.attr("name");
								

								// Make the object of the box where the selected values will be shown
								if(options.is2ShowSelected)
								{
									// Make the object of the box where the selected values will be shown
									if(options.selContainerID == null || options.selContainerID == '' || options.selContainerID == undefined || options.selContainerID == 'undefined')
									{
										//Append a new box right after the main source
										objMultiSelect.after('<div id="multiSelectedBox"></div>');
										
										objSelCont	=	$("#multiSelectedBox").attr("id" , ID.replace(/_/ig, '-') + "_multiSelectedBox");
									}
									else
										objSelCont	=	$("#" + options.selContainerID).attr("id" , ID.replace(/_/ig, '-') + "_" + options.selContainerID);
								}
								
								/*Make sure the id and name are not empty*/
								(typeof ID != 'undefined' || ID != "" ) ? ID = ID :  ID = 'multiSelect';
								(typeof NAME != 'undefined' || NAME != "" ) ? NAME = NAME :  NAME = 'multiSelect';

								/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
								/*Hide the multi select*/
								objMultiSelect.hide();
								 
								 /*Add a new container right after the multi select*/
								 var txtContainer	=	'<div id="'+ ID +'_main" class="'+ options.clsListContainer +'" style="height:'+ options.ContainerHeight +';"></div>';
								 objMultiSelect.after(
														 txtContainer
													  );
								 
								 /*Get the object of the newly created div*/
								 var objNewContainer	=	$("#" + ID +"_main");
								 
								/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
								/*
									This code snippet is used to make divs using the multiselect box on the html page, It also marks them selected if there are any selected 
									options present.
									inputs: None
									
									Output:	Adds a div container right after the multi-select
								*/
								/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
								var txtOptions	=	null;
								var txtCSS		=	options.clsUnSelectedOption;
								var hiddenbox	=	null;
								
								objMultiSelect.find("option")
								.each
								(
								 function( intIndex )
								 {
									var txtOptionVal	=	$(this).val();
									
									/*if value is empty, use the text as value*/
									(txtOptionVal)? txtOptionVal = txtOptionVal : txtOptionVal = $(this).text();
									/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
									
									/*Check if there is any selected  */
									if($(this).attr("selected"))
									{
										if(!options.is2RemoveSelected)
											txtCSS 		=	options.clsSelectedOption;
										
										//hiddenbox	=	'<input type="hidden" value="' + txtOptionVal + '" name="' +  ID + '[]" id="' +  ID + '_hid_' + intIndex + '" />';
									
										if(options.is2ShowSelected)
											displaySelected(objSelCont, $(this).text(), intIndex, txtOptionVal);
									
									}/*Closing of if($(this).attr("selected"))*/
									else
									{
										txtCSS 		= 	options.clsUnSelectedOption;
									}/*Closing of else*/
									/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
									//txtOptions = '<'+ options.innerContainer +' id="'+ ID +'_'+ intIndex +'" class="'+ txtCSS +'">'+ $(this).text() + hiddenbox  +'</'+ options.innerContainer +'>';	
									txtOptions = '<'+ options.innerContainer +' id="'+ ID +'_'+ intIndex +'" class="'+ txtCSS +'">'+ $(this).text() +'</'+ options.innerContainer +'>';	
									 
									// Append newly created option to the container
									objNewContainer.append(txtOptions);

									//Hide the node if that is already selected and remove selected value is set.
									if(options.is2RemoveSelected && $(this).attr("selected"))
										$("#" + ID +'_'+ intIndex).hide();
										
									/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
									var objOption	=	$( "#"+ ID + "_"+ intIndex);

									 /*Bind the click event with options*/
									objOption
									.bind("click", 
										  function(){
												if ( objOption.hasClass(options.clsUnSelectedOption) && !objOption.hasClass(options.clsSelectedOption) )
												{
													/* Append a hidden field with the selected Value		*/
													//objOption.append('<input type="hidden" value="' + txtOptionVal + '" name="' +  ID + '[]" id="' +  ID + '_hid_' + intIndex + '" />');
																	
													//mark the value as Selected to the source.
													if($("#" + ID + ' option' ).eq(intIndex).attr('value') && $("#" + ID + ' option' ).eq(intIndex).attr('value') != null)
														$("#" + ID + " option[value='"+ txtOptionVal +"']").attr("selected", "selected");
													else
														$("#" + ID + " option[text='"+ txtOptionVal +"']").attr("selected", "selected");														
													/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
													if(options.is2RemoveSelected)
														objOption.hide();
													else
														objOption.removeClass(options.clsUnSelectedOption).addClass(options.clsSelectedOption);
													/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
													//If  Selected Box is to be displayed
													if(options.is2ShowSelected)
													{
														displaySelected(objSelCont, objOption.text(), intIndex, txtOptionVal);
													}// Closing of if(is2ShowSelBox)
													/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
													
											  }/* Closing of   if ( $(this).hasClass(options.clsUnSelectedOption) && !$(this).hasClass(options.clsSelectedOption) )	 */
											  else if ( objOption.hasClass(options.clsSelectedOption) )
											  {	
												// Remove Selected Value to an Array
												removeSelected(ID.replace(/_/ig, '-') + "_sel_"+ intIndex, txtOptionVal);
												objOption.removeClass(options.clsSelectedOption).addClass(options.clsUnSelectedOption);
											  }		
											/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
											/*Call Jscroll pane if that is set*/
											/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
											  makeJScrollPane();
											  			
											  return false;
											 /*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
										  }/*Closing of function()*/
										);

									/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
								 }/*Closing of  function( intIndex )*/
								);	 
							}/*Closing of if($(objMultiSelect).attr("multiple"))*/

							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							/*Finally Remove the multi select*/
							//objMultiSelect.remove();
							objMultiSelect.hide();	

						});/*Closing of this.each*/
		
						/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
						/*
							Just to display the selected values .
							Inputs: 1: Selected options Container object
									2: Selected option text
									3: Selected Index
									4: Selected opiton value as string
							Output:  Selected values wrapped in div 
						*/	
						function displaySelected(objSelBox, txtSelText, intIndex, txtOptionVal)
						{
							var aryIds	=	objSelBox.attr("id").split("_");
							var selId	=	aryIds[0] + "_sel_"+ intIndex;
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							objSelBox.append(
												"<"+ options.innerContainer +" class=\""+ options.clsSelectedValue +"\" id=\""+ selId  + "\">"+ txtSelText +"</"+ options.innerContainer +">"
											);
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							/* Attach Click Event with Selected Link*/
							$("#" + selId).click
										(	
											function()
											{
												removeSelected(selId, txtOptionVal);
												makeJScrollPane();
											}
										);
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							$("#" + selId).hover(
													function()
													{
														$(this).removeClass(options.clsOnMouseOut);
														$(this).addClass(options.clsOnMouseOver);
													},
													
													function()
													{
														$(this).removeClass(options.clsOnMouseOver);
														$(this).addClass(options.clsOnMouseOut);
													}
												);	
						}/* Closing of function displaySelected(...) */

						/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
						/*
							Remove the selected value if any
							Inputs: 1: Selected option as string
									2: Selected opiton value as string
							Output: Nothing, It just removes the selected value from the array of values.
						*/
						function removeSelected(selectedOption, txtOptionVal)
						{
							var arrayVal	=	selectedOption.split("_");
							var mainBoxId	=	'';
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							//make sure the underscore with in the original id has not been replaced, if yes,
							// Replace that again with underScore.
							
							if(arrayVal[0].indexOf("-") != -1)
								mainBoxId	=	arrayVal[0].replace(/-/, '_');
							else
								mainBoxId	=	arrayVal[0];
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							//Remove the value as Selected to the source.
							if($("#"+ mainBoxId).val() != '')
								$("#"+ mainBoxId + " option[value='"+ txtOptionVal +"']").removeAttr("selected");
							else
								$("#"+ mainBoxId + " option[text='"+ txtOptionVal +"']").removeAttr("selected");
							
							if(options.is2RemoveSelected)
								$("#"+ mainBoxId + "_" + arrayVal[2] ).show();
							else
								$("#"+ mainBoxId + "_" + arrayVal[2] ).removeClass(options.clsSelectedOption).addClass(options.clsUnSelectedOption);
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							// Also remove from selected box
							if(options.is2ShowSelected)
								$("#" + selectedOption).remove();
						}/* Closing of function removeSelected(...) */
						
						/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
						/*
							make JScrol Pane
							Inputs:none
							Output: makes Scroll Pane.
						*/
						function makeJScrollPane()
						{
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							/*Call Jscroll pane if that is set*/
							/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
							if(typeof options.jScrollPane != "undefined")
							{
								 eval(options.jScrollPane);
							}/*Closing of if(typeof jScrollPane != "undefined") */

						}/* Closing of function makeJScrollPane(...) */						
	
        }/*Closing of multiselect: function() */

    });
})(jQuery);
