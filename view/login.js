

    const imageprofile = document.getElementById("imageProfile");
    const inputFile = document.getElementById("input-file")

    inputFile.onchange = ()=>{
    imageprofile.src = URL.createObjectURL(inputFile.files[0])
    }

    console.log(inputFile);

    // const uploadprofileImage = ()=>{
    //     const fromData = new FormData()
    //     fromData.append('profileImage', inputFile)

    //     fetch('/upload', {
    //         method: 'POST',
    //         body: fromData
    //     })
    //     .then(response => response.json())
    //     .then(data =>{
    //         if(data.success){

    //         }else{

    //         }
    //     })
    //     .catch(error => console.error('Error', error));
    // }