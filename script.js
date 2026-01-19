let images = document.querySelectorAll("#slider_container>img")
let index = 0;
function showImage() {
  images.forEach((img, i) => {
    img.classList.toggle("non-active", i !== index)
  })
}

let rightArrow = document.getElementById("right_arrow")
rightArrow.addEventListener("click", () => {
  index++
  if (index >= images.length) {
    index = 0
  }
  showImage()
})

let leftArrow = document.getElementById("left_arrow")
leftArrow.addEventListener("click", () => {
  index--
  if(index<0){
    index=images.length-1
  }
  showImage()
})
showImage()