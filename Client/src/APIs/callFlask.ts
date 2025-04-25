export async function callFlask(url: String){
    const response = await fetch('http://localhost:5000/predict',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    })
    const data = await response.json();
    // console.log(data)
    return data;
}