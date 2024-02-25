const categories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const getData = await res.json();
    const categoriesData = getData.data;
    setCategoriesName(categoriesData)

}
const setCategoriesName = (categoriesData) => {
    const tabContainer = document.getElementById('tab-container');
    categoriesData.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick ="categorieDetails(${item.category_id})" class="btn btn-sm rounded-sm btn-active hover:bg-[#FF1F3D] hover:text-white">${item?.category}</button>
        `
        tabContainer.appendChild(div)
    })
}
let arr = [] ;
const categorieDetails = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const getData = await res.json();
    const categoryData = getData.data;
    arr = [...categoryData]
    cardShow(arr)
}
const cardShow = (cardArr) => {
    const notFound = document.getElementById('not-found');
    if (cardArr.length === 0) {
        notFound.classList.remove('hidden')
    }
    else {
        notFound.classList.add("hidden")
    }
    const cardsContainer = document.getElementById('card-container');
    cardsContainer.innerHTML = "";
    cardArr.forEach(item => {
        const second = item?.others?.posted_date;
        const totalMinute = Math.floor(second / 60);
        const hour = Math.floor(totalMinute / 60);
        const minute = totalMinute % 60;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-compact h-[340px] bg-base-100 shadow-xl relative">
        <figure><img class="h-[170px] object-cover w-full lg:md:w-[295px]" src="${item.thumbnail}" /></figure>
        <div class="card-body">
       ${item?.others?.posted_date ? `<div class="text-end absolute right-2 top-[136px] text-white bg-black rounded"><p class="px-6 py-1">${hour} hrs ${minute} min ago</p></div>` : ""}
            <div class="flex gap-3">
                <div class="avatar">
                    <div class="w-12 h-12 rounded-full">
                        <img src="${item?.authors[0]?.profile_picture}" />
                    </div>
                </div>
               <div>
               <h2 class="card-title font-bold text-base">${item?.title}</h2>
               <div class="flex gap-2">
               <p class="text-[#171717b3] font-normal text-base grow-0">${item?.authors[0]?.profile_name}</p>
               ${item?.authors[0]?.verified ? '<img src="./images/blue.svg" /> ' : ''}
               </div>
               <p class="text-[#171717b3] mr-[60px]">${item?.others?.views} views</p>
               </div>
            </div>
            </div>
        </div>
    </div>
        `
        cardsContainer.appendChild(div)
    })
}
categorieDetails("1000")
categories()
const blogSite = () => {
    window.location.href = "blog.html"
}
const sortbtn = () => {
   const sortArr = arr.slice().sort((a,b) => {
        return parseFloat(b.others.views) - parseFloat(a.others.views)
    })
    cardShow(sortArr)
}