export async function useDatePicker(elementClassName){
    //Target Element
    const datePicker = document.querySelector(`.${elementClassName}`);

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
        retrieveDays();
        renderDatePicker();
        
        setTimeout(() => {
            dialogBodyWrapper.style.transform = 'translateY(-100%)';
            dialogBodyWrapper.style.opacity = '1';
        }, 1);
    }
    
    const removeDatePicker = ()=>{
        dialogBodyWrapper.style.transform = 'translateY(0%)';
        dialogBodyWrapper.style.opacity = '0';
        renderDatePicker();
        assignDateValue();
        
        setTimeout(() => {
            datePicker.removeChild(dialogBodyWrapper);
            datePicker.removeChild(dialogSurrounding);
            removeDays();
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

    const retrieveDate = (type,action,index,minIndex,maxIndex)=>{
        if(type === 'year'){
            //Retrieve Year
            if(action === 'next'){
                if(index < maxIndex){
                    index++;
                }else{
                    index = maxIndex;
                }
            }else if(action === 'prev'){
                if(index > minIndex){
                    index--;
                }else{
                    index = minIndex;
                }
            }
            //Retrieve Month
        }else if(type === 'month'){

            if(action === 'next'){
                if(index < maxIndex){
                    index++;
                }else{
                    index = minIndex;
                }
            }
            else if(action === 'prev'){
                if(index > minIndex){
                    index--;
                }else{
                    index = maxIndex;
                }
            }
        }
        return index;
    }

    const renderDatePicker = ()=>{
        displaySection.textContent = `${year}-${month+1}-${day}`;
        yearDisplayer.textContent = year;
        monthDisplayer.textContent = monthNames[month];
        displaySection.appendChild(datePickerBtn);
    }

    const numberOfDays = (year,month)=>{
        return new Date(year, month, 0).getDate();
    }

    const selectDay = (selectedDay)=>{
        day = parseInt(selectedDay.textContent);
        const days = document.querySelectorAll(`.${elementClassName}-day`);
        days.forEach(day => {
            if(day === selectedDay){
                if(!isStyleExists(`${elementClassName}-selected-day`)){
                    day.style.background = '#ffffff20';
                    day.style.color = '#ffffff';
                }else{
                    day.classList.add(`${elementClassName}-selected-day`);
                }
            }else{
                if(!isStyleExists(`${elementClassName}-selected-day`)){
                    day.style.background = '#ffffff00';
                    day.style.color = 'grey';
                }else{
                    day.classList.remove(`${elementClassName}-selected-day`);
                }
            }
        });

    }

    const styleDays = ()=>{
        Array.prototype.forEach.call(document.getElementsByClassName(`${elementClassName}-day`),(singleDay)=>{
            singleDay.classList.add(`${elementClassName}-day`);
            singleDay.style.margin = '0';
            singleDay.style.textAlign = 'center';
            singleDay.style.cursor = 'pointer';
            /************************* */
            if(!isStyleExists(`${elementClassName}-day`) && !isStyleExists(`${elementClassName}-selected-day`)){
                //some unique styling
                singleDay.style.padding = '5px';
                singleDay.style.fontSize = '12px';
                singleDay.style.borderRadius = '50%';
                singleDay.style.background = '#ffffff00';
                singleDay.style.color = 'grey';
            }
            //check day selection
            if(parseInt(singleDay.textContent)===day)
                selectDay(singleDay);
        })
    }

    const retrieveDays = ()=>{
        Array(numberOfDays(year,month+1)).fill(0).forEach((_,index)=>{
            const day = document.createElement('h4');
            day.textContent = index+1;
            day.classList.add(`${elementClassName}-day`);
            day.addEventListener('click',(e)=>{
                selectDay(day);
            })
            daysSection.appendChild(day);
        });
        styleDays();
    }

    const removeDays = ()=>{
        daysSection.innerHTML = '';
    }

    const reInintilizeData = ()=>{
        const maxNumberOfDays = numberOfDays(year,month+1)
        if(day > maxNumberOfDays)
            day = maxNumberOfDays;
            
        removeDays();
        retrieveDays();
        renderDatePicker();
    }

    const assignDateValue = ()=>{
        datePicker.value = displaySection.textContent.trim();
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
    
    const nextYearBtn = document.createElement('div');
    const yearDisplayer = document.createElement('div');
    const prevYearBtn = document.createElement('div');

    const nextMonthBtn = document.createElement('div');
    const monthDisplayer = document.createElement('div');
    const prevMonthBtn = document.createElement('div');
    
    const datePickerBtn = document.createElement('i');
    
    
    //Styling
    /***** Primary Styling **** */
    datePicker.style.position = 'relative';
    
    
    /***** Primary Styling **** */
    dialogSurrounding.classList.add(`${elementClassName}-surrounding`);
    dialogSurrounding.style.position = 'fixed';
    dialogSurrounding.style.zIndex = '1000';
    dialogSurrounding.style.top = '0';
    dialogSurrounding.style.left = '0';
    dialogSurrounding.style.width = '-webkit-fill-available';
    dialogSurrounding.style.height = '-webkit-fill-available';
    /************************* */
    if(!isStyleExists(`${elementClassName}-surrounding`)){
        //some unique styling
        dialogSurrounding.style.background = 'transparent';
    }
    
    
    /***** Primary Styling **** */
    dialogBodyWrapper.classList.add(`${elementClassName}-body-wrapper`);
    dialogBodyWrapper.style.position = 'absolute';
    dialogBodyWrapper.style.width = '100%';
    dialogBodyWrapper.style.zIndex = '1000';
    dialogBodyWrapper.style.transform = 'translateY(0%)';
    dialogBodyWrapper.style.opacity = '0';
    dialogBodyWrapper.style.overflow = 'hidden';
    /************************* */
    if(!isStyleExists(`${elementClassName}-body-wrapper`)){
        //some unique styling
        dialogBodyWrapper.style.backgroundColor = '#505050';
        dialogBodyWrapper.style.color = '#ffffff85';
        dialogBodyWrapper.style.borderRadius = '10px';
        dialogBodyWrapper.style.border = 'solid grey 2px';
    }
    
    
    /***** Primary Styling **** */
    dialogBody.classList.add(`${elementClassName}-body`);
    dialogBody.style.position = 'relative';
    dialogBody.style.width = 'inherit';
    dialogBody.style.display = 'flex';
    dialogBody.style.flexDirection = 'column';
    dialogBody.style.alignItems = 'center';
    dialogBody.style.justifyContent = 'start';
    /************************* */
    if(!isStyleExists(`${elementClassName}-body`)){
        //some unique styling
    }
    
    
    /***** Primary Styling **** */
    displaySection.classList.add(`${elementClassName}-display-section`);
    displaySection.style.display = 'flex';
    displaySection.style.alignItems = 'center';
    /************************* */
    if(!isStyleExists(`${elementClassName}-display-section`)){
        //some unique styling
        displaySection.style.backgroundColor = '#505050';
        displaySection.style.color = '#ffffff85';
        displaySection.style.borderRadius = '10px';
        displaySection.style.border = 'solid grey 2px';
    }
    
    
    /***** Primary Styling **** */
    yearSection.classList.add(`${elementClassName}-years-section`);
    yearSection.style.display = 'flex';
    yearSection.style.justifyContent = 'center';
    yearSection.style.alignItems = 'center';
    yearSection.style.width = 'inherit';
    yearSection.style.top = '0';
    yearSection.style.left = '0';
    
            /***** Primary Styling **** */
            nextYearBtn.classList.add(`${elementClassName}-next-year-btn`);
            nextYearBtn.style.cursor = "pointer";
            /************************* */
            if(!isStyleExists(`${elementClassName}-next-year-btn`)){
                //some unique styling
                nextYearBtn.style.textAlign = 'center';
                nextYearBtn.style.padding = '10px 20px';
                nextYearBtn.style.borderRadius = "0 10px 10px 0";
                nextYearBtn.addEventListener('mouseover',()=>{
                    nextYearBtn.style.background = "#ffffff20"
                    nextYearBtn.addEventListener('mouseleave',()=>{
                        nextYearBtn.style.background = "#ffffff00"
                    })
                })
            }
            
            
            
            /***** Primary Styling **** */
            prevYearBtn.classList.add(`${elementClassName}-prev-year-btn`);
            prevYearBtn.style.cursor = "pointer";
            /************************* */
            if(!isStyleExists(`${elementClassName}-prev-year-btn`)){
                //some unique styling
                prevYearBtn.style.textAlign = 'center';
                prevYearBtn.style.padding = '10px 20px';
                prevYearBtn.style.borderRadius = "10px 0 0 10px";
                prevYearBtn.addEventListener('mouseover',()=>{
                    prevYearBtn.style.background = "#ffffff20"
                    prevYearBtn.addEventListener('mouseleave',()=>{
                        prevYearBtn.style.background = "#ffffff00"
                    })
                })
            }
            
            
            
            /***** Primary Styling **** */
            yearDisplayer.classList.add(`${elementClassName}-year-displayer`);
            /************************* */
            if(!isStyleExists(`${elementClassName}-year-displayer`)){
                //some unique styling
                yearDisplayer.style.cursor = "pointer";
                yearDisplayer.style.textAlign = 'center';
                yearDisplayer.style.width = '100%';
                yearDisplayer.style.padding = '10px';
                yearDisplayer.addEventListener('mouseover',()=>{
                    yearDisplayer.style.background = "#ffffff20"
                    yearDisplayer.addEventListener('mouseleave',()=>{
                        yearDisplayer.style.background = "#ffffff00"
                    })
                })
            }
            
            
            
            /************************* */
            if(!isStyleExists(`${elementClassName}-years-section`)){
                //some unique styling
                
            }
            
            
            /***** Primary Styling **** */
    monthsSection.classList.add(`${elementClassName}-months-section`);
    monthsSection.style.display = 'flex';
    monthsSection.style.justifyContent = 'center';
    monthsSection.style.alignItems = 'center';
    monthsSection.style.width = 'inherit';
    monthsSection.style.top = '0';
    monthsSection.style.left = '0';
    
            /***** Primary Styling **** */
            nextMonthBtn.classList.add(`${elementClassName}-next-month-btn`);
            nextMonthBtn.style.cursor = "pointer";
            /************************* */
            if(!isStyleExists(`${elementClassName}-next-month-btn`)){
                //some unique styling
                nextMonthBtn.style.textAlign = 'center';
                nextMonthBtn.style.padding = '10px 20px';
                nextMonthBtn.style.borderRadius = "0 10px 10px 0";
                nextMonthBtn.addEventListener('mouseover',()=>{
                    nextMonthBtn.style.background = "#ffffff20"
                    nextMonthBtn.addEventListener('mouseleave',()=>{
                        nextMonthBtn.style.background = "#ffffff00"
                    })
                })
            }
            
            
            
            /***** Primary Styling **** */
            prevMonthBtn.classList.add(`${elementClassName}-prev-month-btn`);
            prevMonthBtn.style.cursor = "pointer";
            /************************* */
            if(!isStyleExists(`${elementClassName}-prev-month-btn`)){
                //some unique styling
                prevMonthBtn.style.textAlign = 'center';
                prevMonthBtn.style.padding = '10px 20px';
                prevMonthBtn.style.borderRadius = "10px 0 0 10px";
                prevMonthBtn.addEventListener('mouseover',()=>{
                    prevMonthBtn.style.background = "#ffffff20"
                    prevMonthBtn.addEventListener('mouseleave',()=>{
                        prevMonthBtn.style.background = "#ffffff00"
                    })
                })
            }
            
            
            
            /***** Primary Styling **** */
            monthDisplayer.classList.add(`${elementClassName}-month-displayer`);
            /************************* */
            if(!isStyleExists(`${elementClassName}-month-displayer`)){
                //some unique styling
                monthDisplayer.style.cursor = "pointer";
                monthDisplayer.style.textAlign = 'center';
                monthDisplayer.style.width = '100%';
                monthDisplayer.style.padding = '10px';
                monthDisplayer.addEventListener('mouseover',()=>{
                    monthDisplayer.style.background = "#ffffff20"
                    monthDisplayer.addEventListener('mouseleave',()=>{
                        monthDisplayer.style.background = "#ffffff00"
                    })
                })
            }
            
            
            
            /************************* */
            if(!isStyleExists(`${elementClassName}-months-section`)){
                //some unique styling
                
            }

            
            
            /***** Primary Styling **** */
            daysSection.classList.add(`${elementClassName}-days-section`);
            daysSection.style.display = 'grid';
            daysSection.style.gridTemplateColumns = 'repeat(7,auto)';
            daysSection.style.grid = '10px';
            /************************* */
            if(!isStyleExists(`${elementClassName}-days-section`)){
                //some unique styling
                
                
            }



            /***** Primary Styling **** */
            //NOTE: Styling for days in helper functions section
            //function: styleDays()


            
            /***** Primary Styling **** */
            datePickerBtn.classList.add(`${elementClassName}-btn`);
            datePickerBtn.style.cursor = 'pointer';
            //TODO: if dialog-btn icon exists --> fetch it
            //      else return a plain stringified svg content as an icon
            try{
                let dialogBtnExists = await isFileExists(`../src/assets/${elementClassName}-btn.svg`);
                if(!dialogBtnExists) throw new Error('File Not Found');
                //NOTE: File Exists
                datePickerBtn.style.content = `url("../src/assets/${elementClassName}-btn.svg")`;
            }catch (error) {
                //NOTE: File Could Not Be Loaded
                datePickerBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="id_svgCanvas" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32" style="fill: rgb(255, 255, 255);" xml:space="preserve" preserveAspectRatio="none">
                <path d="M11,9h-1V5h1V9z M19,8h-6v1h6V8z M22,5h-1v4h1V5z M29,10v15c0,1.104-0.896,2-2,2H5c-1.104,0-2-0.896-2-2V10  c0-1.104,0.896-2,2-2h3v1H5c-0.552,0-1,0.447-1,1v2h24v-2c0-0.553-0.447-1-1-1h-3V8h3C28.104,8,29,8.896,29,10z M28,13H4v12  c0,0.553,0.448,1,1,1h22c0.553,0,1-0.447,1-1V13z M9,16v2H7v-2H9 M10,15H6v4h4V15L10,15z M14,16v2h-2v-2H14 M15,15h-4v4h4V15L15,15z   M19,16v2h-2v-2H19 M20,15h-4v4h4V15L20,15z M24,16v2h-2v-2H24 M25,15h-4v4h4V15L25,15z M9,21v2H7v-2H9 M10,20H6v4h4V20L10,20z   M14,21v2h-2v-2H14 M15,20h-4v4h4V20L15,20z M19,21v2h-2v-2H19 M20,20h-4v4h4V20L20,20z" style="fill: rgb(255, 255, 255);"></path>
                </svg>
                `;
            }
            /************************* */
            if(!isStyleExists(`${elementClassName}-btn`)){
                //some unique styling
                datePickerBtn.style.padding = '5px';
                datePickerBtn.style.maxWidth = '32px';
                datePickerBtn.style.border = 'solid 2px grey';
                datePickerBtn.style.background = '#505050';
                datePickerBtn.style.borderRadius = '10px';
                datePickerBtn.style.clor = '#ffffff85';
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
    
    yearSection.appendChild(prevYearBtn);
    prevYearBtn.textContent = `<`;
    nextYearBtn.textContent = '>';
    yearSection.appendChild(yearDisplayer);
    yearSection.appendChild(nextYearBtn);

    monthsSection.appendChild(prevMonthBtn);
    prevMonthBtn.textContent = `<`;
    nextMonthBtn.textContent = '>';
    monthsSection.appendChild(monthDisplayer);
    monthsSection.appendChild(nextMonthBtn);

    
    dialogBody.appendChild(yearSection);
    dialogBody.appendChild(monthsSection);
    dialogBody.appendChild(daysSection);

    dialogBodyWrapper.appendChild(dialogBody);

    dialogSurrounding.appendChild(dialogBodyWrapper);
    
    datePicker.appendChild(displaySection);

    renderDatePicker();
    assignDateValue();
    
    
    //Event Listeners
    datePickerBtn.addEventListener('click',datePickerBtnClick);
    
    dialogSurrounding.addEventListener('click',removeDatePicker);

    prevYearBtn.addEventListener('click',()=>{
        const index = retrieveDate('year','prev',years.indexOf(year),0,years.length-1);
        year = years[index];
        reInintilizeData();
    });

    nextYearBtn.addEventListener('click',()=>{
        const index = retrieveDate('year','next',years.indexOf(year),0,years.length-1);
        year = years[index];
        reInintilizeData();
    }); 

    prevMonthBtn.addEventListener('click',()=>{
        const index = retrieveDate('month','prev',month,0,months.length-1);
        month = months[index].number-1;
        
        reInintilizeData();
    });

    nextMonthBtn.addEventListener('click',()=>{
        const index = retrieveDate('month','next',month,0,months.length-1);
        month = months[index].number-1;
        reInintilizeData();
    });
}
