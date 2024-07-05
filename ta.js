let t=0;
let c=[];
function val(event) {
    event.preventDefault();
    let a = document.getElementById("cat").value;
    let b = document.getElementById("sp").value;
    let errorMessage = document.getElementsByTagName("h5")[0];
    if (a.length != 0 && b.length != 0) {
        t = t + Number(b);
        errorMessage.innerHTML = "";
        const node = document.createElement("tr");
        c++;
        node.setAttribute("id", c);
        const chnode0 = document.createElement("td");
        const chb = document.createElement("input");
        chb.setAttribute("id", c);
        chb.setAttribute("class", "cb");
        chb.setAttribute("type", "checkbox");
        chnode0.appendChild(chb);
        node.appendChild(chnode0);
        chb.addEventListener("click", Uncheck);
        const chnode1 = document.createElement("td");
        let l = document.getElementsByTagName("tr").length;
        let len = document.createTextNode(l);
        chnode1.appendChild(len);
        node.appendChild(chnode1);
        const chnode2 = document.createElement("td");
        let textA = document.createTextNode(a);
        chnode2.setAttribute("id", "categ");
        chnode1.setAttribute("id", "sn");
        let imgSrc = "";
        if (a === "Food") {
            imgSrc = "../images/food.svg";
        } else if (a === "Transport") {
            imgSrc = "../images/transport.svg";
        } else if (a === "Party") {
            imgSrc = "../images/party.svg";
        } else if (a === "Groceries") {
            imgSrc = "../images/groceries.svg";
        } else if (a === "Clothing") {
            imgSrc = "../images/clothing.svg";
        } else if (a === "Bills") {
            imgSrc = "../images/bills.svg";
        } else if (a === "Health care") {
            imgSrc = "../images/healthcare.svg";
        } else if (a === "Entertainment") {
            imgSrc = "../images/entertainment.svg";
        }
        if (imgSrc !== "") {
            let categoryImg = document.createElement("img");
            categoryImg.setAttribute("src", imgSrc);
            categoryImg.setAttribute("width", "15px");
            chnode2.appendChild(categoryImg);
            chnode2.innerHTML += "&nbsp;&nbsp;&nbsp;";
        }
        chnode2.appendChild(textA);
        node.appendChild(chnode2);
        const chnode3 = document.createElement("td");
        chnode3.setAttribute("id", "spent");
        chnode3.setAttribute("class", b);
        let textB = document.createTextNode(b + " /-");
        chnode3.appendChild(textB);
        node.appendChild(chnode3);
        document.getElementById("mytable").appendChild(node);
        Update();
        Remve();
    }
}



function Uncheck(){
    var op=document.querySelectorAll('input[type="checkbox"]');
    for(var y=1;y<op.length;y++){
        if(op[y].checked==false){
           let mn= document.getElementById('mc');            //if anycheckbox is uncheckd main cb is uncheck
            mn.checked=false;
            break;
        }
    }
}
function Remve() {
    let dv = document.querySelectorAll('input[type="checkbox"]');
    dv.forEach(checkbox => checkbox.checked = false);
}

function del(){
    
    let er=document.querySelectorAll('input[type="checkbox"]');
    for(var i=1;i<er.length;i++){
            if(er[i].checked){
                let fin=er[i].id;                                 //remove row by fin (id)accessed 
                document.getElementById(fin).remove();
            }
        }
    
    let ud=document.querySelectorAll("td#sn");
    var inp=document.querySelectorAll('input[type="checkbox"].cb');
    for(var t=0;t<ud.length;t++){
        ud[t].innerHTML=t+1;
        let parent=ud[t].parentNode;
        parent.setAttribute("id",t+1);
        console.log(parent.setAttribute("id",t+1));                     //updating sno and sorting rows
        inp[t].setAttribute("id",t+1);
    }
    Update();
}
function Update(){
    t=0;
    let In=0;
    let debt=0;
    let tot=document.querySelectorAll("td#spent");
    for(var j=0;j<tot.length;j++){
        if(tot[j].previousElementSibling.innerHTML!="Income"){
            t+=Number(tot[j].className);
        }else{
            In+=Number(tot[j].className);
        }
        debt=In;
        if(t>0){
            debt=In-t;
        }
        
        
    }
    document.getElementById("res").innerHTML="₹ "+t+" /-";
    document.getElementById("income").innerHTML="₹ "+In+" /-";
    if(debt<0){
        document.getElementById("bal").innerHTML="- ₹ "+Math.abs(debt)+" /-";
    }else{
        document.getElementById("bal").innerHTML="₹ "+debt+" /-";
    }
}
function checkIt() {
    var mycheckbox = document.getElementById("mc");
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = mycheckbox.checked;
    });
    
}function Show() {
    var oldCanvas = document.getElementById("myChart");
    oldCanvas.parentNode.removeChild(oldCanvas);

    // Create new canvas element
    var newCanvas = document.createElement("canvas");
    newCanvas.id = "myChart";
    document.getElementById("chart").appendChild(newCanvas);

    let s = new Set();
    let obj = {"Food": 0, "Transport": 0, "Party": 0, "Groceries": 0, "Clothing": 0, "Bills": 0, "Health care": 0, "Entertainment": 0};
    let y = document.querySelectorAll("#categ");
    let x = document.querySelectorAll("#spent");

    y.forEach(function(el) {
        if(el.innerHTML!="Income"){
            s.add(el.innerHTML);
        }
        
    });

    for (var i = 0; i < x.length; i++) {
            let v = y[i].textContent.trim(); // Category (trimmed to remove leading/trailing whitespace)
        let amt = parseInt(x[i].textContent); // Spent amount; using textContent to get the text content
    
        // Check if the category already exists in obj
        if (obj.hasOwnProperty(v)) {
            obj[v] += amt; // If exists, add the spent amount to the existing total
        } else {
            obj[v] = amt; // If not exists, set the spent amount as the total
        }
        
        
    }

    const keys = Object.keys(obj);
    const values = keys.map(key => obj[key]);
//     function getRandomColor() {
//   const r = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   return `rgb(${r}, ${g}, ${b})`;
//     }
var barColors = ['rgb(125, 39, 161)', 'rgb(181, 77, 153)', 'rgb(115, 89, 180)', 'rgb(223, 110, 44)', 'rgb(121, 167, 18)', 'rgb(43, 117, 176)', 'rgb(214, 174, 94)', 'rgb(125, 39, 221)','rgb(187, 59, 34)'];
// for (let i = 0; i < keys.length; i++) {
//   barColors.push(getRandomColor());
// }
console.log(barColors);
    var ctx = newCanvas.getContext('2d');
    new Chart("myChart", {
        type: "pie",
        data: {
          labels: keys,
          datasets: [{
            backgroundColor: barColors,
            data: values
          }]
        },
        options: {
          title: {
            display: true,
            text: "Analysis"
          }
        }
      });
}
