const key = "MsXtJuwPaJXagOZogIFjWvnSWQ2ajzXU2CwWj6FS";
const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`



export const getData = async () => {
    const response = await fetch(url, {
        method: "GET",
    });
    return await response.json();
}  