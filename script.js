
// fetching Data

async function fetchData() {
    try{
        let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
        let data = await response.json();
        // console.log(data);
        
        return data;
    } catch(err){
        console.log("Error Fetching Data" ,err);
    };
};


async function renderCoins() {
    try{
        let coinsData = await fetchData();
        const tbody = document.querySelector(".coins");
        console.log(coinsData);
        
        tbody.innerHTML = "";
        
        coinsData ?
        coinsData.map((coinData) => {
            tbody.innerHTML += ` 
                <tr>
                    <td width="15%" style="display: flex; align-items: center; gap: 15px;"><img width="40px" src=${coinData.image} alt="logo"><span>${coinData.name}</span></td>
                    <td width="15%">${coinData.symbol.toUpperCase()}</td>
                    <td width="17.5%" >$${coinData.current_price}</td>
                    <td width="17.5%" >$${coinData.total_volume}</td>
                    <td width="17.5%"  style="color: ${coinData.price_change_percentage_24h < 1 ? "red" : "green"}">${coinData.price_change_percentage_24h}</td>
                    <td width="17.5%" >Mkt Cap: $${coinData.market_cap}</td>
                </tr>
            `;
        }) : tbody.innerHTML = "...Loading";
        
    } catch(err){
        console.log("Error rendering coins", err);
    }
}

async function sortByMktCap() {
    let coinData = await fetchData();
    
    let sortedData = coinData.sort((a, b) => a.market_cap - b.market_cap);
    const tbody = document.querySelector(".coins");
    
    tbody.innerHTML = "";
    sortedData.map((coinData) => {
        tbody.innerHTML += ` 
        <tr>
            <td width="15%" style="display: flex; align-items: center; gap: 15px;"><img width="40px" src=${coinData.image} alt="logo"><span>${coinData.name}</span></td>
            <td width="15%">${coinData.symbol.toUpperCase()}</td>
            <td width="17.5%" >$${coinData.current_price}</td>
            <td width="17.5%" >$${coinData.total_volume}</td>
            <td width="17.5%"  style="color: ${coinData.price_change_percentage_24h < 1 ? "red" : "green"}">${coinData.price_change_percentage_24h}</td>
            <td width="17.5%" >Mkt Cap: $${coinData.market_cap}</td>
        </tr>
        `;
    });
};

async function sortByPercentage() {
    let coinData = await fetchData();
    
    let sortedData = coinData.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
    const tbody = document.querySelector(".coins");
    
    tbody.innerHTML = "";
    sortedData.map((coinData) => {
        tbody.innerHTML += ` 
        <tr>
            <td width="15%" style="display: flex; align-items: center; gap: 15px;"><img width="40px" src=${coinData.image} alt="logo"><span>${coinData.name}</span></td>
            <td width="15%">${coinData.symbol.toUpperCase()}</td>
            <td width="17.5%" >$${coinData.current_price}</td>
            <td width="17.5%" >$${coinData.total_volume}</td>
            <td width="17.5%"  style="color: ${coinData.price_change_percentage_24h < 1 ? "red" : "green"}">${coinData.price_change_percentage_24h}</td>
            <td width="17.5%" >Mkt Cap: $${coinData.market_cap}</td>
        </tr>
        `;
    });
};


const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", async (e) => {
    let coinData = await fetchData();
    const tbody = document.querySelector(".coins");
    
    let filteredData = coinData.filter((coinData) => {
        return coinData.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    tbody.innerHTML = "";

    filteredData.map((coinData) => {
        tbody.innerHTML += ` 
        <tr>
            <td width="15%" style="display: flex; align-items: center; gap: 15px;"><img width="40px" src=${coinData.image} alt="logo"><span>${coinData.name}</span></td>
            <td width="15%">${coinData.symbol.toUpperCase()}</td>
            <td width="17.5%" >$${coinData.current_price}</td>
            <td width="17.5%" >$${coinData.total_volume}</td>
            <td width="17.5%"  style="color: ${coinData.price_change_percentage_24h < 1 ? "red" : "green"}">${coinData.price_change_percentage_24h}</td>
            <td width="17.5%" >Mkt Cap: $${coinData.market_cap}</td>
        </tr>
        `;
    });
    
});


renderCoins();




