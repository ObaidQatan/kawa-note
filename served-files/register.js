const clickBtnEffect = (e)=>{
    e.target.classList.toggle('clicked-btn');
    setTimeout(() => {
        e.target.classList.toggle('clicked-btn');
    }, 90);
}

function register(){

}
async function useDatePicker(){
    //Target Element
    const datePicker = document.querySelector('.date-picker');

    //If Element Doesn't Exist
    if(!datePicker)return;


    //Helper Functions
    const isStyleExists = (className)=>{
        let exist = false;
        const sheetsArray = [...document.styleSheets];
        try {
            sheetsArray.forEach(sheet => {
                const rulesArray = [...sheet.cssRules];
                exist = !!rulesArray.find(rule => rule.cssText.slice(0,rule.cssText.indexOf('{')).indexOf(className) > 0);
               throw null;
            //     rulesArray.forEach(rule => {
            //         if(rule.cssText.slice(0,rule.cssText.indexOf('{')).indexOf(className) > 0){
            //             exist = true;
            //             return;
            //         }
            //     });
            });
        }catch (error) {
        }
        return exist;
    }
    
    const datePickerBtnClick = ()=>{
        datePicker.appendChild(dialogSurrounding);
        datePicker.appendChild(dialogBodyWrapper);

        setTimeout(() => {
            dialogBodyWrapper.style.transform = 'translateY(-137%)';
            dialogBodyWrapper.style.opacity = '1';
        }, 1);
    }

    const removeDatePicker = ()=>{
        dialogBodyWrapper.style.transform = 'translateY(0%)';
        dialogBodyWrapper.style.opacity = '0';
        
        setTimeout(() => {
            datePicker.removeChild(dialogBodyWrapper);
            datePicker.removeChild(dialogSurrounding);
        }, 300);
    }

    async function isFileExists(url){
        fetch(url,{
            method: 'HEAD',
            cache: 'no-cache'
        }).then(res => {
            if(res.ok){
                return true;
            }
            throw new Error('File Not Found');
        }).catch(err => {
            return false;
        });
    }
    

    //Variables Declaration
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();

    const years = Array(150).fill(0).map((_,index)=>(year-index));
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const months = Array(12).fill(0).map((_,index)=>({number: index+1, name: monthNames[index]}));
    
    
    //Sections Declaration
    const displaySection = document.createElement('div');
    const dialogSurrounding = document.createElement('div');
    const dialogBodyWrapper = document.createElement('div');
    const dialogBody = document.createElement('div');
    const yearSection = document.createElement('div');
    const monthsSection = document.createElement('div');
    const daysSection = document.createElement('div');

    const datePickerBtn = document.createElement('i');


    //Styling
    /***** Primary Styling **** */
    datePicker.style.position = 'relative';


    /***** Primary Styling **** */
    dialogSurrounding.classList.add('date-picker-surrounding');
    dialogSurrounding.style.position = 'fixed';
    dialogSurrounding.style.zIndex = '1000';
    dialogSurrounding.style.top = '0';
    dialogSurrounding.style.left = '0';
    dialogSurrounding.style.width = '-webkit-fill-available';
    dialogSurrounding.style.height = '-webkit-fill-available';
    /************************* */
    if(!isStyleExists('date-picker-surrounding')){
        //some unique styling
        dialogSurrounding.style.background = 'transparent';
    }


    /***** Primary Styling **** */
    dialogBodyWrapper.classList.add('date-picker-body-wrapper');
    dialogBodyWrapper.style.position = 'absolute';
    dialogBodyWrapper.style.width = '100%';
    dialogBodyWrapper.style.zIndex = '1000';
    dialogBodyWrapper.style.transform = 'translateY(0%)';
    dialogBodyWrapper.style.opacity = '0';
    // dialogBodyWrapper.style.display = 'flex';
    // dialogBodyWrapper.style.flexDirection = 'column';
    // dialogBodyWrapper.style.alignItems = 'center';
    // dialogBodyWrapper.style.justifyContent = 'start';
    /************************* */
    if(!isStyleExists('date-picker-body-wrapper')){
        //some unique styling
        dialogBodyWrapper.style.backgroundColor = '#505050';
        dialogBodyWrapper.style.color = '#ffffff85';
        dialogBodyWrapper.style.padding = '10px';
        dialogBodyWrapper.style.borderRadius = '10px';
        dialogBodyWrapper.style.border = 'solid grey 2px';
    }
    

    /***** Primary Styling **** */
    dialogBody.classList.add('date-picker-body');
    dialogBody.style.position = 'relative';
    dialogBody.style.width = 'inherit';
    dialogBody.style.display = 'flex';
    dialogBody.style.flexDirection = 'column';
    dialogBody.style.alignItems = 'center';
    dialogBody.style.justifyContent = 'start';
    /************************* */
    if(!isStyleExists('date-picker-body')){
        //some unique styling
    }


    /***** Primary Styling **** */
    displaySection.classList.add('date-picker-display-section');
    displaySection.style.display = 'flex';
    displaySection.style.alignItems = 'center';
    /************************* */
    if(!isStyleExists('date-picker-display-section')){
        //some unique styling
        displaySection.style.backgroundColor = '#505050';
        displaySection.style.color = '#ffffff85';
        displaySection.style.padding = '10px';
        displaySection.style.borderRadius = '10px';
        displaySection.style.border = 'solid grey 2px';
    }


    /***** Primary Styling **** */
    yearSection.classList.add('date-picker-years-section');
    /************************* */
    if(!isStyleExists('date-picker-years-section')){
        //some unique styling
        
    }


    /***** Primary Styling **** */
    monthsSection.classList.add('date-picker-months-section');
    /************************* */
    if(!isStyleExists('date-picker-months-section')){
        //some unique styling
        
    }
    

    /***** Primary Styling **** */
    daysSection.classList.add('date-picker-days-section');
    /************************* */
    if(!isStyleExists('date-picker-days-section')){
        //some unique styling
        
    }

    /***** Primary Styling **** */
    datePickerBtn.classList.add('date-picker-btn');
    datePickerBtn.style.cursor = 'pointer';
    //TODO: if dialog-btn icon exists --> fetch it
    //      else return a plain stringified svg content as an icon
    try{
        let dialogBtnExists = await isFileExists('../src/assets/date-picker-btn.svg');
        if(!dialogBtnExists) throw new Error('File Not Found');
        //NOTE: File Exists
        datePickerBtn.style.content = 'url("../src/assets/date-picker-btn.svg")';
    }catch (error) {
        //NOTE: File Could Not Be Loaded
        datePickerBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="id_svgCanvas" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" style="fill: rgb(255, 255, 255);" xml:space="preserve" preserveAspectRatio="none">
        <path d="M11,9h-1V5h1V9z M19,8h-6v1h6V8z M22,5h-1v4h1V5z M29,10v15c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V10  c0-1.104,0.896-2,2-2h3v1H5c-0.552,0-1,0.447-1,1v2h24v-2c0-0.553-0.447-1-1-1h-3V8h3C28.104,8,29,8.896,29,10z M28,13H4v12  c0,0.553,0.448,1,1,1h22c0.553,0,1-0.447,1-1V13z M9,16v2H7v-2H9 M10,15H6v4h4V15L10,15z M14,16v2h-2v-2H14 M15,15h-4v4h4V15L15,15z   M19,16v2h-2v-2H19 M20,15h-4v4h4V15L20,15z M24,16v2h-2v-2H24 M25,15h-4v4h4V15L25,15z M9,21v2H7v-2H9 M10,20H6v4h4V20L10,20z   M14,21v2h-2v-2H14 M15,20h-4v4h4V20L15,20z M19,21v2h-2v-2H19 M20,20h-4v4h4V20L20,20z" style="fill: rgb(255, 255, 255);"></path>
        </svg>
        `;
    }
    /************************* */
    if(!isStyleExists('date-picker-btn')){
        //some unique styling
        datePickerBtn.style.padding = '5px';
        datePickerBtn.style.maxWidth = '32px';
        datePickerBtn.style.border = 'solid 2px grey';
        datePickerBtn.style.background = '#505050';
        datePickerBtn.style.borderRadius = '10px';
        datePickerBtn.style.color = '#ffffff85';
        datePickerBtn.style.margin = '0 0 0 auto';

        datePickerBtn.addEventListener('mouseover', ()=>{
            datePickerBtn.style.background = 'grey';
        });

        datePickerBtn.addEventListener('mouseleave', ()=>{
            datePickerBtn.style.background = '#505050';
        });
    }

    
    


    //Attributes
    
    
    //Appends
    /**dialogBodyWrapper ->{
     *      displaySection ->{
     *          datePickerBtn
     *      },
     *      yearSection,
     *      monthsSection,
     *      daysSection,
     *      datePickerBtn
     * }
    */
    dialogBody.appendChild(yearSection);
    dialogBody.appendChild(monthsSection);
    dialogBody.appendChild(daysSection);

    dialogBodyWrapper.appendChild(dialogBody);

    dialogSurrounding.appendChild(dialogBodyWrapper);
    
    displaySection.textContent = `${year}-${month+1}-${day}`;
    displaySection.appendChild(datePickerBtn);

    datePicker.appendChild(displaySection);
    
    
    //Event Listeners
    datePickerBtn.addEventListener('click',datePickerBtnClick);

    dialogSurrounding.addEventListener('click',removeDatePicker);
}
useDatePicker();