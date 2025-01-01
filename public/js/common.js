let allLikeBtn = document.querySelectorAll('.like-btn')


async function likebtn(btn,productId){
    let response = await axios({
        method: 'post',
        url: `/product/${productId}/like`,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
    });
    if(btn.children[0].classList.contains('fa-solid')){
        btn.children[0].classList.remove('fa-solid')
        btn.children[0].classList.add('fa-regular')
    }else{
        btn.children[0].classList.remove('fa-regular')
        btn.children[0].classList.add('fa-solid')
    }
}

for(let btn of allLikeBtn){
    btn.addEventListener('click',()=>{
        let productId = btn.getAttribute('product-id')
        likebtn(btn,productId)
    })
}