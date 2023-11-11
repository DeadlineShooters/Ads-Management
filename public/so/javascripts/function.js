document.querySelectorAll('.bi-trash3-fill').forEach((item) => {
    item.addEventListener('click', (event) => {
        event.preventDefault()
        item.parentElement.parentElement.parentElement.parentElement.remove();
    })
})


// document.querySelectorAll('option').forEach((item, i) => {
//     if (item.parentElement.selectedIndex == i) {
//         item.selected = true;
//     }
// })

const select = document.querySelector('.ayyselect');
select.addEventListener("change", (e) => {
    window.location = select.options[select.selectedIndex].value;
    select.options[select.selectedIndex].selected = true;
})