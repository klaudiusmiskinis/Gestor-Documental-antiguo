let estructura = []

getEstructura()

async function getEstructura() {
    let response = await fetch('/estructura');
    estructura = await response.text()
    console.log(estructura)
}
