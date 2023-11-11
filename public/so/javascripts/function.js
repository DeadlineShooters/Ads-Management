// Xoá 1 dòng của danh sách
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

// const select = document.querySelector('.ayyselect');
// select.addEventListener("change", (e) => {
//     window.location = select.options[select.selectedIndex].value;
//     select.options[select.selectedIndex].selected = true;
// })

// document.querySelectorAll('.sidebar-nav').forEach(item => {
//     item.onclick = (e) => {
//         // alert('aa')
//         item.classList.remove('active')
//         item.classList.add('active')
//     }
// });

// Tô màu cho button dc chọn ở sidebar
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the last clicked link from localStorage
    const lastClickedLink = localStorage.getItem('lastClickedLink');

    // Set the 'active' class based on the stored state
    if (lastClickedLink) {
        document.querySelector(lastClickedLink).classList.add('active');
    }    
});
// Attach click event listeners to all links
document.querySelectorAll('.sidebar-nav').forEach(item => {
    item.onclick = () => {
        // Store the clicked link in localStorage
        localStorage.setItem('lastClickedLink', '#'+item.id);
    }
});

// Hiện danh sách đang show ở select
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the last clicked link from localStorage
    const lastSelectedOption = localStorage.getItem('lastSelectedOption');
    // alert(lastSelectedOption);

    // Set the 'active' class based on the stored state
    if (lastSelectedOption) {
        document.querySelector(lastSelectedOption).selected = true;
    }    
});
// Attach click event listeners to all links
const select = document.querySelector('#qldropdown')
select.onchange = () => {
    // alert(select.value)
    // console.log(this.value);
    localStorage.setItem('lastSelectedOption', 'option[value="' + select.value + '"]');
    window.location = select.value;
}


