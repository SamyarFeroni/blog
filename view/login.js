    // const imageprofile = document.getElementById("imageProfile");
    const inputFile = document.getElementById("input-file")
    const btnupload = document.getElementById("btnupload")
    const token = localStorage.getItem('token')
btnupload.addEventListener('click', async () => {
    const file = inputFile.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                headers:{
                'Authorization': `Bearer ${token}`
                }, 
                body: formData
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('No file selected.');
    }
});