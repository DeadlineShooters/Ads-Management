// không xài code này dc, muốn xoá phải dựa vào backend rồi frontend hiện lên thôi
// document.querySelectorAll('.bi-trash3-fill').forEach(item => {
//     item.onclick = () => {
//         if (confirm('Do you really want to remove this item?')) {
//             item.parentElement.parentElement.parentElement.parentElement.innerHTML= "";
//             // console.log(item.parentElement.parentElement.parentElement.parentElement)
//         }
//     }
// })
// document.querySelectorAll('.ayo').forEach(item => {
//     item.onclick = () => {
//         if (confirm('Do you really want to remove this item?')) {
//             item.remove();
//             // console.log(item.parentElement.parentElement.parentElement.parentElement)
//         }
//     }
// })

document.addEventListener("DOMContentLoaded", function () {
    // này xoá oke
    // var elementToRemove = document.getElementById("myElement");
    // elementToRemove.parentNode.removeChild(elementToRemove);

    // này ko xoá dc :((
    var trash = document.querySelectorAll('.btnayo');
    trash.forEach((item) => {
        item.addEventListener('click', () => {

            var elementToRemove = document.getElementById("myElement");
            elementToRemove.parentNode.removeChild(elementToRemove);
        })
    })
});