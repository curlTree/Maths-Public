//-----------Global Variables------------------
var jsonData=''; //object containing fetched data
var dataPath='';// path from html user input where data resides
var gridPane={height:$(".mainPane").height,width:$(".mainPane").width};
var formPane={height:$(".formPane").height,width:$(".formPane").width};

runFunction=function(){$(document).ready(
function fetchDataFrom(){
    dataPath=DATA_PARAMS.Srvr+'/Maths/getmathsdata/' //d3.select("input#dataPath")[0][0].value;//'./data/Maths.json';

    console.log("dataPath is",dataPath);
    // fetchDataS3();// $(document).ajaxStop(function () {})
    let myPromise=new Promise(
        function(myResolve,myReject){fetchDataLocal(myResolve,myReject);}//working portion of Promise
    )//combined with result and reject call back functions
    myPromise.then(//callback result function myResolve in the promise
        function(data){jsonData=data;console.log("Loaded..tree",jsonData);response='200';
            return getWorking(response,data);
        },//callback error function myReject in the promise
        function(msg){response='404';return getWorking(response,'');
        }
    );
});
}
runFunction();

function getWorking(resp,root)
{   
 
if(response=='200'){
    
    if (DATA_PARAMS.localRead){
        DATA_PARAMS.root=root;
    }
    else{
        root=JSON.parse(root);
        DATA_PARAMS.root=root;
        }
    }
    
else{console.log("TThenga");}

gExists=d3.select("g.mainPaneG");
if(typeof(gExists)!='undefined'){gExists.remove();}
divExists=d3.select("div.workSpace");
if(typeof(divExists)!='undefined'){divExists[0][0].innerHTML='';
    divExists[0][0].innerHTML=str_div;
}
initializeGrid();
initializeTree(root);//set up the view grids,flatten arrays and update placeholders 
testplan_get(window);
}
function processData(root){
    calcTopDownSearch(DATA_PARAMS.root);
    updateGridPanes();
    getMarkers();
    update(DATA_PARAMS.root);
    showOneLevel(DATA_PARAMS.root);
}
function update(source){
    treeLayout(source);
    updateLayout();
    var nodeJoin=updateLayoutNodes(source);//DOM
    updateLayoutLinks(source);//DOM
    centerNode(source);
    
    // resetRefFrame(source);
    return nodeJoin;
}



