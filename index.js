// let link="https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=IN&key=[YOUR_API_KEY]";

const API_KEY="AIzaSyCUaXgo61OkAOXV_Z3948D_kLvKjy7zUD0";
//feaching data (trending videos) on lode  
let getDataOnLode= async () =>{
    let url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=IN&key=${API_KEY}`;
    
    let res=await fetch(url);
    let data= await res.json();
    console.log(data.items);
    append(data.items);
    localStorage.setItem("videos", JSON.stringify(data.items));
    
}

function showData(data)
{
    getDataOnLode()
}


//for searching

let search= async() =>{
    let query= document.getElementById("query").value;
    let data= await getData(query);
    q=query;
    append(data);
    localStorage.setItem("videos", JSON.stringify(data));
}

let getData= async (query) =>{
    let url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${API_KEY}`;
    
    let res=await fetch(url);
    let data= await res.json();
    //console.log(data);
    return(data.items);
    
}

let append = (data) => {
    document.querySelector("#container").innerHTML="";
    data.forEach((el)=>{
        //snippet --> title
        //snippet--> thumbnails--> medium --->url

        let img=document.createElement("img");
        img.src = el.snippet.thumbnails.medium.url;

        let h3=document.createElement("h3");
        h3.innerText = el.snippet.title;

        let div=document.createElement("div");
        div.onclick= () => {
            saveVideo(el);
        };
        div.setAttribute("class", "video");
        div.append(img,h3);

        document.querySelector("#container").append(div);
    });
}
let saveVideo=(data)=>
{
    localStorage.setItem("video", JSON.stringify(data));
    window.location.href = "video.html";
}
