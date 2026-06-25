const database = [
    { type: "STEERING", part: "550/41002-550/42383", model: "3DX", start: 2003, end: 2011 },
    { type: "STEERING", part: "333/Y9235", model: "3DX", start: 2012, end: 2019 },
    { type: "STEERING", part: "336/F2141", model: "3DX", start: 2019, end: 2021 },
    { type: "STEERING", part: "336-E0948", model: "ECO", start: 2022, end: 2024 },
    
    { type: "STABILIZER", part: "550/42126", model: "3DX", start: 2003, end: 2006 },
    { type: "STABILIZER", part: "550/42849", model: "3DX", start: 2007, end: 2008 },
    { type: "STABILIZER", part: "332/Y3519", model: "DONGIAN", start: 2009, end: 2009 },
    { type: "STABILIZER", part: "332/Y5599", model: "3DX", start: 2009, end: 2021 },
    { type: "STABILIZER", part: "400-03293/92", model: "ECO", start: 2022, end: 2024 },
    
    { type: "BUCKET", part: "550/42112-550/42855", model: "3DX", start: 2003, end: 2008 },
    { type: "BUCKET", part: "332-Y6192", model: "DONGIAN", start: 2009, end: 2009 },
    { type: "BUCKET", part: "332/Y6519", model: "3DX", start: 2010, end: 2015 },
    { type: "BUCKET", part: "998/Y8994", model: "3DX", start: 2016, end: 2018 },
    { type: "BUCKET", part: "336-C6798", model: "3DX", start: 2018, end: 2021 },
    { type: "BUCKET", part: "336/F1480", model: "ECO", start: 2022, end: 2024 },
    
    { type: "DIPPER", part: "550/42098-550/42847", model: "3DX", start: 2003, end: 2008 },
    { type: "DIPPER", part: "332/Y6194", model: "DONGIAN", start: 2009, end: 2009 },
    { type: "DIPPER", part: "332/Y6462", model: "3DX", start: 2010, end: 2015 },
    { type: "DIPPER", part: "333/Y6024/336-E8026", model: "3DX", start: 2016, end: 2021 },
    { type: "DIPPER", part: "336/F2238", model: "ECO", start: 2022, end: 2024 },
    
    { type: "BOOM", part: "550/42085-550/42854", model: "3DX", start: 2003, end: 2008 },
    { type: "BOOM", part: "332/Y6194", model: "DONGIAN", start: 2009, end: 2009 },
    { type: "BOOM", part: "332Y/6440", model: "3DX", start: 2010, end: 2015 },
    { type: "BOOM", part: "333-Y6024/336-F1981", model: "3DX", start: 2016, end: 2021 },
    { type: "BOOM", part: "336-F1477", model: "ECO", start: 2022, end: 2024 },
    
    { type: "SHOVEL", part: "550-41001/550-42835", model: "3DX", start: 2003, end: 2014 },
    { type: "SHOVEL", part: "336-E8025", model: "3DX", start: 2015, end: 2021 },
    { type: "SHOVEL", part: "336/F1483", model: "ECO", start: 2022, end: 2024 },
    
    { type: "LOADER LIFT", part: "550/41008-550/42842", model: "3DX", start: 2003, end: 2008 },
    { type: "LOADER LIFT", part: "550/43774-332/Y2186", model: "3DX", start: 2009, end: 2013 },
    { type: "LOADER LIFT", part: "AAE/A1145", model: "3DX", start: 2014, end: 2021 },
    { type: "LOADER LIFT", part: "336-F1486", model: "ECO", start: 2022, end: 2024 },
    
    { type: "SLEWRAM", part: "550/41004-550/42261", model: "3DX", start: 2003, end: 2015 },
    { type: "SLEWRAM", part: "336/E7315", model: "3DX", start: 2016, end: 2021 },
    { type: "SLEWRAM", part: "336/F1579", model: "ECO", start: 2022, end: 2024 }
];

let selectedYear = null;

window.onload = function() {
    const matrixContainer = document.getElementById('yearsMatrix');
    for (let year = 2003; year <= 2024; year++) {
        let element = document.createElement('div');
        element.className = 'year-btn';
        element.innerText = "'" + String(year).slice(-2); // Formats as '03, '23, etc.
        element.setAttribute('data-year', year);
        element.onclick = function() { selectYearElement(year, element); };
        matrixContainer.appendChild(element);
    }
};

function selectYearElement(year, targetElement) {
    const currentActive = document.querySelector('.year-btn.active');
    if (currentActive) currentActive.classList.remove('active');

    targetElement.classList.add('active');
    selectedYear = year;
    evaluateSelection();
}

function evaluateSelection() {
    const selectedAssembly = document.getElementById('assemblySelect').value;
    const outputBox = document.getElementById('displayOutput');

    if (!selectedAssembly || !selectedYear) {
        return;
    }

    const result = database.find(item => 
        item.type === selectedAssembly && 
        selectedYear >= item.start && 
        selectedYear <= item.end
    );

    if (result) {
        outputBox.className = "output-box matched";
        outputBox.innerHTML = `
            <div class="status-header">&#9733; Record Match Found</div>
            <div class="data-layout">
                <div class="data-field">
                    <label>Part Identification Number</label>
                    <div class="val">${result.part}</div>
                </div>
                <div class="data-field">
                    <label>Equipment Model Group</label>
                    <div class="val">${result.model}</div>
                </div>
            </div>
        `;
    } else {
        outputBox.className = "output-box missing";
        outputBox.innerHTML = `
            <div class="status-header">&#9888; Allocation Error</div>
            <p style="margin:0; font-size: 0.85rem; color: var(--text-muted);">No records registered for this interval.</p>
        `;
    }
}