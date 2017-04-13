window.onload=function(){
	waterfall('main','box');
	//网页加载
	window.onscroll=function(){
		var oParent=document.getElementById('main');
		var boxArr=getByClass(oParent,'box');
		var dataArr={'data':
			 [
			 	{'src': '20.jpg'},
			 	{'src': '21.jpg'},
				{'src': '22.jpg'},
				{'src': '23.jpg'},
				{'src': '24.jpg'},
				{'src': '25.jpg'},
				{'src': '26.jpg'},
				{'src': '27.jpg'},
				{'src': '28.jpg'},
				{'src': '29.jpg'},
				{'src': '30.jpg'},
				{'src': '31.jpg'},
				{'src': '32.jpg'}
			]
		};
			
		/*或者for(var i=0;i<dataArr.data.length;i++){}*/
		function showImg(){
			for(var i in dataArr.data){
				//最后一个盒子距离顶部的距离+盒子一半的高度
				
				if(getHeight(boxArr)){
					//将json组数内的东西导入网页
				/*	var oBox=document.createElement('div');
					oBox.className='box';
					oParent.appendChild(oBox);
					var oPic=document.createElement('div');
					oPic.className='pic';
					oBox.appendChild(oPic);
					var oImg=document.createElement('img');
					oImg.src="images/"+dataArr.data[i].src;
					oPic.appendChild(oImg);*/
					//减少dom的使用次数，使得网页更快加载
					var oImg=document.createElement('div');
					oImg.innerHTML="<div class='pic'><img src='images/"+dataArr.data[i].src+"'"+"/></div>";
					oImg.className="box";
					oParent.appendChild(oImg);

				}

			}
		}	
		if(boxArr.length<1){showImg()};
		waterfall('main','box');
	}
}
function waterfall(parent,box){
	/*将main下所有class为box的元素取出来*/
	var oParent=document.getElementById(parent);
	var aBoxArr=getByClass(oParent,box);
	/*console.log(aBoxArr.length);*/
	/*设置图片的列数*/
	var boxWidth=aBoxArr[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/boxWidth);
	/*console.log(cols);*/
	/*设置main的宽*/
	oParent.style.cssText='margin: 0 auto;height: auto;width:'+cols*boxWidth+'px';
	
	var colsArr=[];
	for(var i=0;i<aBoxArr.length;i++){
		if(i<cols){
			/*获取第一列的盒子的高度数组*/
			colsArr.push(aBoxArr[i].offsetHeight);
		}
		else{
			/*获取第一列高度最小的盒子的高度*/
			var minH=Math.min.apply(null,colsArr);
			/*console.log(minHeightBox);*/
			//将第七个盒子定位在这个高度最小的盒子下方
			//获取高度最小盒子的index
			var minIndex=getMinIndex(colsArr,minH);
			/*console.log(minIndex);*/
			//定位剩下的盒子
			aBoxArr[i].style.position='absolute';
			aBoxArr[i].style.top=minH+'px';
			//也可以offsetLeft
			aBoxArr[i].style.left=boxWidth*minIndex+'px';
			/*console.log(boxWidth);*/
			colsArr[minIndex]+=aBoxArr[i].offsetHeight;
		}
		
	}
	/*console.log(colsArr);*/
	
	
}
/*通过class来获取数组*/
function getByClass(parent,val){
	var boxArr=new Array();
	var aBox=parent.getElementsByTagName('*');
	for(var i=0;i<aBox.length;i++){
		if(aBox[i].className==val){
			boxArr.push(aBox[i]);
		}
	}
	return boxArr;
}
/*获取第一列高度最小的盒子的当前位置*/
function getMinIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
/**/
function getHeight(boxArr){
	var indexH=boxArr.length-1;
	//防止像素有余数，所以取整
	var lastH=boxArr[indexH].offsetTop+Math.floor(boxArr[indexH].offsetHeight/2);
	/*console.log(lastH);*/	
	//滚动距离+可视化窗口的高度
		//混合模式和标准模式
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;	
	var clientHeight=document.body.clientHeight||document.documentElement.clientHeight;	
	if(scrollTop+clientHeight>lastH){
		return true;
	}	
}