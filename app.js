const find = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json()).then(data => searchResult(data.data));
}
const searchResult = (data) => {
    console.log(data);
    const searchResultDiv = document.getElementById("search-result");
    searchResultDiv.innerHTML = "";
    data.forEach(singleResult => {
        searchResultDiv.innerHTML += `
        <div class="col">
            <div class="card border-0 shadow-lg">
                <div class="d-flex justify-content-center">
                    <img src="${singleResult.image}" class="img-fluid" alt="...">
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title">Phone Name: ${singleResult.phone_name}</h5>
                    <p class="card-text">Brand: ${singleResult.brand}</p>
                </div>
                <div class="card-footer border-0 bg-white">
                    <button class ="btn btn-primary" onclick="fetchDetails('${singleResult.slug}')">Details</button>
                </div>
                </div>
            </div>
        `
    })

}
const fetchDetails = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}
const displayDetails = (data)=>{
    let others= data.others;
    const detailsDiv = document.getElementById("phone-details");
    let text = ""
    detailsDiv.innerHTML = `
    
    <div class="card border-0 shadow-lg">
                <div class="d-flex justify-content-center">
                    <img src="${data.image}" class="img-fluid" alt="...">
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title">Phone Name: ${data.name}</h5>
                    <p class="card-text">Brand: ${data.brand}</p>
                    <p class="card-text">Brand: ${data.releaseDate}</p>
                    <p class = "card-text">Storage: ${data.mainFeatures.storage}</p>
                    <p>
                        ${data.mainFeatures.sensors.map(singleSensor => singleSensor)}
                    </p>
                    <p id="ul-container">
                        ${data.mainFeatures.sensors.map(singleSensor => singleSensor)}
                    </p>
                </div>
                <div class="card-footer border-0 bg-white">
                    <button class ="btn btn-primary" onclick="fetchDetails('${data.slug}')">Details</button>
                </div>
                </div>
    `
}