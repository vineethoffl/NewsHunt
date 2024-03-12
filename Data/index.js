async function fetchAndRenderData(){
    try {      
        let accordionContent = ''; // Initialize empty string to accumulate accordion content
        for (let i=0; i<magazines.length; i++) {
            let element = magazines[i];
            let response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${element}`);
            //console.log(response)
            let data = await response.json();
            console.log(data);
            //debugger;
            accordionContent += `
                <div class="accordion-item">
                    <div class="accordion-header">
                        <button type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${i}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${i}">
                            <span class="accordion-icon"><i class="fas fa-angle-down"></i></span>
                            ${data.feed.title}
                        </button>
                    </div>
                    <div id="panelsStayOpen-collapse${i}" class="${i===0? "accordion-collapse collapse show" : "accordion-collapse collapse"}" aria-labelledby="panelsStayOpen-heading${i}">
                        <div class="accordion-content">
                        <div id="carouselExample${i}" class="carousel slide">
                        <div class="carousel-inner">
                        ${  
                            data.items.map((item, index) => {
                            const date = new Date(item.pubDate);
                            const dat = date.getDate();
                            const month = date.getMonth()+1;
                            const year = date.getFullYear();

                            const finalDate =`${dat}/${month}/${year}`;

                            return`
                                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                    <a href="${item.link}" target="_blank"><img src="${item.enclosure.link}" class="activity-card-image d-block w-100 h-40" alt=""></a>
                                    <a href="${item.link}"><div id="heading">${item.title}</div></a>
                                    <div id="sub-heading">${item.author}<span class="ellipsis"></span>${finalDate}</div>  
                                    <div id="description">${item.description}</div>
                                </div>
                                `
                            })
                        }

                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample${i}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample${i}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                        </button>
                        </div>
                        </div>
                    </div>
                    
                </div>
            `;   
        }
        // Set the innerHTML of the accordion container with the accumulated content
        document.querySelector(".accordion").innerHTML = accordionContent;
    } catch (error) {
        console.error('Error fetching or rendering data:', error);
        alert("'Error fetching or rendering data:'")
    }
}

fetchAndRenderData();