// called as soon as the Dom content is loaded
document.addEventListener("DOMContentLoaded",()=>{
    const inputImage=document.getElementById("gettingFile");
    const uiImage=document.getElementById("imagePreview");
    const userHeight=document.getElementById("customHeight");
    const userWidth=document.getElementById("customWidth");
    const sliderValue=document.getElementById("qualityValue");
    const sliderBar=document.getElementById("qualityBar");
    const makeChangeButton=document.getElementById("makeChangeButton");
    const downloadButton=document.getElementById("downloadButton");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // we will store uploaded image in this variable
    let originalImage=new Image();

    // triggers when new file is uploaded
    inputImage.addEventListener("change",()=>{
        // first uploaded image is targeted
        let uploadedFile=inputImage.files[0];

        if(uploadedFile){
            // reading the image as Base64 string
            let reader=new FileReader();
            reader.readAsDataURL(uploadedFile);

            // when image is readed->we update the preview
            reader.addEventListener("load",()=>{
                originalImage.src=reader.result;
                uiImage.src=reader.result;
            })
        }
    })

    // updating the value of quality
    sliderBar.addEventListener("input",()=> {
        sliderValue.textContent = sliderBar.value;
    });

    // when change button is clicked
    makeChangeButton.addEventListener("click",()=>{
        if(!originalImage.src) 
        {
            alert("Please Upload an Image first");
            return;
        }

        let newHeight = isNaN(parseInt(userHeight.value)) ? originalImage.height : parseInt(userHeight.value);
        let newWidth = isNaN(parseInt(userWidth.value)) ? originalImage.width : parseInt(userWidth.value);

        let quality=parseFloat(sliderBar.value)/100;

        // canvas operations
        canvas.height=newHeight;
        canvas.width=newWidth;
        ctx.drawImage(originalImage,0,0,newWidth,newHeight);
        // update image on preview  
        uiImage.src = canvas.toDataURL("image/jpeg", quality);
    })    

    // when download button is clicked
    downloadButton.addEventListener("click", function () {
        if (!originalImage.src) {
            alert("Please upload and modify an image first!");
            return;
        }
        if (canvas.width === 0 || canvas.height === 0) {
            alert("Please resize the image before downloading.");
            return;
        }

        let link = document.createElement("a"); // Creating a temporary link element
        link.href = canvas.toDataURL("image/jpeg", sliderBar.value / 100); // Get the image data
        link.download = "resized_image.jpg"; // Set the file name
        link.click(); // Simulate a click to trigger the download
    });
})