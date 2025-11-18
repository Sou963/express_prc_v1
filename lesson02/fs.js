const fs=require("fs");

fs.writeFileSync("myfile.txt","My mother name is Mukta Bosu",(err)=>{
    if(err) throw err;
    console.log("file created");
});