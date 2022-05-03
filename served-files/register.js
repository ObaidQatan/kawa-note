const clickBtnEffect = (e)=>{
    e.target.classList.toggle('clicked-btn');
    setTimeout(() => {
        e.target.classList.toggle('clicked-btn');
    }, 90);
}

function register(){

}
const useDatePicker = ()=>{
    //Target Element
    const datePicker = document.querySelector('.date-picker');

    //If Element Doesn't Exist
    if(!datePicker)return;

    //Sections Declaration
    const displaySection = document.createElement('div');
    const yearSection = document.createElement('div');
    const monthsSection = document.createElement('div');
    const daysSection = document.createElement('div');

    datePicker.appendChild(displaySection);

    //Variables Declaration
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    
    displaySection.textContent = `${year}-${month+1}-${day}`;
}
useDatePicker();