document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn").addEventListener("click", sendReq);
});
sendReq = async () => {
    // let payload = [];
    // for (let i = 0; i < 5; i++) {
    //     payload.push({ id: i, message: `Payload Message: ${i}\n`});
    // }
    const response = await fetch("http://localhost:5000/read", {
        method: "POST",
        body: document.getElementById("input").value,
        // headers: {
        //     "Content-Type": "application/json"
        // }
    })
    document.getElementById("msg").textContent = response.statusText;
    document.getElementById("body").innerHTML = await response.text();
}